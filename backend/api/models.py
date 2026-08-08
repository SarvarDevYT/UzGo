from django.db import models

class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('customer', 'Mijoz'),
        ('driver', 'Haydovchi'),
        ('courier', 'Kuryer'),
        ('admin', 'Admin'),
    )
    phone = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100, default='Foydalanuvchi')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.phone})"

class TaxiRide(models.Model):
    TARIFF_CHOICES = (
        ('economy', 'Ekonom'),
        ('comfort', 'Komfort'),
        ('comfort_plus', 'Komfort+'),
        ('business', 'Business'),
    )
    STATUS_CHOICES = (
        ('idle', 'Kutilmoqda'),
        ('searching', 'Qidirilmoqda'),
        ('found', 'Haydovchi topildi'),
        ('completed', 'Yakunlandi'),
        ('cancelled', 'Bekor qilindi'),
    )
    from_address = models.CharField(max_length=255)
    to_address = models.CharField(max_length=255)
    tariff = models.CharField(max_length=20, choices=TARIFF_CHOICES, default='economy')
    price = models.IntegerField(default=12000)
    driver_name = models.CharField(max_length=100, blank=True, null=True)
    car_model = models.CharField(max_length=100, blank=True, null=True)
    plate_number = models.CharField(max_length=20, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='searching')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_address} -> {self.to_address} ({self.tariff})"

class MarketProduct(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField()
    old_price = models.IntegerField(blank=True, null=True)
    category_id = models.CharField(max_length=50, default='all')
    stock = models.IntegerField(default=10)
    rating = models.FloatField(default=4.8)
    reviews_count = models.IntegerField(default=50)
    image_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Store(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50)
    category_icon = models.CharField(max_length=10, default='🍕')
    rating = models.FloatField(default=4.8)
    delivery_time = models.CharField(max_length=50, default='20-35 daqiqa')
    delivery_fee = models.IntegerField(default=5000)
    is_open = models.BooleanField(default=True)
    image_url = models.URLField(max_length=500)

    def __str__(self):
        return self.name

class StoreMenuItem(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='menu_items')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField()
    category = models.CharField(max_length=50, default='Taomlar')
    image_url = models.URLField(max_length=500)

    def __str__(self):
        return f"{self.store.name} - {self.name}"

class Order(models.Model):
    ORDER_TYPE_CHOICES = (
        ('market', 'Market'),
        ('delivery', 'Yetkazib berish'),
    )
    user_name = models.CharField(max_length=100, default='Mijoz')
    phone = models.CharField(max_length=20, default='+998901234567')
    order_type = models.CharField(max_length=20, choices=ORDER_TYPE_CHOICES, default='market')
    items_json = models.JSONField(default=list)
    total_price = models.IntegerField()
    delivery_fee = models.IntegerField(default=0)
    address = models.TextField()
    payment_method = models.CharField(max_length=20, default='cash')
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.total_price} so'm"
