from django.urls import path
from store import views

urlpatterns = [
    path("", views.index, name="index"),
    path("dishes/", views.dishes, name="dishes"),
    path("dish/<pk>", views.dish_detail, name="dish_detail"),
    path("dish/", views.dish_create, name="dish_create"),
    path("update_dish/<pk>", views.dish_update, name="dish_update"),

    path('customers/', views.customer_list, name='customer_list'),
    path('customers/<int:pk>/', views.customer_detail, name='customer_detail'),

    path('couriers/', views.courier_list, name='courier_list'),
    path('couriers/<int:pk>/', views.courier_detail, name='courier_detail'),

    path('restaurants/', views.restaurant_list, name='restaurant_list'),
    path('restaurants/<int:pk>/', views.restaurant_detail, name='restaurant_detail'),

    path('menus/', views.menu_list, name='menu_list'),
    path('menus/<int:pk>/', views.menu_detail, name='menu_detail'),

    path('orders/', views.order_list, name='order_list'),
    path('orders/<int:pk>/', views.order_detail, name='order_detail'),
    path('orders/add/', views.order_create, name='order_create'),
    path('orders/<int:pk>/update/', views.order_update, name='order_update'),

    path('orderitems/', views.orderitem_list, name='orderitem_list'),
    path('orderitems/<int:pk>/', views.orderitem_detail, name='orderitem_detail'),
    path('orderitems/add/', views.orderitem_create, name='orderitem_create'),
    path('orderitems/<int:pk>/update/', views.orderitem_update, name='orderitem_update'),

    path('payments/', views.payment_list, name='payment_list'),
    path('payments/<int:pk>/', views.payment_detail, name='payment_detail'),
    path('payments/add/', views.payment_create, name='payment_create'),
    path('payments/<int:pk>/update/', views.payment_update, name='payment_update'),
]