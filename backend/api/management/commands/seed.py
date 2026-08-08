from django.core.management.base import BaseCommand
from api.models import MarketProduct, Store, StoreMenuItem, UserProfile

class Command(BaseCommand):
    help = 'UzGo database initial seed data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding initial UzGo database data...')

        # Seed Users
        UserProfile.objects.get_or_create(phone='+998901234567', defaults={'name': 'Sultonbek Jumayev', 'role': 'customer'})
        UserProfile.objects.get_or_create(phone='+998990000001', defaults={'name': 'Sardor Admin', 'role': 'admin'})
        UserProfile.objects.get_or_create(phone='+998912345678', defaults={'name': 'Rustamjon (Haydovchi)', 'role': 'driver'})

        # Seed Market Products
        mock_products = [
            {'name': 'Samsung Galaxy A54 128GB', 'description': '6.4" Super AMOLED, 5000mAh, 50MP', 'price': 3850000, 'old_price': 4200000, 'category_id': 'cat1', 'stock': 15, 'rating': 4.7, 'image_url': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'},
            {'name': 'AirPods Pro 2', 'description': 'Aktiv shovqin yutuvchi, USB-C korpus', 'price': 2100000, 'old_price': 2400000, 'category_id': 'cat1', 'stock': 8, 'rating': 4.9, 'image_url': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'},
            {'name': 'Adidas Ultraboost 22', 'description': 'Professional yugurish poyabzali', 'price': 1200000, 'old_price': 1500000, 'category_id': 'cat4', 'stock': 20, 'rating': 4.6, 'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'},
            {'name': 'Nike Air Force 1 White', 'description': 'Klassik dizayn, premium charm', 'price': 950000, 'old_price': 1100000, 'category_id': 'cat4', 'stock': 30, 'rating': 4.8, 'image_url': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'},
            {'name': 'MacBook Air M2 256GB', 'description': '13.6" Liquid Retina, 8GB RAM', 'price': 12500000, 'old_price': 13500000, 'category_id': 'cat1', 'stock': 5, 'rating': 4.9, 'image_url': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'},
            {'name': 'Dyson V12 Detect Slim', 'description': 'Simsiz changyutgich, lazer chiroqli', 'price': 5200000, 'old_price': 5800000, 'category_id': 'cat5', 'stock': 4, 'rating': 4.9, 'image_url': 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400'},
        ]

        for prod in mock_products:
            MarketProduct.objects.get_or_create(name=prod['name'], defaults=prod)

        # Seed Stores & Menus
        s1, _ = Store.objects.get_or_create(
            name='Toshkent Pizza',
            defaults={
                'category': 'pizza', 'category_icon': '🍕', 'rating': 4.8, 
                'delivery_time': '25-40 daqiqa', 'delivery_fee': 5000, 'is_open': True,
                'image_url': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
            }
        )
        StoreMenuItem.objects.get_or_create(store=s1, name='Margarita Pizza', defaults={'price': 45000, 'category': 'Pizza', 'image_url': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300'})
        StoreMenuItem.objects.get_or_create(store=s1, name='Pepperoni Pizza', defaults={'price': 52000, 'category': 'Pizza', 'image_url': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300'})

        s2, _ = Store.objects.get_or_create(
            name='Burger House',
            defaults={
                'category': 'burger', 'category_icon': '🍔', 'rating': 4.7, 
                'delivery_time': '20-35 daqiqa', 'delivery_fee': 4000, 'is_open': True,
                'image_url': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
            }
        )
        StoreMenuItem.objects.get_or_create(store=s2, name='Double Cheeseburger', defaults={'price': 38000, 'category': 'Burger', 'image_url': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'})

        self.stdout.write(self.style.SUCCESS('Successfully seeded UzGo Django database!'))
