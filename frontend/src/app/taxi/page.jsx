'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  MapPin, Navigation, Search, Loader2, Phone, Star, X, Check, Car, 
  Compass, Calendar, Share2, MessageSquare, Send, ShieldCheck, Wallet, 
  CreditCard, Banknote, Sparkles, ChevronRight, ArrowLeft, Clock, Info
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const YandexMap = dynamic(() => import('../../components/YandexMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[100dvh] bg-[#F6F7F9] dark:bg-[#121214] flex flex-col items-center justify-center text-[#121214] dark:text-white gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black text-2xl animate-bounce">
        Go
      </div>
      <span className="font-extrabold text-sm tracking-wide">UzGo Taksi Termiz yuklanmoqda...</span>
    </div>
  ),
});

const TERMIZ_DISTRICTS = [
  'Termiz Markaz (Al-Hakim at-Termiziy)', 
  'Indorama MFY (Sanoat zonasi)', 
  'Surxon Sohil MFY (Amudaryo bo\'yi)', 
  'San\'at Saroyi va Teatr tumani', 
  'Do\'stlik MFY (Navoiy ko\'chasi)', 
  'Chegara MFY (Manguzar Post Tomonda)', 
  'Termiz Avtovokzal (Shimoliy darvoza)', 
  'Termiz Xalqaro Aeroporti (TMJ)', 
  'TerDU Campus (Termiz Davlat Univ)'
];

const TARIFFS = [
  { id: 'start', name: 'Start', price: 8000, duration: '~2 min', car: 'Chevrolet Cobalt, Nexia 3', icon: '🚕', desc: 'Termiz bo\'ylab har kungi qulay safarlar' },
  { id: 'comfort', name: 'Comfort', price: 12000, duration: '~3 min', car: 'Chevrolet Gentra, Cobalt New', icon: '🚖', desc: 'Konditsionerli va yumshoq yurish' },
  { id: 'comfort_plus', name: 'Comfort+', price: 18000, duration: '~4 min', car: 'Chevrolet Onix, Tracker 2', icon: '⚡', desc: 'Keng salon va yangi xorijiy avtomobillar' },
  { id: 'business', name: 'Business', price: 28000, duration: '~5 min', car: 'BYD Song Plus, Monza', icon: '👑', desc: 'Yuqori darajadagi servis' },
  { id: 'delivery', name: 'Yetkazib berish', price: 9000, duration: '~4 min', car: 'Kuryer (Piyoda/Avto)', icon: '📦', desc: 'Posilka va hujjatlarni eshikkacha yetkazish' },
  { id: 'cargo', name: 'Yuk tashish', price: 40000, duration: '~8 min', car: 'Labo / Damas / Porter', icon: '🚛', desc: 'Mebel va katta yuklarni tashish' },
];

const MOCK_DRIVER = {
  name: 'Otabek Tursunov (Termiz)',
  carModel: 'Oq Chevrolet Cobalt',
  plateNumber: '75 A 777 AA',
  rating: 4.97,
  phone: '+998 91 123 45 67',
  photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
};

