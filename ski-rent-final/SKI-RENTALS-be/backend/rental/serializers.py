from rest_framework import serializers
from .models import Product, Draft, Contract, ContractItem, OTP, Item
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from .models import Contract

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        # Не передаём created_by (будет установлен на бэкенде)
        fields = [
            'id',
            'number',
            'customer_name',
            'customer_phone',
            'start_date',
            'end_date',
            'total_amount',
            'created_by',
            'created_at',
            'signed'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'signed']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class DraftSerializer(serializers.ModelSerializer):
    customer_phone = PhoneNumberField(allow_null=True, required=False)
    class Meta:
        model = Draft
        fields = '__all__'
        read_only_fields = ('created_at','updated_at','created_by')

class ContractItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    class Meta:
        model = ContractItem
        fields = ('id','product','qty','days','price_per_day')

class ContractSerializer(serializers.ModelSerializer):
    customer_phone = PhoneNumberField()
    items = ContractItemSerializer(many=True)

    class Meta:
        model = Contract
        fields = [
            'id',
            'number',
            'customer_name',
            'customer_phone',
            'start_date',
            'end_date',
            'total_amount',
            'created_by',
            'items',
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        user = self.context['request'].user
        contract = Contract.objects.create(created_by=user, **validated_data)
        total = 0
        for it in items_data:
            ci = ContractItem.objects.create(contract=contract, **it)
            total += (ci.qty * ci.days * ci.price_per_day)
        contract.total_amount = total
        # если указан телефон — ставим pending_confirmation
        if contract.customer_phone:
            contract.status = 'pending_confirmation'
        contract.save()
        return contract

class OTPCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTP
        fields = ('phone','contract')

class OTPVerifySerializer(serializers.Serializer):
    code = serializers.CharField(max_length=10)

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'