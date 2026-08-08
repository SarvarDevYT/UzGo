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
    <div className="min-h-screen bg-[#0F1015] text-[#F3F4F6] pb-24">
      {/* Yandex Eats Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900/60 via-[#181A20] to-[#0F1015] p-6 rounded-b-3xl border-b border-[#2C303E] mb-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black mb-1 text-white">UzGo Delivery</h1>
          <p className="text-xs text-emerald-300 font-medium mb-4">Restoran va taomlar uyingizga tez yetkaziladi!</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Restoran yoki taomlarni qidirish..." 
              className="w-full bg-[#181A20] border border-[#2C303E] rounded-2xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFCC00] text-sm"
            />
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-4 max-w-4xl mx-auto mb-6 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeCategory === cat.id 
                  ? 'bg-[#FFCC00] text-[#0F1015] shadow-lg shadow-[#FFCC00]/20' 
                  : 'bg-[#181A20] border border-[#2C303E] text-gray-400 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stores Grid */}
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400 text-sm font-medium">Do'konlar yuklanmoqda...</div>
        ) : (
          filteredStores.map((store) => (
            <Link 
              key={store.id} 
              href={`/delivery/${store.id}`}
              className="block bg-[#181A20] rounded-3xl overflow-hidden border border-[#2C303E] hover:border-[#FFCC00]/50 shadow-xl transition-all group"
            >
              <div className="relative h-44">
                <img src={store.image_url} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2.5 py-1 rounded-xl text-xs font-bold shadow-lg">
                  Ochiq
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-extrabold text-lg text-white">{store.name} {store.category_icon}</h3>
                  <div className="flex items-center gap-1 bg-[#0F1015] px-2 py-1 rounded-xl border border-[#2C303E] text-xs font-bold text-[#FFCC00]">
                    <Star className="w-3.5 h-3.5 fill-[#FFCC00]" />
                    <span>{store.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FFCC00]" />
                    <span>{store.delivery_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{store.delivery_fee.toLocaleString('uz-UZ')} so'm</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
