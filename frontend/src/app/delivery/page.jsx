'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Star, Clock, Bike } from 'lucide-react';
import api from '../../services/api';

const categories = [
  { id: 'all', name: 'Barchasi', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'burger', name: 'Burger', icon: '🍔' },
  { id: 'pharmacy', name: 'Dorixona', icon: '💊' },
];

export default function DeliveryPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setLoading(true);
    api.get('/delivery/stores/')
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        setStores(list);
      })
      .catch(() => {
        setStores([
          { id: 1, name: 'Toshkent Pizza', category: 'pizza', category_icon: '🍕', rating: 4.8, delivery_time: '25-40 daqiqa', delivery_fee: 5000, is_open: true, image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
          { id: 2, name: 'Burger House', category: 'burger', category_icon: '🍔', rating: 4.7, delivery_time: '20-35 daqiqa', delivery_fee: 4000, is_open: true, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredStores = activeCategory === 'all' 
    ? stores 
    : stores.filter(store => store.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0F1015] text-[#111827] dark:text-[#F5F5F7] pb-28 font-sans transition-colors">
      <main className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Header & Search */}
        <div className="bg-white dark:bg-[#181A20] rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-200/80 dark:border-gray-800 space-y-4">
          <div>
            <h1 className="text-xl font-black text-[#0F1015] dark:text-white tracking-tight flex items-center gap-2">
              <Bike className="w-6 h-6 text-[#F59E0B]" /> UzGo Delivery
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Termiz bo‘ylab issiq taomlar va tezkor kuryer</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Restoran yoki taom qidirish..."
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 text-[#0F1015] dark:text-white pl-11 pr-4 py-3 rounded-2xl text-xs font-semibold focus:outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 apple-card-press ${
                  activeCategory === cat.id
                    ? 'bg-[#0F1015] dark:bg-white text-[#F59E0B] dark:text-[#0F1015] shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stores Grid */}
        <div className="space-y-3">
          <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">Restoranlar va Magazinlar</h2>

          {loading ? (
            <div className="text-center py-12 text-gray-400 text-xs font-bold animate-pulse">Yuklanmoqda...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStores.map((store) => (
                <Link
                  key={store.id}
                  href={`/delivery/${store.id}`}
                  className="bg-white dark:bg-[#181A20] border border-gray-200/80 dark:border-gray-800 hover:border-[#F59E0B] rounded-3xl p-4 shadow-[0_8px_25px_rgba(0,0,0,0.03)] flex gap-4 transition-all duration-300 apple-card-press group"
                >
                  <img
                    src={store.image_url || '/logo.jpg'}
                    alt={store.name}
                    className="w-24 h-24 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => { e.target.src = '/logo.jpg'; }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-sm text-[#0F1015] dark:text-white group-hover:text-[#F59E0B] transition-colors">{store.name}</h3>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          {store.is_open ? 'Ochilgan' : 'Yopilgan'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5">{store.category_name || 'Taomlar'}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400 pt-2">
                      <span className="flex items-center gap-1 text-[#F59E0B]">
                        <Star size={13} className="fill-[#F59E0B]" /> {store.rating || '4.8'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {store.delivery_time || '25 min'}
                      </span>
                      <span className="text-[#0F1015] dark:text-white font-black">
                        {store.delivery_fee ? `${store.delivery_fee.toLocaleString()} so'm` : 'Bepul'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
