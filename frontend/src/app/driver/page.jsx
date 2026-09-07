'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Car, Navigation, Phone, DollarSign, Check, X, Shield, MapPin, 
  BellRing, Compass, Layers, User, Star, Zap, Flame, Award, 
  ArrowRight, Clock, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const YandexMap = dynamic(() => import('../../components/YandexMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-[#121214] flex items-center justify-center text-white text-xs font-bold gap-2">
      <div className="w-8 h-8 rounded-xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black animate-pulse">
        Pro
      </div>
      <span>Yandex Pro Termiz yuklanmoqda...</span>
    </div>
  ),
});

const MOCK_INCOMING_ORDERS = [
  {
    id: 'ORD-701',
    tariff: 'Comfort',
    client: 'Jamshidbek (Termiz)',
    clientRating: 4.95,
    price: 18000,
    surgeBonus: '+3,000 so\'m',
    from: 'Termiz Markaz (Al-Hakim at-Termiziy xiyoboni)',
    to: 'TerDU Campus (Barkamol avlod ko\'chasi)',
    distanceToClient: '0.9 km (2 daqiqa)',
    tripDistance: '3.4 km (7 daqiqa)',
    fromCoords: { lat: 37.2242, lng: 67.2783 },
    toCoords: { lat: 37.2210, lng: 67.2710 },
  },
  {
    id: 'ORD-702',
    tariff: 'Start',
    client: 'Dilnoza Karimova',
    clientRating: 4.90,
    price: 14000,
    surgeBonus: '+2,000 so\'m',
    from: 'San\'at Saroyi',
    to: 'Surxon Sohil (Amudaryo bo\'yi)',
    distanceToClient: '0.6 km (1 daqiqa)',
    tripDistance: '2.8 km (5 daqiqa)',
    fromCoords: { lat: 37.2300, lng: 67.2850 },
    toCoords: { lat: 37.2180, lng: 67.2820 },
  },
];

