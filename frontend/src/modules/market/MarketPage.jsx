import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, ShoppingCart, Star, ChevronRight, Tag, Zap, TrendingUp } from 'lucide-react';
import { addItem } from '../../store/cartSlice';
import api from '../../services/api';

// Kategoriyalar
const CATEGORIES = [
  { id: 'all', name: 'Barchasi', icon: '🔥' },
  { id: 'cat1', name: 'Elektronika', icon: '📱' },
  { id: 'cat2', name: 'Kiyim', icon: '👗' },
  { id: 'cat3', name: 'Oziq-ovqat', icon: '🥦' },
  { id: 'cat4', name: 'Sport', icon: '⚽' },
  { id: 'cat5', name: 'Uy-joy', icon: '🏠' },
  { id: 'cat6', name: "Go'zallik", icon: '💄' },
  { id: 'cat7', name: 'Avtomobil', icon: '🚗' },
  { id: 'cat8', name: "O'yinchoq", icon: '🧸' },
];

// Narxni formatlash
const formatPrice = (price) => price?.toLocaleString('ru-RU') + " so'm";

// Skeleton loader
const ProductSkeleton = () => (
  <div className="card p-3 animate-pulse">
    <div className="skeleton w-full h-44 rounded-xl mb-3" />
    <div className="skeleton h-4 w-3/4 mb-2 rounded" />
    <div className="skeleton h-3 w-1/2 mb-3 rounded" />
    <div className="skeleton h-8 w-full rounded-xl" />
  </div>
);

