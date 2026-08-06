'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, Clock, Bike, Plus } from 'lucide-react';
import api from '../../../services/api';

const mockStores = [
  { id: 'st1', name: 'Toshkent Pizza', category: 'pizza', rating: 4.8, delivery_time: '25-40 daqiqa', delivery_fee: 5000, is_open: true, image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 'st2', name: 'Sushi Master', category: 'sushi', rating: 4.7, delivery_time: '30-50 daqiqa', delivery_fee: 7000, is_open: true, image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400' },
  { id: 'st3', name: 'Burger House', category: 'burger', rating: 4.6, delivery_time: '20-35 daqiqa', delivery_fee: 4000, is_open: true, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
];

const mockMenus = {
  st1: [
    { id: 'm1', name: 'Margarita', price: 45000, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
    { id: 'm2', name: 'Pepperoni', price: 52000, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
    { id: 'm3', name: 'Fries', price: 15000, category: 'Gazaklar', image_url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=300' },
    { id: 'm4', name: 'Cola 0.5L', price: 8000, category: 'Ichimliklar', image_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300' },
  ],
  st2: [
    { id: 'm5', name: 'Philadelphia Roll', price: 65000, category: 'Sushi', image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300' }
  ]
};

export default function StoreMenuPage() {
  const params = useParams();
  const storeId = params?.storeId || 'st1';
  const router = useRouter();
  
  const [store, setStore] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localCart, setLocalCart] = useState([]); 

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const storeRes = await api.get(`/delivery/stores/${storeId}`);
        setStore(storeRes);
        const menuRes = await api.get(`/delivery/stores/${storeId}/menu`);
        setMenu(menuRes);
      } catch {
        setStore(mockStores.find(s => s.id === storeId) || mockStores[0]);
        setMenu(mockMenus[storeId] || mockMenus['st1']);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreDetails();
  }, [storeId]);

  const handleAddToCart = (item) => {
    setLocalCart((prev) => [...prev, item]);
  };

  const cartTotal = localCart.reduce((sum, item) => sum + item.price, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-dark-text flex items-center justify-center">
        Yuklanmoqda...
      </div>
    );
  }

  const groupedMenu = menu.reduce((acc, item) => {
    const cat = item.category || 'Barchasi';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text pb-24 relative">
      {/* Store Banner */}
      <div className="relative h-60">
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded-full text-white backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img src={store?.image_url} alt={store?.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">{store?.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
            <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-[#ffc107] fill-[#ffc107]" /> {store?.rating}
            </span>
            <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded">
              <Clock className="w-4 h-4" /> {store?.delivery_time}
            </span>
            <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded">
              <Bike className="w-4 h-4" /> {store?.delivery_fee?.toLocaleString('uz-UZ')} so'm
            </span>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="p-4 space-y-8 max-w-4xl mx-auto">
        {Object.entries(groupedMenu).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl font-bold mb-4 border-b border-dark-border pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-dark-card border border-dark-border rounded-xl p-3 flex gap-4">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-dark-muted text-sm mt-1">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-[#ffc107]">{item.price.toLocaleString('uz-UZ')} so'm</span>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-[#1a237e] hover:bg-[#283593] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-medium transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Qo'shish
                      </button>
                    </div>
                  </div>
                  <div className="w-24 h-24 shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart */}
      {localCart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
          <div 
            onClick={() => router.push('/delivery/checkout')}
            className="bg-[#1a237e] text-white rounded-xl p-4 flex items-center justify-between shadow-lg cursor-pointer hover:bg-[#283593] transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-xs text-white/80">{localCart.length} ta mahsulot</span>
              <span className="font-bold text-lg">{cartTotal.toLocaleString('uz-UZ')} so'm</span>
            </div>
            <div className="font-semibold flex items-center gap-2">
              Savatni ko'rish
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
