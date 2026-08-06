const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// === FOYDALANUVCHILAR ===
const users = [
  { id: 'u1', name: 'Alisher Karimov', phone: '+998901234567', password_hash: bcrypt.hashSync('test1234', 10), role: 'customer', created_at: new Date('2024-01-15'), avatar: null },
  { id: 'u2', name: 'Jasur Toshmatov', phone: '+998901112233', password_hash: bcrypt.hashSync('test1234', 10), role: 'driver', created_at: new Date('2024-02-10'), avatar: null },
  { id: 'u3', name: 'Nodira Yusupova', phone: '+998907654321', password_hash: bcrypt.hashSync('test1234', 10), role: 'courier', created_at: new Date('2024-03-05'), avatar: null },
  { id: 'u4', name: 'Sardor Admin', phone: '+998990000001', password_hash: bcrypt.hashSync('admin1234', 10), role: 'admin', created_at: new Date('2024-01-01'), avatar: null },
  { id: 'u5', name: 'Behruz Rahimov', phone: '+998991112233', password_hash: bcrypt.hashSync('test1234', 10), role: 'driver', created_at: new Date('2024-03-15'), avatar: null },
];

// === HAYDOVCHILAR ===
const drivers = [
  { id: 'd1', user_id: 'u2', name: 'Jasur Toshmatov', car_model: 'Chevrolet Cobalt', plate: '01 A 123 BC', rating: 4.8, rides_count: 342, status: 'online', lat: 41.2995, lng: 69.2401 },
  { id: 'd2', user_id: 'u5', name: 'Behruz Rahimov', car_model: 'Chevrolet Nexia 3', plate: '01 B 456 CD', rating: 4.6, rides_count: 218, status: 'online', lat: 41.3005, lng: 69.2450 },
  { id: 'd3', user_id: 'u6', name: 'Sherzod Mirzaev', car_model: 'Chevrolet Lacetti', plate: '01 C 789 EF', rating: 4.9, rides_count: 510, status: 'offline', lat: 41.2980, lng: 69.2380 },
];

// === SAYOHATLAR ===
const rides = [
  { id: 'r1', customer_id: 'u1', driver_id: 'd1', from_address: 'Chilonzor metro', to_address: "Amir Temur ko'chasi", tariff: 'comfort', price: 18000, status: 'completed', created_at: new Date('2024-07-01T10:30:00') },
  { id: 'r2', customer_id: 'u1', driver_id: 'd2', from_address: 'Yunusobod 19-kvartal', to_address: 'Olmazor bozori', tariff: 'economy', price: 12000, status: 'completed', created_at: new Date('2024-07-03T14:15:00') },
  { id: 'r3', customer_id: 'u3', driver_id: 'd1', from_address: 'Sergeli', to_address: 'Yunusobod', tariff: 'premium', price: 35000, status: 'completed', created_at: new Date('2024-07-05T09:00:00') },
];

// === KATEGORIYALAR ===
const categories = [
  { id: 'cat1', name: 'Elektronika', icon: '📱', slug: 'electronics', is_active: true },
  { id: 'cat2', name: "Kiyim-kechak", icon: '👗', slug: 'clothing', is_active: true },
  { id: 'cat3', name: 'Oziq-ovqat', icon: '🥦', slug: 'food', is_active: true },
  { id: 'cat4', name: 'Sport', icon: '⚽', slug: 'sports', is_active: true },
  { id: 'cat5', name: 'Uy-joy', icon: '🏠', slug: 'home', is_active: true },
  { id: 'cat6', name: "Go'zallik", icon: '💄', slug: 'beauty', is_active: true },
  { id: 'cat7', name: 'Avtomobil', icon: '🚗', slug: 'auto', is_active: true },
  { id: 'cat8', name: "O'yinchoqlar", icon: '🧸', slug: 'toys', is_active: true },
];

