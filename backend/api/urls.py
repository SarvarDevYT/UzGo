from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    send_otp, verify_otp, user_profile, admin_login,
    taxi_estimate, admin_stats,
    MarketProductViewSet, StoreViewSet, OrderViewSet
)

router = DefaultRouter()
router.register(r'market/products', MarketProductViewSet, basename='market-products')
router.register(r'delivery/stores', StoreViewSet, basename='delivery-stores')
router.register(r'orders', OrderViewSet, basename='orders')

urlpatterns = [
    path('auth/send-otp', send_otp, name='send_otp'),
    path('auth/verify-otp', verify_otp, name='verify_otp'),
    path('auth/profile', user_profile, name='user_profile'),
    path('auth/admin-login', admin_login, name='admin_login'),
    path('taxi/estimate', taxi_estimate, name='taxi_estimate'),
    path('admin/stats', admin_stats, name='admin_stats'),
    path('', include(router.urls)),
]
