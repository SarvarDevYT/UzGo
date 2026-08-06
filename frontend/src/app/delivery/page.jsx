'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Star, Clock, Bike } from 'lucide-react';
import api from '../../services/api';

const mockStores = [
  { id: 'st1', name: 'Toshkent Pizza', category: 'pizza', category_icon: '🍕', rating: 4.8, delivery_time: '25-40 daqiqa', delivery_fee: 5000, is_open: true, image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 'st2', name: 'Sushi Master', category: 'sushi', category_icon: '🍣', rating: 4.7, delivery_time: '30-50 daqiqa', delivery_fee: 7000, is_open: true, image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400' },
  { id: 'st3', name: 'Burger House', category: 'burger', category_icon: '🍔', rating: 4.6, delivery_time: '20-35 daqiqa', delivery_fee: 4000, is_open: true, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'st4', name: 'Osh Markazi', category: 'uzbek', category_icon: '🍲', rating: 4.9, delivery_time: '35-55 daqiqa', delivery_fee: 3000, is_open: true, image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
  { id: 'st5', name: 'Anhor Dorixonasi', category: 'pharmacy', category_icon: '💊', rating: 4.5, delivery_time: '15-30 daqiqa', delivery_fee: 2000, is_open: true, image_url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400' },
  { id: 'st6', name: 'Fresh Market', category: 'grocery', category_icon: '🛒', rating: 4.4, delivery_time: '20-40 daqiqa', delivery_fee: 5000, is_open: false, image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
];

const categories = [
  { id: 'all', name: 'Barchasi', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'burger', name: 'Burger', icon: '🍔' },
  { id: 'uzbek', name: 'O\'zbek', icon: '🍲' },
  { id: 'pharmacy', name: 'Dorixona', icon: '💊' },
  { id: 'grocery', name: 'Supermarket', icon: '🛒' },
];

export default function DeliveryPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/delivery/stores');
        const storeList = Array.isArray(response) ? response 
          : response.stores || response.data || mockStores;
        setStores(storeList);
      } catch {
        setStores(mockStores);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = activeCategory === 'all' 
    ? stores 
    : stores.filter(store => store.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text pb-20">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] p-6 text-white rounded-b-2xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold mb-2">Tez yetkazib berish</h1>
        <p className="text-sm opacity-90 mb-4">Sevimli taomlaringiz va kerakli narsalar bir zumda eshigingizda!</p>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Qidirish..." 
            className="w-full bg-white/20 border border-white/30 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 text-white/70 w-5 h-5" />
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-4 mb-6 overflow-x-auto hide-scrollbar">
        <div className="flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-[#ffc107] text-dark-bg font-medium' 
                  : 'bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border/50'
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
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-dark-card rounded-xl overflow-hidden animate-pulse">
              <div className="h-40 bg-dark-border/50"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-dark-border/50 rounded w-2/3"></div>
                <div className="h-4 bg-dark-border/50 rounded w-1/2"></div>
                <div className="h-4 bg-dark-border/50 rounded w-full"></div>
              </div>
            </div>
          ))
        ) : (
          filteredStores.map((store) => (
            <Link 
              key={store.id} 
              href={`/delivery/${store.id}`}
              className={`block bg-dark-card rounded-xl overflow-hidden border border-dark-border shadow-sm hover:border-[#1a237e] transition-colors ${!store.is_open ? 'opacity-60 grayscale' : ''}`}
            >
              <div className="relative h-40">
                <img src={store.image_url} alt={store.name} className="w-full h-full object-cover" />
                {!store.is_open && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full font-medium text-sm">Yopiq</span>
                  </div>
                )}
                {store.is_open && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                    Ochiq
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{store.name} {store.category_icon}</h3>
                  <div className="flex items-center gap-1 bg-dark-bg px-1.5 py-0.5 rounded text-sm">
                    <Star className="w-4 h-4 text-[#ffc107] fill-[#ffc107]" />
                    <span className="font-medium">{store.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-dark-muted mt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{store.delivery_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bike className="w-4 h-4" />
                    <span>{store.delivery_fee.toLocaleString('uz-UZ')} so'm</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
        
        {!loading && filteredStores.length === 0 && (
          <div className="col-span-full py-10 text-center text-dark-muted">
            <p>Bu kategoriyada do'konlar topilmadi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