export default function DriverModePage() {
  const { t } = useLanguage();

  const [isOnline, setIsOnline] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(245000);
  const [completedRides, setCompletedRides] = useState(11);
  const [driverActivity, setDriverActivity] = useState(99);

  const [activeOrder, setActiveOrder] = useState(null);
  const [incomingOrder, setIncomingOrder] = useState(MOCK_INCOMING_ORDERS[0]);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    let timer;
    if (isOnline && incomingOrder && !activeOrder) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIncomingOrder(null);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOnline, incomingOrder, activeOrder]);

  const handleAcceptOrder = () => {
    setActiveOrder({ ...incomingOrder, stage: 'to_client' });
    setIncomingOrder(null);
  };

  const handleDeclineOrder = () => {
    setIncomingOrder(null);
    setDriverActivity((prev) => Math.max(80, prev - 2));
  };

  const handleNextStage = () => {
    if (!activeOrder) return;
    if (activeOrder.stage === 'to_client') {
      setActiveOrder({ ...activeOrder, stage: 'arrived' });
    } else if (activeOrder.stage === 'arrived') {
      setActiveOrder({ ...activeOrder, stage: 'in_trip' });
    } else if (activeOrder.stage === 'in_trip') {
      setTodayEarnings((prev) => prev + activeOrder.price);
      setCompletedRides((prev) => prev + 1);
      setActiveOrder({ ...activeOrder, stage: 'completed' });
    } else if (activeOrder.stage === 'completed') {
      setActiveOrder(null);
      setTimeout(() => {
        setIncomingOrder(MOCK_INCOMING_ORDERS[1]);
        setCountdown(15);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-[#121214] text-[#121214] dark:text-[#F5F5F7] pb-28 font-sans transition-colors">
      
      {/* Top Pro Header Bar */}
      <div className="bg-white dark:bg-[#1C1C1E] border-b border-gray-200/80 dark:border-gray-800 p-4 sticky top-16 z-30 shadow-sm backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-14 h-8 rounded-full transition-all relative flex items-center p-1 cursor-pointer apple-card-press ${
                isOnline ? 'bg-[#10B981]' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                isOnline ? 'translate-x-6 shadow-md' : 'translate-x-0'
              }`} />
            </button>
            <div>
              <div className="text-sm font-black text-[#121214] dark:text-white flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-[#10B981] animate-pulse' : 'bg-gray-400'}`}></span>
                {isOnline ? 'Liniyada (Termiz Onlayn)' : 'Band (Oflayn)'}
              </div>
              <span className="text-xs text-gray-500 font-bold">
                Haydovchi: Otabek Tursunov (75 A 777 AA)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#26262A] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-2xl">
            <div>
              <span className="text-[10px] text-gray-400 font-black uppercase block">Bugungi daromad</span>
              <span className="text-sm font-black text-[#121214] dark:text-white">
                {todayEarnings.toLocaleString()} so'm
              </span>
            </div>
            <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700"></div>
            <div>
              <span className="text-[10px] text-gray-400 font-black uppercase block">Safarlar</span>
              <span className="text-sm font-black text-[#10B981]">
                {completedRides} ta
              </span>
            </div>
            <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700"></div>
            <div>
              <span className="text-[10px] text-gray-400 font-black uppercase block">Faollik</span>
              <span className="text-sm font-black text-[#FCE000]">
                {driverActivity} ball
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-6xl mx-auto px-4 pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`w-full p-3 rounded-2xl border text-xs font-black flex items-center justify-between shadow-sm transition-all ${
              showHeatmap 
                ? 'bg-[#FC3F1D]/15 text-[#FC3F1D] border-[#FC3F1D]/40' 
                : 'bg-white dark:bg-[#1C1C1E] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-[#FC3F1D] fill-[#FC3F1D]" />
              <span>Termiz talab zonalari (Surge Heatmap)</span>
            </div>
            <span className="text-[10px] font-black">{showHeatmap ? 'Yoqilgan' : 'O\'chirilgan'}</span>
          </button>

          {/* ACTIVE RIDE HUD PANEL */}
          {activeOrder && (
            <div className="bg-white dark:bg-[#1C1C1E] border-2 border-[#FCE000] rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                  <span className="bg-[#FCE000] text-[#121214] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {activeOrder.tariff} • Faol Safar
                  </span>
                  <h4 className="font-black text-sm text-[#121214] dark:text-white mt-1">
                    Mijoz: {activeOrder.client} (⭐ {activeOrder.clientRating})
                  </h4>
                </div>
                <a
                  href="tel:+998911234567"
                  className="w-10 h-10 rounded-2xl bg-[#10B981] text-white flex items-center justify-center shadow-md apple-card-press"
                >
                  <Phone size={18} />
                </a>
              </div>

              <div className="bg-[#121214] text-white p-3.5 rounded-2xl flex items-center gap-3">
                <Navigation size={22} className="text-[#FCE000] shrink-0" />
                <div className="text-xs">
                  <span className="text-[#FCE000] font-black block">100 metrdan keyin o'ngga buriling</span>
                  <span className="text-gray-400">
                    {activeOrder.stage === 'to_client' ? activeOrder.from : activeOrder.to}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-semibold">
                <div className="text-gray-600 dark:text-gray-300 truncate">
                  🟢 <b>Qayerdan:</b> {activeOrder.from}
                </div>
                <div className="text-gray-600 dark:text-gray-300 truncate">
                  🔴 <b>Qayerga:</b> {activeOrder.to}
                </div>
              </div>

              <div className="flex justify-between items-center bg-gray-100 dark:bg-[#26262A] p-3 rounded-2xl">
                <span className="text-xs font-bold text-gray-500">Kafolatlangan daromad:</span>
                <span className="text-base font-black text-[#121214] dark:text-white">
                  {activeOrder.price.toLocaleString()} so'm
                </span>
              </div>

              <button
                onClick={handleNextStage}
                className="w-full bg-[#FCE000] hover:bg-[#E5CB00] text-[#121214] py-4 rounded-2xl font-black text-sm shadow-md apple-card-press flex items-center justify-center gap-2"
              >
                {activeOrder.stage === 'to_client' && 'Mijoz oldiga yetib keldim'}
                {activeOrder.stage === 'arrived' && 'Safarni boshlash'}
                {activeOrder.stage === 'in_trip' && 'Safarni yakunlash (Kassa)'}
                {activeOrder.stage === 'completed' && 'Keyingi buyurtmaga o\'tish ✓'}
              </button>
            </div>
          )}

          {/* INCOMING ORDER MODAL (15s RADAR) */}
          {!activeOrder && isOnline && incomingOrder && (
            <div className="bg-white dark:bg-[#1C1C1E] border-2 border-[#FC3F1D] rounded-3xl p-5 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FC3F1D] text-white flex items-center justify-center font-black animate-pulse">
                    🔥
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#121214] dark:text-white">
                      Termiz: Yangi Buyurtma ({incomingOrder.tariff})
                    </h4>
                    <span className="text-[10px] text-[#FC3F1D] font-black">
                      {incomingOrder.surgeBonus} talab bonusi
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-[#FC3F1D] flex items-center justify-center font-black text-sm border-2 border-[#FC3F1D]">
                  {countdown}s
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-[#26262A] p-3.5 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block">Sizgacha masofa</span>
                  <span className="text-xs font-black text-[#121214] dark:text-white">
                    {incomingOrder.distanceToClient}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-bold block">Tushum</span>
                  <span className="text-lg font-black text-[#10B981]">
                    {incomingOrder.price.toLocaleString()} so'm
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1 bg-gray-50 dark:bg-[#26262A]/60 p-3 rounded-2xl border border-gray-200/80 dark:border-gray-700/80">
                <div className="truncate">🟢 {incomingOrder.from}</div>
                <div className="truncate">🔴 {incomingOrder.to}</div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleDeclineOrder}
                  className="flex-1 bg-gray-100 dark:bg-[#26262A] text-gray-600 dark:text-gray-300 py-3 rounded-2xl text-xs font-black hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  O'tkazish
                </button>
                <button
                  onClick={handleAcceptOrder}
                  className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-2xl text-xs font-black shadow-lg apple-card-press flex items-center justify-center gap-1"
                >
                  Qabul qilish ✓
                </button>
              </div>

            </div>
          )}

          {!isOnline && (
            <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto">
                <Clock size={24} />
              </div>
              <h4 className="font-black text-sm text-[#121214] dark:text-white">
                Siz hozir dam olishdasiz
              </h4>
              <p className="text-xs text-gray-500">
                Termiz buyurtmalarini qabul qilish uchun yuqoridagi tugmani "Onlayn" holatiga o'tkazing.
              </p>
            </div>
          )}

        </div>

        {/* Right Side: Termiz Map (7 cols) */}
        <div className="md:col-span-7 h-[460px] md:h-[620px] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-sm relative">
          <YandexMap
            center={[37.2242, 67.2783]}
            pickupCoords={activeOrder ? activeOrder.fromCoords : incomingOrder?.fromCoords}
            destCoords={activeOrder ? activeOrder.toCoords : incomingOrder?.toCoords}
            showHeatmap={showHeatmap}
          />
        </div>

      </div>

    </div>
  );
}