// === MAHSULOTLAR (kengaytirilgan) ===
const products = [
  { id: 'p1', name: 'Samsung Galaxy A54', description: '6.4" Super AMOLED, 128GB, 5000mAh', price: 3850000, old_price: 4200000, image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', category_id: 'cat1', seller_id: 's1', stock: 15, rating: 4.7, reviews_count: 128, is_active: true, created_at: new Date('2024-06-01') },
  { id: 'p2', name: 'AirPods Pro 2', description: 'Aktiv shovqin yutuvchi, USB-C, 30 soat batareya', price: 2100000, old_price: null, image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category_id: 'cat1', seller_id: 's1', stock: 8, rating: 4.9, reviews_count: 256, is_active: true, created_at: new Date('2024-06-02') },
  { id: 'p3', name: 'Adidas Ultraboost 22', description: "Professional yugurish poyabzali", price: 1200000, old_price: 1500000, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category_id: 'cat4', seller_id: 's2', stock: 20, rating: 4.6, reviews_count: 89, is_active: true, created_at: new Date('2024-06-03') },
  { id: 'p4', name: 'Nike Air Force 1', description: 'Klassik dizayn, yuqori sifatli charm', price: 950000, old_price: null, image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', category_id: 'cat4', seller_id: 's2', stock: 30, rating: 4.8, reviews_count: 312, is_active: true, created_at: new Date('2024-06-04') },
  { id: 'p5', name: "Erkaklar ko'ylagi", description: '100% paxta, slim fit', price: 189000, old_price: 250000, image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', category_id: 'cat2', seller_id: 's3', stock: 50, rating: 4.4, reviews_count: 67, is_active: true, created_at: new Date('2024-06-05') },
  { id: 'p6', name: 'Dyson V12 Detect', description: 'Simsiz changyutgich, lazer detection', price: 5200000, old_price: null, image_url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', category_id: 'cat5', seller_id: 's4', stock: 5, rating: 4.9, reviews_count: 44, is_active: true, created_at: new Date('2024-06-06') },
  { id: 'p7', name: 'Xiaomi Smart Watch S1', description: 'AMOLED ekran, GPS, SpO2', price: 720000, old_price: 890000, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category_id: 'cat1', seller_id: 's1', stock: 12, rating: 4.5, reviews_count: 98, is_active: true, created_at: new Date('2024-06-07') },
  { id: 'p8', name: 'Chanel No.5 100ml', description: '100ml EDP, klassik va noyob hid', price: 1450000, old_price: null, image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400', category_id: 'cat6', seller_id: 's5', stock: 7, rating: 4.8, reviews_count: 203, is_active: true, created_at: new Date('2024-06-08') },
  { id: 'p9', name: 'MacBook Air M2', description: '13" Retina, 8GB RAM, 256GB SSD', price: 12500000, old_price: 13000000, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', category_id: 'cat1', seller_id: 's1', stock: 4, rating: 4.9, reviews_count: 87, is_active: true, created_at: new Date('2024-06-09') },
  { id: 'p10', name: 'Gaming Chair', description: "O'yin kresl, ergonomik dizayn", price: 2800000, old_price: 3200000, image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400', category_id: 'cat5', seller_id: 's4', stock: 6, rating: 4.3, reviews_count: 35, is_active: true, created_at: new Date('2024-06-10') },
  { id: 'p11', name: 'Sony WH-1000XM5', description: 'Simsiz quloqchin, 30 soat batareya', price: 3200000, old_price: null, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category_id: 'cat1', seller_id: 's1', stock: 9, rating: 4.8, reviews_count: 167, is_active: true, created_at: new Date('2024-06-11') },
  { id: 'p12', name: "Ayollar ko'ylagi", description: "Ipak, turli ranglarda, premium sifat", price: 320000, old_price: 420000, image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', category_id: 'cat2', seller_id: 's3', stock: 25, rating: 4.6, reviews_count: 112, is_active: true, created_at: new Date('2024-06-12') },
  { id: 'p13', name: 'LEGO Technic Set', description: "8+ yosh, 700+ bo'lak, murakkab model", price: 850000, old_price: null, image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', category_id: 'cat8', seller_id: 's6', stock: 14, rating: 4.7, reviews_count: 56, is_active: true, created_at: new Date('2024-06-13') },
  { id: 'p14', name: 'Avtomobil DVR', description: "4K kamera, GPS, Wi-Fi ulanish", price: 480000, old_price: 600000, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category_id: 'cat7', seller_id: 's7', stock: 18, rating: 4.4, reviews_count: 43, is_active: true, created_at: new Date('2024-06-14') },
];

// === MARKET BUYURTMALARI ===
const marketOrders = [
  { id: 'mo1', user_id: 'u1', items: [{product_id:'p1', name:'Samsung Galaxy A54', qty:1, price:3850000}], total: 3850000, status: 'delivered', address: 'Yunusobod, 15-uy', created_at: new Date('2024-07-10') },
  { id: 'mo2', user_id: 'u3', items: [{product_id:'p3', name:'Adidas Ultraboost', qty:2, price:1200000}], total: 2400000, status: 'pending', address: 'Chilonzor, 9-kvartal', created_at: new Date('2024-07-15') },
];

// === YETKAZIB BERISH DO'KONLARI ===
const stores = [
  { id: 'st1', name: 'Toshkent Pizza', category: 'pizza', category_icon: '🍕', description: 'Eng mazali italyan pizzasi', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', rating: 4.8, reviews_count: 340, delivery_time: '25-40 daqiqa', delivery_fee: 5000, min_order: 20000, is_open: true },
  { id: 'st2', name: 'Sushi Master', category: 'sushi', category_icon: '🍣', description: 'Yaponiya oshxonasi', image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', rating: 4.7, reviews_count: 215, delivery_time: '30-50 daqiqa', delivery_fee: 7000, min_order: 35000, is_open: true },
  { id: 'st3', name: 'Burger House', category: 'burger', category_icon: '🍔', description: "Qo'lda tayyorlangan burger", image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', rating: 4.6, reviews_count: 180, delivery_time: '20-35 daqiqa', delivery_fee: 4000, min_order: 25000, is_open: true },
  { id: 'st4', name: 'Osh Markazi', category: 'uzbek', category_icon: '🍲', description: "Milliy o'zbek taomlari", image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', rating: 4.9, reviews_count: 520, delivery_time: '35-55 daqiqa', delivery_fee: 3000, min_order: 15000, is_open: true },
  { id: 'st5', name: 'Anhor Dorixonasi', category: 'pharmacy', category_icon: '💊', description: 'Dori va vitaminlar', image_url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400', rating: 4.5, reviews_count: 96, delivery_time: '15-30 daqiqa', delivery_fee: 2000, min_order: 5000, is_open: true },
  { id: 'st6', name: 'Fresh Market', category: 'grocery', category_icon: '🛒', description: 'Yangi sabzavot va mevalar', image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', rating: 4.4, reviews_count: 134, delivery_time: '20-40 daqiqa', delivery_fee: 5000, min_order: 30000, is_open: false },
];

// === MENYULAR ===
const menus = {
  st1: [
    { id: 'm1', name: 'Margarita', price: 45000, description: '32sm, pishloq, pomidor sousi', category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
    { id: 'm2', name: 'Pepperoni', price: 52000, description: '32sm, pepperoni, mozzarella', category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
    { id: 'm3', name: 'Havzali pizza', price: 49000, description: '32sm, dengiz mahsulotlari', category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
    { id: 'm4', name: 'Cola 0.5L', price: 8000, description: 'Sovuq ichimlik', category: 'Ichimliklar', image_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300' },
  ],
  st2: [
    { id: 'm5', name: 'Philadelphia Roll', price: 65000, description: '8 dona, tun baliq, krem pishloq', category: 'Rollar', image_url: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300' },
    { id: 'm6', name: 'California Roll', price: 58000, description: '8 dona, qisqichbaqa, avokado', category: 'Rollar', image_url: 'https://images.unsplash.com/photo-1617196034854-6cf98aab2b2c?w=300' },
    { id: 'm7', name: "Miso sho'rva", price: 25000, description: "An'anaviy yapon sho'rvasi", category: "Qo'shimcha", image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300' },
  ],
  st3: [
    { id: 'm8', name: 'Classic Burger', price: 35000, description: "200g mol go'shti, salat, pomidor", category: 'Burgerlar', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
    { id: 'm9', name: 'Double Smash', price: 48000, description: '2x150g, bekon, eritilgan pishloq', category: 'Burgerlar', image_url: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300' },
    { id: 'm10', name: 'Fri kartoshka (L)', price: 15000, description: 'Qovurilgan kartoshka', category: "Qo'shimcha", image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' },
  ],
  st4: [
    { id: 'm11', name: 'Samarqand Palovi', price: 28000, description: "An'anaviy o'zbek palovi, 500g", category: 'Asosiy taomlar', image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300' },
    { id: 'm12', name: 'Tandirda kabob', price: 35000, description: "300g mol go'shti", category: 'Asosiy taomlar', image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300' },
    { id: 'm13', name: 'Somsa (3 dona)', price: 18000, description: 'Tandirda pishirilgan', category: 'Nonvoylik', image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300' },
  ],
  st5: [
    { id: 'm14', name: 'Paracetamol 500mg', price: 8500, description: '10 ta tabletka', category: 'Dorilar', image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300' },
    { id: 'm15', name: 'Vitamin C 1000mg', price: 35000, description: '30 ta effervescent tabletka', category: 'Vitaminlar', image_url: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=300' },
  ],
  st6: [
    { id: 'm16', name: 'Olma (1kg)', price: 12000, description: 'Yangi Toshkent olmalari', category: 'Mevalar', image_url: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300' },
    { id: 'm17', name: 'Pomidor (1kg)', price: 8000, description: 'Mahalliy pomidor', category: 'Sabzavotlar', image_url: 'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=300' },
  ],
};

// === YETKAZIB BERISH BUYURTMALARI ===
const deliveryOrders = [];

// === OTP saqlash (mock) ===
const otpStore = {};

module.exports = { users, drivers, rides, categories, products, marketOrders, stores, menus, deliveryOrders, otpStore, uuidv4 };
