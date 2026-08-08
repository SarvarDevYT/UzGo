'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, ShoppingCart, Star, ChevronRight, Tag, Zap, TrendingUp } from 'lucide-react';
import { addItem } from '../../store/cartSlice';
import { supabase } from '../../services/supabaseClient';
import api from '../../services/api';

const CATEGORIES = [
  { id: 'all', name: 'Barchasi', icon: '🔥' },
  { id: 'cat1', name: 'Elektronika', icon: '📱' },
  { id: 'cat2', name: 'Kiyim', icon: '👗' },
  { id: 'cat3', name: 'Oziq-ovqat', icon: '🥦' },
  { id: 'cat4', name: 'Sport', icon: '⚽' },
  { id: 'cat5', name: 'Uy-joy', icon: '🏠' },
];

const formatPrice = (price) => price?.toLocaleString('ru-RU') + " so'm";

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
    <div className="card flex flex-col overflow-hidden group bg-[#181A20] border border-[#2C303E] hover:border-[#F2A93B]/50 rounded-3xl transition-all duration-300 shadow-xl">
      <div className="relative overflow-hidden bg-[#0F1015]">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400'; }}
        />
        {discount > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-[#FF5B4C] text-white text-xs font-black px-2 py-1 rounded-xl shadow-lg">
            -{discount}%
          </span>
        )}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute top-2.5 right-2.5 bg-[#F2A93B] text-[#0F1015] text-xs font-bold px-2 py-0.5 rounded-lg">
            Kam qoldi
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-white line-clamp-2 mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-1 mb-2 font-medium">{product.description}</p>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-[#F2A93B] text-[#F2A93B]" />
          <span className="text-xs font-bold text-[#F2A93B]">{product.rating || 4.8}</span>
          <span className="text-xs text-gray-500">({product.reviews_count || 50})</span>
        </div>

        <div className="mt-auto mb-3">
          <div className="text-lg font-black text-white">
            {formatPrice(product.price)}
          </div>
          {product.old_price && (
            <div className="text-xs text-gray-500 line-through font-medium">{formatPrice(product.old_price)}</div>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className={`w-full py-3 rounded-2xl text-xs font-extrabold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-[#F2A93B] text-[#0F1015] hover:bg-[#E0982A] shadow-md shadow-[#F2A93B]/20'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? "Qo'shildi ✓" : inCart ? `+1 (${inCart.quantity})` : "Savatga"}
        </button>
      </div>
    </div>
  );
};

export default function MarketPage() {
  const router = useRouter();
  const cartItems = useSelector(s => s.cart.items);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setLoading(true);
    supabase
      .from('market_products')
      .select('*')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(data);
          setLoading(false);
        } else {
          api.get('/market/products/')
            .then(resData => {
              const list = Array.isArray(resData) ? resData : resData.results || [];
              setProducts(list);
            })
            .catch(() => {
              setProducts([
                { id: 1, name: 'Samsung Galaxy A54 128GB', description: '6.4" Super AMOLED, 5000mAh, 50MP', price: 3850000, old_price: 4200000, category_id: 'cat1', stock: 15, rating: 4.7, image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
                { id: 2, name: 'AirPods Pro 2', description: 'Aktiv shovqin yutuvchi, USB-C korpus', price: 2100000, old_price: 2400000, category_id: 'cat1', stock: 8, rating: 4.9, image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400' },
                { id: 3, name: 'Adidas Ultraboost 22', description: 'Professional yugurish poyabzali', price: 1200000, old_price: 1500000, category_id: 'cat4', stock: 20, rating: 4.6, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
                { id: 4, name: 'Nike Air Force 1 White', description: 'Klassik dizayn, premium charm', price: 950000, old_price: 1100000, category_id: 'cat4', stock: 30, rating: 4.8, image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400' },
                { id: 5, name: 'MacBook Air M2 256GB', description: '13.6" Liquid Retina, 8GB RAM', price: 12500000, old_price: 13500000, category_id: 'cat1', stock: 5, rating: 4.9, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
                { id: 6, name: 'Dyson V12 Detect Slim', description: 'Simsiz changyutgich, lazer chiroqli', price: 5200000, old_price: 5800000, category_id: 'cat5', stock: 4, rating: 4.9, image_url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400' },
              ]);
            })
            .finally(() => setLoading(false));
        }
      });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category_id === activeCategory);
    }
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [products, activeCategory, search]);

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-28">
      {/* Market Hero Banner (Gold Amber Accent) */}
      <div className="relative py-8 px-4 bg-gradient-to-r from-[#F2A93B]/20 via-[#181A20] to-[#0F1015] border-b border-[#2C303E]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🛍️</span>
            <div>
              <h1 className="text-2xl font-black text-white">UzGo Market</h1>
              <p className="text-xs text-[#F2A93B] font-medium">Minglab sifatli mahsulotlar onlayn do'koni</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Mahsulotlarni qidiring..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#181A20] border border-[#2C303E] text-white font-medium outline-none focus:border-[#F2A93B] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#F2A93B] text-[#0F1015] shadow-lg shadow-[#F2A93B]/20'
                  : 'bg-[#181A20] border border-[#2C303E] text-gray-400 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm font-medium">Mahsulotlar yuklanmoqda...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Checkout Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up w-full max-w-md px-4">
          <button
            onClick={() => router.push('/market/cart')}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl shadow-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 bg-[#F2A93B] text-[#0F1015] shadow-[#F2A93B]/30"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Savat — {cartCount} mahsulot</span>
            </div>
            <div className="flex items-center gap-1 text-base font-black">
              <span>{cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString('ru-RU')} so'm</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
