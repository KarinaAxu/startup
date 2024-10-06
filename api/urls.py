from django.urls import path
from api import views

urlpatterns = [
    path('dishes/', views.DishList.as_view(), name='dish_list_create'),
    path('dishes/<int:pk>/', views.DishDetail.as_view(), name='dish_detail'),

    path('couriers/', views.CourierList.as_view(), name='courier_list_create'),
    path('couriers/<int:pk>/', views.CourierDetail.as_view(), name='courier_detail'),

    path('customers/', views.CustomerList.as_view(), name='customers_list_create'),
    path('customers/<int:pk>/', views.CustomerDetail.as_view(), name='customers_detail'),

    path('restaurants/', views.RestaurantList.as_view(), name='restaurant_list_create'),
    path('restaurants/<int:pk>/', views.RestaurantDetail.as_view(), name='restaurant_detail'),

    path('menus/', views.MenuList.as_view(), name='menu_list_create'),
    path('menus/<int:pk>/', views.MenuDetail.as_view(), name='menu_detail'),

    path('orders/', views.OrderListCreate.as_view(), name='order_list_create'),
    path('orders/<int:pk>/', views.OrderDetail.as_view(), name='order_detail'),

    path('order_items/', views.OrderItemListCreate.as_view(), name='order_item_list_create'),
    path('order_items/<int:pk>/', views.OrderItemDetail.as_view(), name='order_item_detail'),

    path('payments/', views.PaymentListCreate.as_view(), name='payment_list_create'),
    path('payments/<int:pk>/', views.PaymentDetail.as_view(), name='payment_detail'),
]