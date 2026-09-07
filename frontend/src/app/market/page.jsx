'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, Search, Plus, Minus, Zap, Clock, ShieldCheck, 
  ArrowRight, X, CheckCircle2, Sparkles, MapPin, Tag, Heart
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const GROCERY_CATEGORIES = [
  { id: 'all', name: 'Barchasi', icon: '✨' },
  { id: 'fruits', name: 'Meva & Sabzavot', icon: '🍎' },
  { id: 'dairy', name: 'Sut & Tuxum', icon: '🥛' },
  { id: 'bakery', name: 'Non & Pishiriq', icon: '🥖' },
  { id: 'drinks', name: 'Ichimliklar', icon: '🥤' },
  { id: 'meat', name: 'Go\'sht & Parranda', icon: '🥩' },
  { id: 'snacks', name: 'Shirinliklar & Chipslar', icon: '🍫' },
];

const PRODUCTS = [
  { id: 'p1', category: 'fruits', name: 'Ekvador Banani (1 kg)', price: 22000, oldPrice: 26000, discount: '-15%', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80', weight: '1 kg' },
  { id: 'p2', category: 'fruits', name: 'Qizil Olma Fuji (1 kg)', price: 16000, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80', weight: '1 kg' },
  { id: 'p3', category: 'fruits', name: 'Yangi Pomidor (1 kg)', price: 18000, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80', weight: '1 kg' },
  { id: 'p4', category: 'dairy', name: 'Nestle Sut 3.2% (1 litr)', price: 14000, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80', weight: '1 litr' },
  { id: 'p5', category: 'dairy', name: 'Smetana Qaymoq 20% (400g)', price: 17500, oldPrice: 20000, discount: '-12%', image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=300&auto=format&fit=crop&q=80', weight: '400 g' },
  { id: 'p6', category: 'dairy', name: 'Tuxum S1 (10 dona)', price: 16000, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&auto=format&fit=crop&q=80', weight: '10 dona' },
  { id: 'p7', category: 'bakery', name: 'Issiq Tandir Non', price: 5000, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80', weight: '1 dona' },
  { id: 'p8', category: 'bakery', name: 'Fransuz Bageti', price: 9000, image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=300&auto=format&fit=crop&q=80', weight: '300 g' },
  { id: 'p9', category: 'drinks', name: 'Coca-Cola Classic (1.5 L)', price: 13500, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80', weight: '1.5 L' },
  { id: 'p10', category: 'drinks', name: 'Chortoq Mineral Suv (0.5 L)', price: 6000, image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=300&auto=format&fit=crop&q=80', weight: '0.5 L' },
  { id: 'p11', category: 'meat', name: 'Mol Go\'shti Lahm (1 kg)', price: 98000, image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&auto=format&fit=crop&q=80', weight: '1 kg' },
  { id: 'p12', category: 'snacks', name: 'Nutella Shokolad pastasi (350g)', price: 42000, oldPrice: 48000, discount: '-12%', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80', weight: '350 g' },
];

export default function MarketPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        count: (prev[product.id]?.count || 0) + 1,
      }
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const current = prev[productId]?.count || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          count: current - 1,
        }
      };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.count), 0);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCheckout = () => {
    setOrderPlaced(true);
    setShowCheckout(false);
    setCart({});
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-[#121214] text-[#121214] dark:text-[#F5F5F7] pb-32 font-sans transition-colors">
      
      {/* Top Banner (Yandex Lavka 15 min guarantee) */}
      <div className="bg-[#FCE000] text-[#121214] px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#121214] text-[#FCE000] flex items-center justify-center font-black text-sm">
              ⚡
            </div>
            <div>
              <h2 className="font-black text-sm leading-tight">UzGo Lavka — 15 daqiqada eshikkacha</h2>
              <span className="text-[11px] font-bold opacity-80">Yangi mahsulotlar va kafolatlangan sifat</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#121214] text-[#FCE000] px-3 py-1.5 rounded-xl text-xs font-black shadow-sm">
            <Clock size={14} />
            <span>15 daqiqa</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 pt-5 space-y-6">

        {/* Search Bar & Address */}
        <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mahsulot qidirish (Sut, Non, Banan)..."
              className="w-full bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white pl-10 pr-4 py-2 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-[#FCE000]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-black text-gray-500">
            <MapPin size={15} className="text-[#FC3F1D]" />
            <span>Yetkazish: <strong>Toshkent, Amir Temur 14</strong></span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {GROCERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all apple-card-press ${
                activeCategory === cat.id
                  ? 'bg-[#121214] text-[#FCE000] dark:bg-white dark:text-[#121214] shadow-md scale-105'
                  : 'bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Order Placed Success Alert */}
        {orderPlaced && (
          <div className="bg-[#10B981]/15 border border-[#10B981]/30 p-4 rounded-3xl flex items-center justify-between text-xs font-black text-[#10B981] animate-pulse">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              <span>Buyurtma qabul qilindi! Lavka kuryeri 15 daqiqada yetib boradi.</span>
            </div>
            <button onClick={() => setOrderPlaced(false)} className="text-gray-500 hover:text-black">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {filteredProducts.map((p) => {
            const countInCart = cart[p.id]?.count || 0;
            return (
              <div
                key={p.id}
                className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-3 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all group relative"
              >
                {/* Discount Badge */}
                {p.discount && (
                  <span className="absolute top-4 left-4 bg-[#FC3F1D] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm z-10">
                    {p.discount}
                  </span>
                )}

                <div className="overflow-hidden rounded-2xl mb-2 bg-gray-50 dark:bg-gray-800">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 font-bold block">{p.weight}</span>
                  <h4 className="font-black text-xs text-[#121214] dark:text-white line-clamp-2 mt-0.5">
                    {p.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="font-black text-xs text-[#121214] dark:text-white block">
                      {p.price.toLocaleString()} so'm
                    </span>
                    {p.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through block">
                        {p.oldPrice.toLocaleString()} so'm
                      </span>
                    )}
                  </div>

                  {countInCart > 0 ? (
                    <div className="flex items-center gap-2 bg-[#FCE000] text-[#121214] rounded-xl px-2 py-1 shadow-sm">
                      <button onClick={() => removeFromCart(p.id)} className="font-black text-xs">
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-black">{countInCart}</span>
                      <button onClick={() => addToCart(p)} className="font-black text-xs">
                        <Plus size={13} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-gray-100 dark:bg-[#26262A] hover:bg-[#FCE000] dark:hover:bg-[#FCE000] text-[#121214] dark:text-white dark:hover:text-[#121214] p-2 rounded-xl transition-colors apple-card-press"
                    >
                      <Plus size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Bottom Cart Pill */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 z-40 max-w-md mx-auto">
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-[#121214] dark:bg-white text-[#FCE000] dark:text-[#121214] p-4 rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.3)] flex items-center justify-between font-black text-sm apple-card-press"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} />
              <span>Savatda: {totalItems} ta mahsulot</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{totalPrice.toLocaleString()} so'm</span>
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
      )}

      {/* Slide-Over Express Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-end">
          <div className="w-full sm:max-w-md h-[90vh] sm:h-full bg-white dark:bg-[#1C1C1E] rounded-t-3xl sm:rounded-l-3xl p-5 flex flex-col justify-between shadow-2xl space-y-4">
            
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="font-black text-base text-[#121214] dark:text-white flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#FCE000]" /> Lavka Buyurtmasi
                </h3>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items in Cart */}
              <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[45vh] overflow-y-auto mt-2">
                {Object.values(cart).map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-xs text-[#121214] dark:text-white">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-bold">
                        {item.price.toLocaleString()} so'm x {item.count}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#26262A] rounded-xl px-2 py-1">
                      <button onClick={() => removeFromCart(item.id)} className="font-black text-xs">
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-black">{item.count}</span>
                      <button onClick={() => addToCart(item)} className="font-black text-xs">
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Calculation */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3">
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>Ekspress yetkazish (15 daqiqa)</span>
                <span className="text-emerald-500 font-black">Bepul</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>Keshbek (UzGo Pay)</span>
                <span className="text-[#FCE000] font-black">+{Math.round(totalPrice * 0.03).toLocaleString()} so'm (3%)</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#121214] dark:text-white">
                <span>Jami to'lov:</span>
                <span>{totalPrice.toLocaleString()} so'm</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#FCE000] hover:bg-[#E5CB00] text-[#121214] py-4 rounded-2xl font-black text-sm shadow-lg apple-card-press flex items-center justify-center gap-2"
              >
                <span>Buyurtma berish (15 min)</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
