'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Utensils, Package, Search, Star, Clock, Plus, Minus, ShoppingBag, 
  ArrowRight, X, CheckCircle2, ChevronRight, ShieldCheck, MapPin, 
  Phone, User, Sparkles, Filter, Bike
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const RESTAURANTS = [
  {
    id: 'tandir',
    name: 'Termiz Tandir & Milliy Taomlar',
    category: 'Surxon Tandiri • Osh • Shashlik',
    rating: 4.97,
    deliveryTime: '20-30 daq',
    deliveryFee: 'Bepul',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    logo: '🥩',
    badge: 'Termiz Tandir',
    menu: [
      { id: 't1', name: 'Surxon Tandir Go\'shti (0.5 kg)', price: 65000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&auto=format&fit=crop&q=80', desc: 'Archa bargida dimlangan mayin va shirali Termiz qo\'y go\'shti' },
      { id: 't2', name: 'Surxondaryo To\'y Oshi (1 porsiya)', price: 34000, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80', desc: 'Devzira guruch, barra qo\'y go\'shti, mayiz va qazi' },
      { id: 't3', name: 'Termiz Qatlama Somsasi (3 dona)', price: 24000, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80', desc: 'Qatlama xamir, maydalangan lahm go\'sht va piyozli' },
    ]
  },
  {
    id: 'evos_termiz',
    name: 'EVOS Lavash Termiz',
    category: 'Lavash • Burger • Fast Food',
    rating: 4.92,
    deliveryTime: '15-25 daq',
    deliveryFee: 'Bepul',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=80',
    logo: '🌯',
    badge: 'Tezkor',
    menu: [
      { id: 'ev1', name: 'Mol go\'shtli Lavash (Standart)', price: 34000, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=80', desc: 'Shirali mol go\'shti, chipslar, pomidor va maxsus sous' },
      { id: 'ev2', name: 'Pishloqli Tovuq Lavash', price: 36000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80', desc: 'Eritilgan golland pishlog\'i va nozik tovuq filesi' },
      { id: 'ev3', name: 'Shaurma Kombo', price: 42000, image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=300&auto=format&fit=crop&q=80', desc: 'Katta shaurma, fri kartoshkasi va muzdek ichimlik' },
    ]
  },
  {
    id: 'oqtepa_termiz',
    name: 'Oqtepa Lavash Termiz',
    category: 'Burger • Lavash • Pizza',
    rating: 4.89,
    deliveryTime: '20-30 daq',
    deliveryFee: 'Bepul',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    logo: '🍔',
    badge: 'Mashhur',
    menu: [
      { id: 'oq1', name: 'Oqtepa Big Burger', price: 36000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80', desc: 'Ikkita mol go\'shti kotleti, pishloq va sous' },
      { id: 'oq2', name: 'Fri Kartoshkasi (Katta)', price: 16000, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&auto=format&fit=crop&q=80', desc: 'Qarsildoq oltinrang fri' },
      { id: 'oq3', name: 'Pepperoni Pizza (32 cm)', price: 58000, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&auto=format&fit=crop&q=80', desc: 'Pepperoni kolbasasi va motsarella pishlog\'i' },
    ]
  },
];

export default function DeliveryPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('eats');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  const [cart, setCart] = useState({});
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const [courierFrom, setCourierFrom] = useState('Termiz Markaz, At-Termiziy shoh ko\'chasi 14');
  const [courierTo, setCourierTo] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [packageSize, setPackageSize] = useState('small');

  const categories = ['Barchasi', 'Tandir & Milliy', 'Lavash', 'Burger & Fast Food', 'Pizza'];

  const addToCart = (item, rest) => {
    setCart((prev) => {
      const currentCount = prev[item.id]?.count || 0;
      return {
        ...prev,
        [item.id]: {
          ...item,
          restaurant: rest.name,
          count: currentCount + 1,
        }
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const currentCount = prev[itemId]?.count || 0;
      if (currentCount <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          count: currentCount - 1,
        }
      };
    });
  };

  const totalCartItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
  const totalCartPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.count), 0);

  const handlePlaceFoodOrder = () => {
    setOrderStatus('placed');
    setShowCartDrawer(false);
    setTimeout(() => {
      setOrderStatus('delivering');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-[#121214] text-[#121214] dark:text-[#F5F5F7] pb-28 font-sans transition-colors">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-[#1C1C1E] border-b border-gray-200/80 dark:border-gray-800 sticky top-16 z-30 shadow-sm backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('eats')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                activeTab === 'eats'
                  ? 'bg-[#FCE000] text-[#121214] shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-[#26262A] text-gray-600 dark:text-gray-300'
              }`}
            >
              <Utensils size={15} /> UzGo Taomlar (Termiz)
            </button>

            <button
              onClick={() => setActiveTab('courier')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                activeTab === 'courier'
                  ? 'bg-[#FCE000] text-[#121214] shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-[#26262A] text-gray-600 dark:text-gray-300'
              }`}
            >
              <Package size={15} /> Kuryer (Termiz)
            </button>
          </div>

          {activeTab === 'eats' && totalCartItems > 0 && (
            <button
              onClick={() => setShowCartDrawer(true)}
              className="bg-[#121214] dark:bg-white text-[#FCE000] dark:text-[#121214] px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-md apple-card-press"
            >
              <ShoppingBag size={15} />
              <span>{totalCartItems} ta • {totalCartPrice.toLocaleString()} so'm</span>
            </button>
          )}

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 pt-5 space-y-6">

        {activeTab === 'eats' && (
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Termiz restorani yoki taom qidiring (Tandir, Osh, Lavash)..."
                  className="w-full bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white pl-10 pr-4 py-2.5 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-[#FCE000]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-black text-gray-500">
                <MapPin size={15} className="text-[#FC3F1D]" />
                <span>Yetkazish manzili: <strong>Termiz Markaz, At-Termiziy 14</strong></span>
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#121214] text-[#FCE000] dark:bg-white dark:text-[#121214] shadow-sm'
                      : 'bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {orderStatus && (
              <div className="bg-[#121214] text-white p-4 rounded-3xl shadow-xl flex items-center justify-between border border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FCE000] text-[#121214] flex items-center justify-center text-xl font-black animate-pulse">
                    🛵
                  </div>
                  <div>
                    <h4 className="font-black text-sm">
                      {orderStatus === 'placed' ? 'Oshpaz taomingizni tayyorlamoqda' : 'Kuryer Termiz bo\'ylab yo\'lda! Yetib kelishiga ~15 daqiqa'}
                    </h4>
                    <span className="text-xs text-gray-400">
                      Jami: {totalCartPrice.toLocaleString()} so'm • To'lov: UzGo Pay (+3% keshbek)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setOrderStatus(null)}
                  className="text-xs text-[#FCE000] font-black underline"
                >
                  Yopish
                </button>
              </div>
            )}

            {/* Restaurants Grid */}
            <div className="space-y-6">
              {RESTAURANTS.map((rest) => (
                <div 
                  key={rest.id}
                  className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{rest.logo}</div>
                      <div>
                        <h3 className="font-black text-lg text-[#121214] dark:text-white flex items-center gap-2">
                          {rest.name}
                          <span className="bg-[#FCE000] text-[#121214] text-[10px] font-black px-2 py-0.5 rounded-md">
                            {rest.badge}
                          </span>
                        </h3>
                        <p className="text-xs text-gray-500 font-semibold">{rest.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold text-gray-600 dark:text-gray-300">
                      <span className="flex items-center text-amber-500 font-black">
                        <Star size={14} className="fill-amber-500 mr-1" /> {rest.rating}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {rest.deliveryTime}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-500 font-black">{rest.deliveryFee}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {rest.menu.map((dish) => {
                      const countInCart = cart[dish.id]?.count || 0;
                      return (
                        <div
                          key={dish.id}
                          className="bg-gray-50 dark:bg-[#26262A] border border-gray-200/70 dark:border-gray-700/70 rounded-2xl p-3 flex flex-col justify-between transition-all"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-32 object-cover rounded-xl mb-2.5"
                          />
                          <div>
                            <h5 className="font-black text-xs text-[#121214] dark:text-white leading-tight">
                              {dish.name}
                            </h5>
                            <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                              {dish.desc}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
                            <span className="font-black text-xs text-[#121214] dark:text-white">
                              {dish.price.toLocaleString()} so'm
                            </span>

                            {countInCart > 0 ? (
                              <div className="flex items-center gap-2 bg-[#FCE000] text-[#121214] rounded-xl px-2 py-1 shadow-sm">
                                <button
                                  onClick={() => removeFromCart(dish.id)}
                                  className="font-black text-xs"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="text-xs font-black">{countInCart}</span>
                                <button
                                  onClick={() => addToCart(dish, rest)}
                                  className="font-black text-xs"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(dish, rest)}
                                className="bg-[#121214] dark:bg-white text-[#FCE000] dark:text-[#121214] px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm apple-card-press"
                              >
                                <Plus size={13} /> Qo'shish
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* Courier Mode */}
        {activeTab === 'courier' && (
          <div className="max-w-xl mx-auto bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-black text-xl text-[#121214] dark:text-white flex items-center gap-2">
                <Package size={22} className="text-[#FCE000]" /> Termiz Bo'ylab Tezkor Kuryer
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Hujjat, kalit, kiyim yoki posilkalarni 25 daqiqada yetkazib beramiz.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1">
                  1. Jo'natuvchi manzili (Termiz)
                </label>
                <div className="flex items-center bg-gray-50 dark:bg-[#26262A] p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <MapPin size={16} className="text-[#2563EB] mr-2" />
                  <input
                    type="text"
                    value={courierFrom}
                    onChange={(e) => setCourierFrom(e.target.value)}
                    placeholder="Qayerdan olinadi..."
                    className="w-full bg-transparent text-xs font-bold text-[#121214] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1">
                  2. Qabul qiluvchi manzili (Termiz)
                </label>
                <div className="flex items-center bg-gray-50 dark:bg-[#26262A] p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <MapPin size={16} className="text-[#FC3F1D] mr-2" />
                  <input
                    type="text"
                    value={courierTo}
                    onChange={(e) => setCourierTo(e.target.value)}
                    placeholder="Qayerga yetkaziladi..."
                    className="w-full bg-transparent text-xs font-bold text-[#121214] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1">
                  3. Qabul qiluvchi telefon raqami
                </label>
                <div className="flex items-center bg-gray-50 dark:bg-[#26262A] p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <Phone size={16} className="text-[#10B981] mr-2" />
                  <input
                    type="tel"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    placeholder="+998 91 123 45 67"
                    className="w-full bg-transparent text-xs font-bold text-[#121214] dark:text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-2">
                Posilka hajmi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', label: 'Kichik (Konvert)', price: '9,000 so\'m', icon: '✉️' },
                  { id: 'medium', label: 'O\'rta (Paket)', price: '14,000 so\'m', icon: '📦' },
                  { id: 'large', label: 'Katta (Quti)', price: '22,000 so\'m', icon: '🧳' },
                ].map((size) => (
                  <div
                    key={size.id}
                    onClick={() => setPackageSize(size.id)}
                    className={`p-3 rounded-2xl border cursor-pointer text-center apple-card-press transition-all ${
                      packageSize === size.id
                        ? 'bg-[#FCE000] border-black/20 text-[#121214] shadow-md font-black'
                        : 'bg-gray-50 dark:bg-[#26262A] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xl">{size.icon}</span>
                    <span className="text-xs block mt-1">{size.label}</span>
                    <span className="text-[10px] font-black block mt-0.5 text-gray-500 dark:text-gray-400">
                      {size.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert(`Kuryer chaqirildi! Qabul qiluvchi: ${receiverPhone}`)}
              disabled={!courierTo}
              className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                courierTo
                  ? 'bg-[#FCE000] text-[#121214] hover:bg-[#E5CB00] apple-card-press shadow-[0_10px_25px_rgba(252,224,0,0.3)]'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Bike size={18} /> Kuryer chaqirish (25 min)
            </button>

          </div>
        )}

      </div>

      {/* Cart Slide-Over */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-end">
          <div className="w-full sm:max-w-md h-[90vh] sm:h-full bg-white dark:bg-[#1C1C1E] rounded-t-3xl sm:rounded-l-3xl p-5 flex flex-col justify-between shadow-2xl space-y-4">
            
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="font-black text-base text-[#121214] dark:text-white flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#FCE000]" /> Sizning savatchangiz
                </h3>
                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[50vh] overflow-y-auto mt-2">
                {Object.values(cart).map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-xs text-[#121214] dark:text-white">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-bold">
                        {item.price.toLocaleString()} so'm
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#26262A] rounded-xl px-2 py-1">
                      <button onClick={() => removeFromCart(item.id)} className="font-black text-xs">
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-black">{item.count}</span>
                      <button onClick={() => addToCart(item, { name: item.restaurant })} className="font-black text-xs">
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3">
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>Yetkazib berish (25 daqiqa)</span>
                <span className="text-emerald-500 font-black">Bepul</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#121214] dark:text-white">
                <span>Jami to'lov:</span>
                <span>{totalCartPrice.toLocaleString()} so'm</span>
              </div>

              <button
                onClick={handlePlaceFoodOrder}
                className="w-full bg-[#FCE000] hover:bg-[#E5CB00] text-[#121214] py-4 rounded-2xl font-black text-sm shadow-lg apple-card-press flex items-center justify-center gap-2"
              >
                <span>Buyurtmani rasmiylashtirish</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
