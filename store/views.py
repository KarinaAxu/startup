from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from store.models import Dish, Customer, Courier, Restaurant, Menu, Order, OrderItem, Payment
from store.forms import DishForm, UpdateDishForm, CustomerForm, CourierForm, RestaurantForm, MenuForm, OrderForm, OrderItemForm, PaymentForm

def index(request):
    return HttpResponse(f"Hello {request.user.username}!")

# Views для Dish
def dishes(request):
    all_dishes = Dish.objects.all()
    return render(request, 'dishes_list.html', {"all_dishes": all_dishes})

def dish_detail(request, pk):
    dish = Dish.objects.get(pk=pk)
    return render(request, 'dish.html', {'dish': dish})

def dish_create(request):
    instance = None
    if request.method == 'POST':
        form = DishForm(request.POST)
        if form.is_valid():
            instance = form.save()
            return HttpResponseRedirect("/dishes")
    return render(request, 'create_dish.html', {'form': DishForm(instance=instance)})

def dish_update(request, pk):
    if request.method == 'POST':
        form = UpdateDishForm(request.POST)
        if form.is_valid():
            price = form.cleaned_data['price']
            Dish.objects.filter(pk=pk).update(price=price)
            return HttpResponseRedirect("/dishes")
    return render(request, 'update_dish.html', {'form': UpdateDishForm()})

# Views для Customer
def customer_list(request):
    customers = Customer.objects.all()
    return render(request, 'customer_list.html', {'customers': customers})

def customer_detail(request, pk):
    customer = get_object_or_404(Customer, pk=pk)
    return render(request, 'customer_detail.html', {'customer': customer})

def courier_list(request):
    couriers = Courier.objects.all()
    return render(request, 'courier_list.html', {'couriers': couriers})

def courier_detail(request, pk):
    courier = get_object_or_404(Courier, pk=pk)
    return render(request, 'courier_detail.html', {'courier': courier})

def restaurant_list(request):
    restaurants = Restaurant.objects.all()
    return render(request, 'restaurant_list.html', {'restaurants': restaurants})

def restaurant_detail(request, pk):
    restaurant = get_object_or_404(Restaurant, pk=pk)
    return render(request, 'restaurant_detail.html', {'restaurant': restaurant})

def menu_list(request):
    menus = Menu.objects.all()
    return render(request, 'menu_list.html', {'menus': menus})

def menu_detail(request, pk):
    menu = get_object_or_404(Menu, pk=pk)
    return render(request, 'menu_detail.html', {'menu': menu})

def order_list(request):
    orders = Order.objects.all()
    return render(request, 'order_list.html', {'orders': orders})

def order_detail(request, pk):
    order = get_object_or_404(Order, pk=pk)
    return render(request, 'order_detail.html', {'order': order})

def order_create(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('order_list')
    else:
        form = OrderForm()
    return render(request, 'order_form.html', {'form': form})

def order_update(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if request.method == 'POST':
        form = OrderForm(request.POST, instance=order)
        if form.is_valid():
            form.save()
            return redirect('order_detail', pk=pk)
    else:
        form = OrderForm(instance=order)
    return render(request, 'order_form.html', {'form': form})

def orderitem_list(request):
    order_items = OrderItem.objects.all()
    return render(request, 'orderitem_list.html', {'order_items': order_items})

def orderitem_detail(request, pk):
    order_item = get_object_or_404(OrderItem, pk=pk)
    return render(request, 'orderitem_detail.html', {'order_item': order_item})

def orderitem_create(request):
    if request.method == 'POST':
        form = OrderItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('orderitem_list')
    else:
        form = OrderItemForm()
    return render(request, 'orderitem_form.html', {'form': form})

def orderitem_update(request, pk):
    order_item = get_object_or_404(OrderItem, pk=pk)
    if request.method == 'POST':
        form = OrderItemForm(request.POST, instance=order_item)
        if form.is_valid():
            form.save()
            return redirect('orderitem_detail', pk=pk)
    else:
        form = OrderItemForm(instance=order_item)
    return render(request, 'orderitem_form.html', {'form': form})

def payment_list(request):
    payments = Payment.objects.all()
    return render(request, 'payment_list.html', {'payments': payments})

def payment_detail(request, pk):
    payment = get_object_or_404(Payment, pk=pk)
    return render(request, 'payment_detail.html', {'payment': payment})

def payment_create(request):
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('payment_list')
    else:
        form = PaymentForm()
    return render(request, 'payment_form.html', {'form': form})

def payment_update(request, pk):
    payment = get_object_or_404(Payment, pk=pk)
    if request.method == 'POST':
        form = PaymentForm(request.POST, instance=payment)
        if form.is_valid():
            form.save()
            return redirect('payment_detail', pk=pk)
    else:
        form = PaymentForm(instance=payment)
    return render(request, 'payment_form.html', {'form': form})