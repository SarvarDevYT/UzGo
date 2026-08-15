'use client';

import React, { useState } from 'react';
import { Car, Navigation, Phone, DollarSign, Check, X, Shield, MapPin, BellRing, Compass, Layers, User } from 'lucide-react';
import YandexMap from '../../components/YandexMap';

const MOCK_INCOMING_ORDERS = [
  { id: 'ORD-771', type: 'taxi', tariff: 'Ekonom', price: 12000, from: 'Termiz Markaz (Al-Hakim at-Tirmiziy)', to: 'TerDU Campus', distance: '3.2 km', client: 'Jamshidbek' },
  { id: 'ORD-772', type: 'delivery', store: 'Termiz Fast Food', price: 18000, from: 'Navoiy ko\'chasi, 12', to: 'Indorama MFY', distance: '4.8 km', client: 'Dilnoza' },
];

export default function DriverModePage() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [incomingOrders, setIncomingOrders] = useState(MOCK_INCOMING_ORDERS);
  const [todayEarnings, setTodayEarnings] = useState(145000);
  const [completedRides, setCompletedRides] = useState(8);

  const handleAcceptOrder = (order) => {
    setActiveOrder({ ...order, status: 'accepted' });
    setIncomingOrders(prev => prev.filter(o => o.id !== order.id));
  };

  const handleCompleteOrder = () => {
    if (!activeOrder) return;
    setTodayEarnings(prev => prev + activeOrder.price);
    setCompletedRides(prev => prev + 1);
    setActiveOrder(null);
    alert("Safar muvaffaqiyatli yakunlandi! 💰 Balansingizga " + activeOrder.price.toLocaleString('ru-RU') + " so'm qo'shildi.");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0F1015] text-[#111827] dark:text-[#F5F5F7] pb-28 font-sans transition-colors">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-[#181A20] border-b border-gray-100 dark:border-gray-800 p-4 shadow-sm">
        <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer apple-card-press ${
                isOnline ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                isOnline ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
            <div>
              <div className="text-sm font-black text-[#0F1015] dark:text-white">{isOnline ? '● Navbatchilikda (Onlayn)' : '○ Dam olishda'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Haydovchi: Otabek Tursunov (75 A 777 AA)</div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 px-4 py-2 rounded-2xl">
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">Bugungi Ish:</div>
              <div className="text-sm font-black text-[#0F1015] dark:text-white">{todayEarnings.toLocaleString('ru-RU')} so'm <span className="text-xs text-emerald-600 font-extrabold">({completedRides} ta safar)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Container (Desktop 2-column / Mobile 1-column) */}
      <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Orders / Control Side Panel (5 cols on Desktop) */}
        <div className="md:col-span-5 space-y-4">
          {activeOrder ? (
            /* Active Ride Panel */
            <div className="bg-white dark:bg-[#181A20] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4 animate-slide-up">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                  <span className="text-[10px] bg-amber-500/10 text-[#D97706] border border-amber-500/20 px-2.5 py-0.5 rounded-full font-black uppercase">
                    {activeOrder.tariff || 'Taksi'} Safar jarayonda
                  </span>
                  <h3 className="text-sm font-black text-[#0F1015] dark:text-white mt-1">Mijoz: {activeOrder.client}</h3>
                </div>
                <a href="tel:+998912345678" className="bg-[#0F1015] dark:bg-[#F59E0B] text-[#F59E0B] dark:text-[#0F1015] p-2.5 rounded-2xl font-black flex items-center gap-1 text-xs shadow-sm apple-card-press">
                  <Phone size={15} /> Qo'ng'iroq
                </a>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                  <MapPin size={16} className="text-emerald-500 shrink-0" />
                  <span className="truncate"><b>Qayerdan:</b> {activeOrder.from}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                  <Navigation size={16} className="text-[#F59E0B] shrink-0" />
                  <span className="truncate"><b>Qayerga:</b> {activeOrder.to}</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Safardan narx:</span>
                <span className="text-lg font-black text-[#0F1015] dark:text-white">{activeOrder.price.toLocaleString('ru-RU')} so'm</span>
              </div>

              <button 
                onClick={handleCompleteOrder}
                className="w-full py-4 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 apple-card-press"
              >
                <Check size={18} /> Safarni Muvaffaqiyatli Yakunlash
              </button>
            </div>
          ) : (
            /* Incoming Radar List */
            <div className="space-y-3">
              <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5 bg-white dark:bg-[#181A20] p-3 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm">
                <BellRing className="text-[#F59E0B] animate-bounce" size={16} />
                Termiz bo'yicha kiruvchi buyurtmalar ({incomingOrders.length} ta)
              </h3>

              {incomingOrders.map((ord) => (
                <div key={ord.id} className="bg-white dark:bg-[#181A20] border border-gray-200/80 dark:border-gray-800 hover:border-[#F59E0B] rounded-3xl p-4 shadow-[0_8px_25px_rgba(0,0,0,0.03)] space-y-3 apple-card-press">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{ord.type === 'taxi' ? '🚕' : '📦'}</span>
                      <div>
                        <div className="font-black text-sm text-[#0F1015] dark:text-white">{ord.tariff || ord.store}</div>
                        <div className="text-[10px] text-gray-400 font-semibold">Masofa: {ord.distance} • Mijoz: {ord.client}</div>
                      </div>
                    </div>
                    <div className="text-base font-black text-[#0F1015] dark:text-white">{ord.price.toLocaleString('ru-RU')} so'm</div>
                  </div>

                  <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 font-medium bg-gray-50 dark:bg-gray-800/80 p-2.5 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="truncate">🟢 <b>Dan:</b> {ord.from}</div>
                    <div className="truncate">🔴 <b>Ga:</b> {ord.to}</div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => setIncomingOrders(prev => prev.filter(o => o.id !== ord.id))}
                      className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold py-2.5 rounded-2xl text-xs hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Rad etish
                    </button>
                    <button 
                      onClick={() => handleAcceptOrder(ord)}
                      className="flex-1 bg-[#0F1015] dark:bg-[#F59E0B] text-[#F59E0B] dark:text-[#0F1015] font-black py-2.5 rounded-2xl text-xs shadow-md hover:bg-[#1C1E26]"
                    >
                      Qabul qilish ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Map Panel (7 cols on Desktop) */}
        <div className="md:col-span-7 h-[420px] md:h-[600px] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
          <YandexMap 
            fromAddress={activeOrder ? activeOrder.from : 'Termiz Markaz'} 
            toAddress={activeOrder ? activeOrder.to : 'TerDU Campus'} 
          />
        </div>

      </div>
    </div>
  );

}