export default function TaxiPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const [from, setFrom] = useState('Termiz Markaz (Al-Hakim at-Termiziy)');
  const [to, setTo] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('start');
  const [status, setStatus] = useState('idle'); // idle | searching | found
  const [showChatModal, setShowChatModal] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'driver', text: 'Assalomu alaykum! Men Termiz markazidan siz tomonga yo\'l oldim, 2 daqiqada yetib boraman.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const activeTariffObj = TARIFFS.find(t => t.id === selectedTariff) || TARIFFS[0];

  const handleSearch = () => {
    if (!to) return;
    setStatus('searching');
    setTimeout(() => {
      setStatus('found');
    }, 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'driver', text: 'Tushundim, manzilga yetib keldim!' }]);
    }, 1500);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#F6F7F9] dark:bg-[#121214] font-sans">
      
      {/* 1. Leaflet Interactive Map for Termiz */}
      <div className="absolute inset-0 z-0">
        <YandexMap
          center={[37.2242, 67.2783]}
          pickupCoords={{ lat: 37.2242, lng: 67.2783 }}
          destCoords={to ? { lat: 37.2210, lng: 67.2710 } : null}
          assignedDriver={status === 'found' ? MOCK_DRIVER : null}
          activeTariff={selectedTariff}
        />
      </div>

      {/* 2. Top Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => router.push('/')}
          className="pointer-events-auto bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800 rounded-2xl p-2.5 text-[#121214] dark:text-white shadow-md apple-card-press flex items-center gap-1 text-xs font-black"
        >
          <ArrowLeft size={16} /> Bosh sahifa
        </button>

        <div className="pointer-events-auto bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800 rounded-2xl px-3 py-1.5 shadow-md flex items-center gap-1.5">
          <MapPin size={14} className="text-[#FC3F1D]" />
          <span className="text-xs font-black text-[#121214] dark:text-white">Surxondaryo, Termiz</span>
        </div>
      </div>

      {/* 3. Bottom Sheet Booking */}
      <div className="absolute bottom-0 left-0 right-0 z-30 max-w-xl mx-auto px-3 pb-20 md:pb-6 pointer-events-none">
        <div className="pointer-events-auto bg-white dark:bg-[#1C1C1E] border border-gray-200/90 dark:border-gray-800 rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] space-y-4">
          
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto"></div>

          {status === 'idle' && (
            <div className="space-y-3.5">
              
              {/* Address inputs */}
              <div className="space-y-2 bg-gray-50 dark:bg-[#26262A] p-3 rounded-2xl border border-gray-200/80 dark:border-gray-700/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Qayerdan (Termiz)..."
                    className="w-full bg-transparent text-xs font-bold text-[#121214] dark:text-white outline-none"
                  />
                </div>
                <div className="h-[1px] bg-gray-200 dark:bg-gray-700 ml-5"></div>
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#FC3F1D]"></div>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Qayerga boramiz? (Masalan: TerDU Campus)"
                    className="w-full bg-transparent text-xs font-bold text-[#121214] dark:text-white outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Tariffs List */}
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  Mavjud tariflar (Termiz)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {TARIFFS.slice(0, 6).map((tariff) => {
                    const isSelected = selectedTariff === tariff.id;
                    return (
                      <div
                        key={tariff.id}
                        onClick={() => setSelectedTariff(tariff.id)}
                        className={`p-2.5 rounded-2xl border cursor-pointer transition-all apple-card-press text-center flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FCE000] border-black/20 text-[#121214] shadow-md scale-[1.03]'
                            : 'bg-gray-50 dark:bg-[#26262A] border-gray-200/70 dark:border-gray-700/70 text-[#121214] dark:text-white'
                        }`}
                      >
                        <span className="text-xl">{tariff.icon}</span>
                        <div className="mt-1">
                          <span className="font-black text-xs block leading-tight">{tariff.name}</span>
                          <span className="text-[10px] font-black block mt-0.5">{tariff.price.toLocaleString()} so'm</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleSearch}
                disabled={!to}
                className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  to 
                    ? 'bg-[#FCE000] hover:bg-[#E5CB00] text-[#121214] apple-card-press shadow-[0_10px_25px_rgba(252,224,0,0.3)]' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{activeTariffObj.name} chaqirish (Termiz)</span>
                <span className="bg-[#121214] text-[#FCE000] px-2 py-0.5 rounded-lg text-xs font-black">
                  {activeTariffObj.price.toLocaleString()} so'm
                </span>
              </button>

            </div>
          )}

          {status === 'searching' && (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FCE000] text-[#121214] flex items-center justify-center text-3xl mx-auto shadow-lg animate-pulse">
                🚕
              </div>
              <h3 className="font-black text-base text-[#121214] dark:text-white">
                Termizda haydovchi izlanmoqda...
              </h3>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs font-bold text-[#FC3F1D] hover:underline"
              >
                Qidiruvni bekor qilish
              </button>
            </div>
          )}

          {status === 'found' && (
            <div className="space-y-4">
              <div className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 p-2.5 rounded-2xl text-center text-xs font-black flex items-center justify-center gap-2">
                <Check size={16} /> Haydovchi topildi! 2 daqiqada yetib keladi.
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={MOCK_DRIVER.photo}
                    alt={MOCK_DRIVER.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-[#FCE000]"
                  />
                  <div>
                    <h4 className="font-black text-sm text-[#121214] dark:text-white flex items-center gap-1">
                      {MOCK_DRIVER.name}
                      <span className="text-xs text-amber-500 font-black flex items-center">
                        <Star size={12} className="fill-amber-500 ml-0.5" /> {MOCK_DRIVER.rating}
                      </span>
                    </h4>
                    <span className="text-xs text-gray-500 font-medium block">
                      {MOCK_DRIVER.carModel}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#26262A] border-2 border-[#121214] dark:border-white rounded-xl px-2.5 py-1 text-center">
                  <span className="font-black text-xs text-[#121214] dark:text-white">
                    {MOCK_DRIVER.plateNumber}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowChatModal(true)}
                  className="bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white p-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 apple-card-press"
                >
                  <MessageSquare size={16} className="text-[#2563EB]" /> Haydovchiga xabar
                </button>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-red-500/10 text-[#FC3F1D] p-3 rounded-2xl text-xs font-black flex items-center justify-center gap-1 apple-card-press"
                >
                  <X size={16} /> Bekor qilish
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* In-App Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[420px]">
            <div className="p-4 bg-gray-50 dark:bg-[#121214] border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <img src={MOCK_DRIVER.photo} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="font-black text-xs text-[#121214] dark:text-white">{MOCK_DRIVER.name}</h4>
                  <span className="text-[10px] text-emerald-500 font-bold">● Liniyada (Termiz)</span>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-gray-400 hover:text-black dark:hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-2.5">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[78%] p-3 rounded-2xl text-xs font-semibold ${
                    m.sender === 'user' 
                      ? 'bg-[#FCE000] text-[#121214] rounded-br-none' 
                      : 'bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-gray-50 dark:bg-[#121214] border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Xabar yozing..."
                className="flex-1 bg-white dark:bg-[#26262A] text-[#121214] dark:text-white text-xs px-3.5 py-2.5 rounded-xl outline-none border border-gray-200 dark:border-gray-700 focus:border-[#FCE000]"
              />
              <button type="submit" className="bg-[#FCE000] text-[#121214] p-2.5 rounded-xl font-bold">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
