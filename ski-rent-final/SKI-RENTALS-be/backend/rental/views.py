from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product, Draft, Contract, ContractItem, OTP, Item
from .serializers import ProductSerializer, DraftSerializer, ContractSerializer, OTPVerifySerializer
from .sms_utils import send_sms
from django.utils import timezone
from datetime import timedelta
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .serializers import ItemSerializer
import random


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

class DraftViewSet(viewsets.ModelViewSet):
    queryset = Draft.objects.all().order_by('-updated_at')
    serializer_class = DraftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all().order_by('-created_at')
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user if self.request.user.is_authenticated else None)

    @action(detail=True, methods=['post'])
    def send_confirmation(self, request, pk=None):
        contract = self.get_object()
        if not contract.customer_phone:
            return Response({"detail":"Нет номера клиента."}, status=400)
        # сгенерировать код
        code = OTP.generate_code(6)
        expire_at = timezone.now() + timedelta(minutes=10)
        otp = OTP.objects.create(phone=contract.customer_phone, code=code, contract=contract, expire_at=expire_at)
        msg = f"Код подтверждения для договора {contract.number}: {code}. Действует 10 минут."
        send_sms(contract.customer_phone, msg)
        return Response({"detail":"Код отправлен."})

    @action(detail=True, methods=['post'])
    def verify_confirmation(self, request, pk=None):
        contract = self.get_object()
        serializer = OTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data['code']
        otps = contract.otps.filter(used=False).order_by('-created_at')
        if not otps.exists():
            return Response({'detail':'Код не найден или просрочен.'}, status=400)
        otp = otps.first()
        if not otp.is_valid():
            return Response({'detail':'Код просрочен/недействителен.'}, status=400)
        if otp.code != code:
            otp.attempts += 1
            otp.save()
            return Response({'detail':'Неверный код.'}, status=400)
        otp.mark_used()
        try:
            with transaction.atomic():
                contract.mark_as_signed()
        except ValueError as e:
            return Response({'detail': str(e)}, status=400)
        return Response({'detail':'Договор подписан и товары списаны.'})

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_view(request):
    from django.db.models import Sum, Count
    total_products = Product.objects.aggregate(total_qty=Sum('quantity'))['total_qty'] or 0
    active_contracts = Contract.objects.exclude(status__in=['draft','cancelled']).count()
    total_revenue = Contract.objects.filter(status='rented').aggregate(total=Sum('total_amount'))['total'] or 0
    drafts_count = Draft.objects.count()
    return Response({
        'total_products': total_products,
        'active_contracts': active_contracts,
        'total_revenue': float(total_revenue),
        'drafts_count': drafts_count
    })


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({'detail': 'Введите логин и пароль'}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({'detail': 'Пользователь уже существует'}, status=400)
        user = User.objects.create_user(username=username, password=password)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'detail': 'Неверные учетные данные'}, status=401)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# 1️⃣ Отправить SMS (имитация)
@api_view(['POST'])
def send_otp(request):
    phone = request.data.get('phone')
    if not phone:
        return Response({'error': 'Укажите номер телефона'}, status=400)

    code = str(random.randint(100000, 999999))
    expire = timezone.now() + timedelta(minutes=5)
    OTP.objects.create(phone=phone, code=code, expire_at=expire)

    print(f"📱 SMS для {phone}: {code}")  # ← имитация отправки
    return Response({'message': 'Код отправлен (см. консоль)'})
    

@api_view(['POST'])
@permission_classes([AllowAny])  # или IsAuthenticated, если нужно
def confirm_contract(request):
    """
    Ожидает JSON: { "phone": "+7...", "code": "...", "contract_id": 1 }
    Логику проверки кода оставляй как у тебя (sms-сервис); здесь примитивно проверяем и ставим signed=True.
    """
    phone = request.data.get('phone')
    code = request.data.get('code')
    contract_id = request.data.get('contract_id')

    if not (phone and code and contract_id):
        return Response({'detail': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    contract = get_object_or_404(Contract, id=contract_id)

    # Можно доп. валидацию телефона: contract.customer_phone == phone
    if contract.customer_phone != phone:
        return Response({'detail': 'Phone mismatch'}, status=status.HTTP_400_BAD_REQUEST)

    # помечаем, что договор подтверждён
    contract.signed = True
    contract.save()

    serializer = ContractSerializer(contract)
    return Response({'message': 'Договор успешно подтвержден', 'contract': serializer.data})