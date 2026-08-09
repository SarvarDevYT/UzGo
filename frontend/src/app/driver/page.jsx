'use client';

import React, { useState } from 'react';
import { Car, Navigation, Phone, DollarSign, Check, X, Shield, MapPin, BellRing, Compass, Layers } from 'lucide-react';
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
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0F1015] text-[#F5F5F7] overflow-hidden relative">
      {/* Real Yandex Map Background */}
      <div className="absolute inset-0 z-0">
        <YandexMap 
          fromAddress={activeOrder ? activeOrder.from : 'Termiz Markaz'} 
          toAddress={activeOrder ? activeOrder.to : 'TerDU Campus'} 
        />
      </div>

      {/* Top Status Bar & Earnings Header */}
      <div className="relative z-10 p-4 max-w-lg mx-auto w-full">
        <div className="bg-[#181A20]/90 backdrop-blur-xl border border-[#2C303E] rounded-3xl p-4 shadow-2xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                isOnline ? 'bg-[#22C55E]' : 'bg-[#2C303E]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                isOnline ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
            <div>
              <div className="text-xs font-black text-white">{isOnline ? '● Navbatchilikda (Onlayn)' : '○ Dam olishda'}</div>
              <div className="text-[10px] text-gray-400">Haydovchi: Otabek Tursunov (75 A 777 AA)</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-400 font-bold">Bugungi Ish:</div>
            <div className="text-base font-black text-[#16C2B2]">{todayEarnings.toLocaleString('ru-RU')} so'm ({completedRides} ta)</div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet for Active Order or Incoming Radar */}
      <div className="flex-1 overflow-y-auto p-4 z-10 flex flex-col justify-end max-w-lg mx-auto w-full">
        {activeOrder ? (
          /* Active Ride Panel */
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 shadow-2xl space-y-4 animate-slide-up">
            <div className="flex justify-between items-center border-b border-[#2C303E] pb-3">
              <div>
                <span className="text-[10px] bg-[#FF5B4C]/20 text-[#FF5B4C] px-2.5 py-0.5 rounded-full font-black uppercase">
                  {activeOrder.tariff || 'Taksi'} Safar jarayonda
                </span>
                <h3 className="text-sm font-extrabold text-white mt-1">Mijoz: {activeOrder.client}</h3>
              </div>
              <a href="tel:+998912345678" className="bg-[#16C2B2] text-[#0F1015] p-3 rounded-2xl font-bold flex items-center gap-1 text-xs">
                <Phone size={16} /> Qo'ng'iroq
              </a>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300 font-medium">
                <MapPin size={16} className="text-[#22C55E] shrink-0" />
                <span className="truncate"><b>Qayerdan:</b> {activeOrder.from}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 font-medium">
                <Navigation size={16} className="text-[#FF5B4C] shrink-0" />
                <span className="truncate"><b>Qayerga:</b> {activeOrder.to}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-[#0F1015] p-3 rounded-2xl border border-[#2C303E]">
              <span className="text-xs text-gray-400 font-bold">Safardan narx:</span>
              <span className="text-lg font-black text-[#16C2B2]">{activeOrder.price.toLocaleString('ru-RU')} so'm</span>
            </div>

            <button 
              onClick={handleCompleteOrder}
              className="w-full py-4 rounded-2xl bg-[#22C55E] text-white font-black text-sm shadow-xl shadow-[#22C55E]/20 flex items-center justify-center gap-2"
            >
              <Check size={18} /> Safarni Muvaffaqiyatli Yakunlash
            </button>
          </div>
        ) : (
          /* Incoming Radar List */
          <div className="space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5 bg-[#0F1015]/80 backdrop-blur p-2 rounded-xl border border-[#2C303E]">
              <BellRing className="text-[#FF5B4C] animate-bounce" size={16} />
              Termiz bo'yicha kiruvchi buyurtmalar ({incomingOrders.length} ta)
            </h3>

            {incomingOrders.map((ord) => (
              <div key={ord.id} className="bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] rounded-3xl p-4 shadow-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ord.type === 'taxi' ? '🚕' : '📦'}</span>
                    <div>
                      <div className="font-extrabold text-sm text-white">{ord.tariff || ord.store}</div>
                      <div className="text-[10px] text-gray-400">Masofa: {ord.distance} • Mijoz: {ord.client}</div>
                    </div>
                  </div>
                  <div className="text-base font-black text-[#16C2B2]">{ord.price.toLocaleString('ru-RU')} so'm</div>
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                  <div>🟢 {ord.from}</div>
                  <div>🔴 {ord.to}</div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => setIncomingOrders(prev => prev.filter(o => o.id !== ord.id))}
                    className="flex-1 bg-[#0F1015] border border-[#2C303E] text-gray-400 font-bold py-2.5 rounded-xl text-xs"
                  >
                    Rad etish
                  </button>
                  <button 
                    onClick={() => handleAcceptOrder(ord)}
                    className="flex-1 bg-[#16C2B2] text-[#0F1015] font-black py-2.5 rounded-xl text-xs shadow-lg shadow-[#16C2B2]/20"
                  >
                    Qabul qilish ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