// Mahsulot kartasi
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(s => s.cart.items);
  const [added, setAdded] = useState(false);

  const inCart = cartItems.find(i => i.id === product.id);
  const discount = product.old_price
    ? Math.round((1 - product.price / product.old_price) * 100)
    : null;

  const handleAdd = () => {
    dispatch(addItem({ item: product, storeId: 'market', storeName: 'Market', isDelivery: false }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card card-hover flex flex-col overflow-hidden group">
      {/* Rasm */}
      <div className="relative overflow-hidden" style={{ background: '#1f2937' }}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400'; }}
        />
        {discount && (
          <span className="absolute top-2 left-2 badge-error badge text-xs font-bold px-2">
            -{discount}%
          </span>
        )}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute top-2 right-2 badge-warning badge text-xs">
            Kam qoldi
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Tugagan</span>
          </div>
        )}
      </div>

      {/* Ma'lumot */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-100 line-clamp-2 mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1 mb-2">{product.description}</p>

        {/* Reyting */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-yellow-400">{product.rating}</span>
          <span className="text-xs text-gray-600">({product.reviews_count})</span>
        </div>

        {/* Narx */}
        <div className="mb-3">
          <div className="text-base font-bold" style={{ color: '#FFC300' }}>
            {formatPrice(product.price)}
          </div>
          {product.old_price && (
            <div className="text-xs text-gray-600 line-through">{formatPrice(product.old_price)}</div>
          )}
        </div>

        {/* Tugma */}
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : product.stock === 0
              ? 'opacity-40 cursor-not-allowed'
              : ''
          }`}
          style={!added && product.stock > 0 ? { background: 'linear-gradient(135deg, #FFC300, #e6af00)', color: '#0d1b3e' } : {}}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? "Qo'shildi ✓" : inCart ? `+1 (${inCart.quantity})` : "Savatga"}
        </button>
      </div>
    </div>
  );
};

// Asosiy sahifa
export default function MarketPage() {
  const navigate = useNavigate();
  const cartItems = useSelector(s => s.cart.items);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const LIMIT = 12;

  // Mock mahsulotlar (API ishlamasa)
  const mockProducts = [
    { id: 'p1', name: 'Samsung Galaxy A54', description: '6.4" Super AMOLED, 128GB, 5000mAh', price: 3850000, old_price: 4200000, image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', category_id: 'cat1', stock: 15, rating: 4.7, reviews_count: 128 },
    { id: 'p2', name: 'AirPods Pro 2', description: 'Aktiv shovqin yutuvchi, USB-C', price: 2100000, old_price: null, image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category_id: 'cat1', stock: 8, rating: 4.9, reviews_count: 256 },
    { id: 'p3', name: 'Adidas Ultraboost 22', description: "Professional yugurish poyabzali", price: 1200000, old_price: 1500000, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category_id: 'cat4', stock: 20, rating: 4.6, reviews_count: 89 },
    { id: 'p4', name: 'Nike Air Force 1', description: 'Klassik dizayn, yuqori sifatli charm', price: 950000, old_price: null, image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', category_id: 'cat4', stock: 30, rating: 4.8, reviews_count: 312 },
    { id: 'p5', name: "Erkaklar ko'ylagi Premium", description: '100% paxta, slim fit', price: 189000, old_price: 250000, image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', category_id: 'cat2', stock: 50, rating: 4.4, reviews_count: 67 },
    { id: 'p6', name: 'Dyson V12 Detect', description: 'Simsiz changyutgich, lazer detection', price: 5200000, old_price: null, image_url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', category_id: 'cat5', stock: 5, rating: 4.9, reviews_count: 44 },
    { id: 'p7', name: 'Xiaomi Smart Watch S1', description: 'AMOLED ekran, GPS, SpO2', price: 720000, old_price: 890000, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category_id: 'cat1', stock: 12, rating: 4.5, reviews_count: 98 },
    { id: 'p8', name: 'Chanel No.5 100ml', description: '100ml EDP, klassik va noyob hid', price: 1450000, old_price: null, image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400', category_id: 'cat6', stock: 7, rating: 4.8, reviews_count: 203 },
    { id: 'p9', name: 'MacBook Air M2', description: '13" Retina, 8GB RAM, 256GB SSD', price: 12500000, old_price: 13000000, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', category_id: 'cat1', stock: 4, rating: 4.9, reviews_count: 87 },
    { id: 'p10', name: 'Gaming Chair', description: "O'yin kresl, ergonomik dizayn", price: 2800000, old_price: 3200000, image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400', category_id: 'cat5', stock: 6, rating: 4.3, reviews_count: 35 },
    { id: 'p11', name: 'Sony WH-1000XM5', description: 'Simsiz quloqchin, 30 soat batareya', price: 3200000, old_price: null, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category_id: 'cat1', stock: 9, rating: 4.8, reviews_count: 167 },
    { id: 'p12', name: "Ayollar ko'ylagi", description: "Ipak, turli ranglarda, premium sifat", price: 320000, old_price: 420000, image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', category_id: 'cat2', stock: 25, rating: 4.6, reviews_count: 112 },
    { id: 'p13', name: 'LEGO Technic Set', description: "8+ yosh, 700+ bo'lak", price: 850000, old_price: null, image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', category_id: 'cat8', stock: 14, rating: 4.7, reviews_count: 56 },
    { id: 'p14', name: 'Avtomobil DVR 4K', description: "4K kamera, GPS, Wi-Fi", price: 480000, old_price: 600000, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category_id: 'cat7', stock: 18, rating: 4.4, reviews_count: 43 },
  ];

  // Mahsulotlarni yuklash
  useEffect(() => {
    setLoading(true);
    api.get('/market/products')
      .then(data => setProducts(data.products || mockProducts))
      .catch(() => setProducts(mockProducts))
      .finally(() => setLoading(false));
  }, []);

  // Filtr va sort
  useEffect(() => {
    let result = [...products];
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category_id === activeCategory);
    }
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (priceRange.min) result = result.filter(p => p.price >= Number(priceRange.min));
    if (priceRange.max) result = result.filter(p => p.price <= Number(priceRange.max));

    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'new': result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
    }
    setFilteredProducts(result);
    setPage(1);
  }, [products, activeCategory, search, sortBy, priceRange]);

  const paginated = filteredProducts.slice(0, page * LIMIT);
  const hasMore = paginated.length < filteredProducts.length;

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden py-8 px-4"
        style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1a2744 60%, #243e88 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #FFC300 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🛍️</span>
            <div>
              <h1 className="text-2xl font-black text-white">UzGo Market</h1>
              <p className="text-sm text-gray-400">14,000+ mahsulot bir joyda</p>
            </div>
          </div>

          {/* Qidiruv */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Mahsulot qidiring..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-white font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,195,0,0.2)', backdropFilter: 'blur(10px)' }}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all"
              style={{ background: showFilters ? '#FFC300' : 'rgba(255,195,0,0.15)', color: showFilters ? '#0d1b3e' : '#FFC300' }}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Tez statistika */}
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Tez yetkazib berish</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-green-400" />
              <span>Chegirmalar mavjud</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Ommalashgan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-24">
        {/* Qo'shimcha filtrlar */}
        {showFilters && (
          <div className="card p-4 mt-4 animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Filtr va saralash</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Min narx (so'm)</label>
                <input
                  value={priceRange.min}
                  onChange={e => setPriceRange(p => ({ ...p, min: e.target.value }))}
                  placeholder="100,000"
                  className="input-field text-sm py-2"
                  type="number"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Max narx (so'm)</label>
                <input
                  value={priceRange.max}
                  onChange={e => setPriceRange(p => ({ ...p, max: e.target.value }))}
                  placeholder="5,000,000"
                  className="input-field text-sm py-2"
                  type="number"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs text-gray-500 mb-1 block">Saralash</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { val: 'default', label: 'Standart' },
                  { val: 'price_asc', label: 'Arzon ↑' },
                  { val: 'price_desc', label: 'Qimmat ↓' },
                  { val: 'rating', label: 'Reyting ★' },
                  { val: 'new', label: 'Yangi 🆕' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setSortBy(opt.val)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      sortBy === opt.val
                        ? 'border-accent text-accent'
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                    style={sortBy === opt.val ? { background: 'rgba(255,195,0,0.1)', borderColor: '#FFC300', color: '#FFC300' } : {}}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {(priceRange.min || priceRange.max || sortBy !== 'default') && (
              <button
                onClick={() => { setPriceRange({ min: '', max: '' }); setSortBy('default'); }}
                className="text-xs text-red-400 mt-3 hover:text-red-300"
              >
                Filtrni tozalash ✕
              </button>
            )}
          </div>
        )}

        {/* Kategoriyalar */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id ? 'text-gray-900 shadow-lg' : ''
              }`}
              style={
                activeCategory === cat.id
                  ? { background: '#FFC300', color: '#0d1b3e' }
                  : { background: '#1f2937', border: '1px solid #374151', color: '#9ca3af' }
              }
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Natijalar info */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {filteredProducts.length} ta mahsulot topildi
            {search && <span className="text-accent ml-1">"{search}"</span>}
          </span>
          {cartCount > 0 && (
            <button
              onClick={() => navigate('/market/cart')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#FFC300', color: '#0d1b3e' }}
            >
              <ShoppingCart className="w-4 h-4" />
              Savat ({cartCount})
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mahsulotlar grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Mahsulot topilmadi</h3>
            <p className="text-sm text-gray-500 mb-6">Boshqa kalit so'z bilan qidiring</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="btn-accent px-6 py-2.5 text-sm"
            >
              Barcha mahsulotlar
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {paginated.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Ko'proq yuklash */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="btn-ghost px-8 py-3 text-sm"
                >
                  Ko'proq ko'rsatish ({filteredProducts.length - paginated.length} ta qoldi)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pastdagi savat float button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
          <button
            onClick={() => navigate('/market/cart')}
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: '#FFC300', color: '#0d1b3e', boxShadow: '0 8px 30px rgba(255,195,0,0.4)' }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{cartCount} ta mahsulot</span>
            <span className="text-gray-900/70">|</span>
            <span>
              {cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString('ru-RU')} so'm
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
