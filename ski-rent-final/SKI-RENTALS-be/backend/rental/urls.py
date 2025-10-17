from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rental.views import (
    ProductViewSet,
    DraftViewSet,
    ContractViewSet,
    ItemViewSet,
    send_otp,
    confirm_contract,
    RegisterView,
    LoginView,
    dashboard_view
)


router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'drafts', DraftViewSet, basename='draft')
router.register(r'contracts', ContractViewSet, basename='contract')
router.register(r'items', ItemViewSet, basename='item')


urlpatterns = [
    path('api/', include(router.urls)),

    path('api/send_otp/', send_otp, name='send_otp'),
    path('api/confirm_contract/', confirm_contract, name='confirm_contract'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/dashboard/', dashboard_view, name='dashboard'),
]