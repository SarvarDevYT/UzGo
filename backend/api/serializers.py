from rest_framework import serializers
from .models import UserProfile, TaxiRide, MarketProduct, Store, StoreMenuItem, Order

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class TaxiRideSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxiRide
        fields = '__all__'

class MarketProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketProduct
        fields = '__all__'

class StoreMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreMenuItem
        fields = '__all__'

class StoreSerializer(serializers.ModelSerializer):
    menu_items = StoreMenuItemSerializer(many=True, read_only=True)
    class Meta:
        model = Store
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
