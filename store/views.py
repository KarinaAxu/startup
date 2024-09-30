from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.http import HttpResponse
from rest_framework.response import Response
from django_filters.rest_framework import FilterSet, filters
from rest_framework.decorators import api_view, permission_classes, authentication_classes, permission_classes
from .models import Dish
from api.serializers import DishSerializer

def index(request):
    return HttpResponse(f"Hello {request.user.username}!")

class DishFilter(FilterSet):
    price = filters.RangeFilter()

    class Meta:
        model = Dish
        fields = ['name', 'price']
@api_view(['GET'])
def dishes(request):
    queryset = Dish.objects.all()
    filterset = DishFilter(request.GET, queryset=queryset)
    if filterset.is_valid():
        queryset = filterset.qs
    serializer = DishSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def dish_detail(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    serializer = DishSerializer(dish)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def dish_create(request):
    serializer = DishSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def dish_update(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    serializer = DishSerializer(dish, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def dish_delete(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    dish.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)