from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import UserProfile, TaxiRide, MarketProduct, Store, StoreMenuItem, Order
from .serializers import (
    UserProfileSerializer, TaxiRideSerializer, 
    MarketProductSerializer, StoreSerializer, 
    StoreMenuItemSerializer, OrderSerializer
)

# Auth Endpoints
@api_view(['POST'])
def send_otp(request):
    phone = request.data.get('phone', '')
    if not phone:
        return Response({'message': 'Telefon raqam kiritilmadi'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'OTP yuborildi', 'phone': phone, 'otp_mock': '123456'})

@api_view(['POST'])
def verify_otp(request):
    phone = request.data.get('phone', '')
    otp = request.data.get('otp', '')
    if otp == '123456' or len(otp) == 6:
        user, created = UserProfile.objects.get_or_create(
            phone=phone,
            defaults={'name': 'Sultonbek', 'role': 'customer'}
        )
        serializer = UserProfileSerializer(user)
        return Response({
            'token': f'demo_token_{user.id}_jwt',
            'user': serializer.data
        })
    return Response({'message': 'Noto\'g\'ri OTP kod'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def user_profile(request):
    user = UserProfile.objects.first()
    if not user:
        user = UserProfile.objects.create(name='Sultonbek Jumayev', phone='+998901234567', role='customer')
    
    if request.method == 'PUT':
        name = request.data.get('name')
        if name:
            user.name = name
            user.save()

    serializer = UserProfileSerializer(user)
    return Response({'user': serializer.data})

@api_view(['POST'])
def admin_login(request):
    identifier = request.data.get('identifier', '')
    password = request.data.get('password', '')
    if ('admin' in identifier or identifier == '+998990000001' or identifier == '998990000001') and (password in ['admin1234', '123456']):
        return Response({
            'token': 'demo-admin-jwt-token-123456',
            'user': {
                'id': 1,
                'name': 'Sardor Admin',
                'phone': '+998990000001',
                'role': 'admin'
            }
        })
    return Response({'message': 'Login yoki parol noto\'g\'ri!'}, status=status.HTTP_400_BAD_REQUEST)

# Taxi Endpoints
@api_view(['GET'])
def taxi_estimate(request):
    from_addr = request.GET.get('from', '')
    to_addr = request.GET.get('to', '')
    return Response({
        'from': from_addr,
        'to': to_addr,
        'estimates': [
            {'tariff': 'economy', 'name': 'Ekonom', 'price': 12000, 'duration': '~3 min', 'car': 'Cobalt/Gentra'},
            {'tariff': 'comfort', 'name': 'Komfort', 'price': 18000, 'duration': '~5 min', 'car': 'Monza/Onix'},
            {'tariff': 'comfort_plus', 'name': 'Komfort+', 'price': 25000, 'duration': '~6 min', 'car': 'BYD Song Plus'},
            {'tariff': 'business', 'name': 'Business', 'price': 40000, 'duration': '~8 min', 'car': 'Kia K5/Malibu'},
        ]
    })

# Market & Delivery ViewSets
class MarketProductViewSet(viewsets.ModelViewSet):
    queryset = MarketProduct.objects.all().order_by('-id')
    serializer_class = MarketProductSerializer

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all().order_by('-rating')
    serializer_class = StoreSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-id')
    serializer_class = OrderSerializer

# Admin Stats View
@api_view(['GET'])
def admin_stats(request):
    total_users = UserProfile.objects.count()
    total_orders = Order.objects.count()
    total_rides = TaxiRide.objects.count()
    return Response({
        'totalUsers': {'value': total_users or 12450, 'trend': 12.5},
        'totalOrders': {'value': total_orders or 3420, 'trend': 8.2},
        'totalRides': {'value': total_rides or 5120, 'trend': 15.3},
        'totalRevenue': {'value': '450.5M UZS', 'trend': 22.4},
        'activeDrivers': {'value': 450, 'trend': 5.1},
        'newOrders': {'value': 125, 'trend': -2.4},
    })
