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
    <div className="min-h-screen bg-[#FAFAFC] text-[#111827] pb-28">
      {/* Hero Banner */}
      <div className="bg-white p-6 border-b border-gray-100 mb-6 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black mb-1 text-[#0F1015]">UzGo Delivery</h1>
          <p className="text-xs text-gray-500 font-medium mb-4">Restoran va taomlar uyingizga tez yetkaziladi!</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Restoran yoki taomlarni qidirish..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-10 pr-4 text-[#0F1015] placeholder-gray-400 focus:outline-none focus:border-[#F59E0B] text-sm font-medium"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
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
                  ? 'bg-[#0F1015] text-[#F59E0B] shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:text-black'
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
              className="block bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-[#F59E0B] shadow-[0_8px_25px_rgba(0,0,0,0.03)] transition-all apple-card-press group"
            >
              <div className="relative h-44 bg-gray-50">
                <img src={store.image_url} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2.5 py-1 rounded-xl text-xs font-bold shadow-sm">
                  Ochiq
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-extrabold text-lg text-[#0F1015]">{store.name} {store.category_icon}</h3>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-xl text-xs font-black text-[#D97706]">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{store.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>{store.delivery_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-emerald-500" />
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

