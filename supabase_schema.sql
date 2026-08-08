-- UzGo Super-App Supabase PostgreSQL Database Schema

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) DEFAULT 'Foydalanuvchi',
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Taxi Rides Table
CREATE TABLE IF NOT EXISTS public.taxi_rides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    from_address TEXT NOT NULL,
    to_address TEXT NOT NULL,
    tariff VARCHAR(20) DEFAULT 'economy',
    price INT DEFAULT 12000,
    driver_name VARCHAR(100),
    car_model VARCHAR(100),
    plate_number VARCHAR(20),
    status VARCHAR(20) DEFAULT 'searching',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Market Products Table
CREATE TABLE IF NOT EXISTS public.market_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    old_price INT,
    category_id VARCHAR(50) DEFAULT 'all',
    stock INT DEFAULT 10,
    rating FLOAT DEFAULT 4.8,
    reviews_count INT DEFAULT 50,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Stores Table
CREATE TABLE IF NOT EXISTS public.stores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_icon VARCHAR(10) DEFAULT '🍕',
    rating FLOAT DEFAULT 4.8,
    delivery_time VARCHAR(50) DEFAULT '20-35 daqiqa',
    delivery_fee INT DEFAULT 5000,
    is_open BOOLEAN DEFAULT true,
    image_url TEXT
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name VARCHAR(100) DEFAULT 'Mijoz',
    phone VARCHAR(20) DEFAULT '+998901234567',
    order_type VARCHAR(20) DEFAULT 'market',
    items JSONB DEFAULT '[]'::jsonb,
    total_price INT NOT NULL,
    delivery_fee INT DEFAULT 0,
    address TEXT NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'cash',
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initial Mock Data Insertions for UzGo
INSERT INTO public.market_products (name, description, price, old_price, category_id, stock, rating, image_url) VALUES
('Samsung Galaxy A54 128GB', '6.4" Super AMOLED, 5000mAh', 3850000, 4200000, 'cat1', 15, 4.7, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'),
('AirPods Pro 2', 'Aktiv shovqin yutuvchi, USB-C', 2100000, 2400000, 'cat1', 8, 4.9, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'),
('Adidas Ultraboost 22', 'Professional yugurish poyabzali', 1200000, 1500000, 'cat4', 20, 4.6, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'),
('Nike Air Force 1 White', 'Klassik dizayn, premium charm', 950000, 1100000, 'cat4', 30, 4.8, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'),
('MacBook Air M2 256GB', '13.6" Liquid Retina, 8GB RAM', 12500000, 13500000, 'cat1', 5, 4.9, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400')
ON CONFLICT DO NOTHING;

INSERT INTO public.stores (name, category, category_icon, rating, delivery_time, delivery_fee, is_open, image_url) VALUES
('Toshkent Pizza', 'pizza', '🍕', 4.8, '25-40 daqiqa', 5000, true, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'),
('Burger House', 'burger', '🍔', 4.7, '20-35 daqiqa', 4000, true, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400')
ON CONFLICT DO NOTHING;
