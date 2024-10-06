from django import forms
from store.models import Dish, Customer, Courier, Restaurant, Menu, Order, OrderItem, Payment

class DishForm(forms.ModelForm):
    class Meta:
        model = Dish
        fields = '__all__'

class UpdateDishForm(forms.ModelForm):
    class Meta:
        model = Dish
        fields = ['price']

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = '__all__'

class CourierForm(forms.ModelForm):
    class Meta:
        model = Courier
        fields = '__all__'

class RestaurantForm(forms.ModelForm):
    class Meta:
        model = Restaurant
        fields = '__all__'

class MenuForm(forms.ModelForm):
    class Meta:
        model = Menu
        fields = '__all__'

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = '__all__'

class OrderItemForm(forms.ModelForm):
    class Meta:
        model = OrderItem
        fields = '__all__'

class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = '__all__'