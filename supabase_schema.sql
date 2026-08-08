-- UzGo Super-App Supabase PostgreSQL Database Schema & Termiz RLS Security Policies

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) DEFAULT 'Foydalanuvchi',
    role VARCHAR(20) DEFAULT 'customer',
    referral_code VARCHAR(20) UNIQUE DEFAULT substring(md5(random()::text) from 1 for 8),
    referred_by VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Taxi Rides Table (Termiz Mototaksi & Scheduled Rides support)
CREATE TABLE IF NOT EXISTS public.taxi_rides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    from_address TEXT NOT NULL,
    to_address TEXT NOT NULL,
    tariff VARCHAR(20) DEFAULT 'economy',
    price INT DEFAULT 12000,
    driver_name VARCHAR(100),
    car_model VARCHAR(100),
    plate_number VARCHAR(20) DEFAULT '75 A 777 AA',
    status VARCHAR(20) DEFAULT 'searching',
    scheduled_time TIMESTAMP WITH TIME ZONE,
    share_token VARCHAR(50) DEFAULT substring(md5(random()::text) from 1 for 10),
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

-- 4. Stores Table (Termiz Stores)
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

-- 5. Orders Table (Click, Payme, Cash & Pochta support)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name VARCHAR(100) DEFAULT 'Mijoz',
    phone VARCHAR(20) DEFAULT '+998901234567',
    order_type VARCHAR(20) DEFAULT 'market', -- market | delivery | pochta
    items JSONB DEFAULT '[]'::jsonb,
    total_price INT NOT NULL,
    delivery_fee INT DEFAULT 0,
    address TEXT NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'cash', -- cash | click | payme
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending | paid | failed
    promo_code VARCHAR(20),
    discount_amount INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Promo Codes Table
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    discount_percent INT DEFAULT 10,
    max_uses INT DEFAULT 100,
    used_count INT DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxi_rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert access for Super-App client operations
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Insert Profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Public Read Taxi Rides" ON public.taxi_rides FOR SELECT USING (true);
CREATE POLICY "Public Insert Taxi Rides" ON public.taxi_rides FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Market Products" ON public.market_products FOR SELECT USING (true);
CREATE POLICY "Public All Admin Market Products" ON public.market_products FOR ALL USING (true);

CREATE POLICY "Public Read Stores" ON public.stores FOR SELECT USING (true);

CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Orders" ON public.orders FOR UPDATE USING (true);

CREATE POLICY "Public Read Promo Codes" ON public.promo_codes FOR SELECT USING (true);
CREATE POLICY "Admin All Promo Codes" ON public.promo_codes FOR ALL USING (true);

-- Initial Mock Data for Termiz Stores
INSERT INTO public.stores (name, category, category_icon, rating, delivery_time, delivery_fee, is_open, image_url) VALUES
('Termiz Fast Food', 'burger', '🍔', 4.9, '15-25 daqiqa', 4000, true, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'),
('Surxon Somsa Markazi', 'national', '🥟', 4.8, '20-30 daqiqa', 5000, true, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'),
('Al-Hakim Kebab', 'shashlik', '🍢', 4.9, '20-35 daqiqa', 5000, true, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400'),
('Termiz Milliy Taomlar', 'national', '🍲', 4.7, '25-40 daqiqa', 6000, true, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400')
ON CONFLICT DO NOTHING;

INSERT INTO public.promo_codes (code, discount_percent, max_uses) VALUES
('TERMIZ10', 10, 500),
('UZGO2026', 15, 1000)
ON CONFLICT DO NOTHING;
