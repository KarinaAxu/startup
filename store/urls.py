from django.urls import path
from .views import index, dishes, dish_detail, dish_create, dish_update, dish_delete

urlpatterns = [
    path("", index, name="index"),
    path('api/dishes/', dishes, name='dishes'),
    path('api/dishes/create/', dish_create, name='dish_create'),
    path('api/dishes/<int:pk>/', dish_detail, name='dish_detail'),
    path('api/dishes/<int:pk>/update/', dish_update, name='dish_update'),
    path('api/dishes/<int:pk>/delete/', dish_delete, name='dish_delete'),
]