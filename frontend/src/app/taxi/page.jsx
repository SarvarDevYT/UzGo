'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Search, Loader2, Phone, Star, X, Check, Car, Compass } from 'lucide-react';
import { getCurrentAddress } from '../../utils/geolocation';
import { supabase } from '../../services/supabaseClient';

const TASHKENT_DISTRICTS = [
  'Chilonzor 8-kvartal', 'Yunusobod 12-kvartal', 'Mirzo Ulugbek (M.Gorkiy)', 
  'Sergeli 4-bekat', 'Shayxontohur (Samarqand Darvoza)', 'Olmazor (Tinchlik)', 
  'Bektemir (Qo\'yliq)', 'Uchtepa (Lutfiy)', 'Tashkent City (Magic City)'
];

const TARIFFS = [
  { id: 'economy', name: 'Ekonom', price: 12000, duration: '~3 min', car: 'Chevrolet Cobalt', icon: '🚗' },
  { id: 'comfort', name: 'Komfort', price: 18000, duration: '~4 min', car: 'Chevrolet Monza', icon: '🚙' },
  { id: 'comfort_plus', name: 'Komfort+', price: 25000, duration: '~5 min', car: 'BYD Song Plus', icon: '🏎️' },
  { id: 'business', name: 'Business', price: 40000, duration: '~7 min', car: 'Kia K5 / Malibu', icon: '👑' },
];

const MOCK_DRIVER = {
  name: 'Rustamjon Turg\'unov',
  carModel: 'Chevrolet Cobalt (Oq metallik)',
  plateNumber: '01 A 777 AA',
  rating: 4.9,
  phone: '+998901234567',
  photo: 'R'
};

export default function TaxiPage() {
  const [from, setFrom] = useState('Chilonzor 8-kvartal');
  const [to, setTo] = useState('');
  const [loadingGps, setLoadingGps] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState('economy');
  const [status, setStatus] = useState('idle'); // idle | searching | found

  const activeTariffObj = TARIFFS.find(t => t.id === selectedTariff) || TARIFFS[0];

  const handleGetGps = async () => {
    setLoadingGps(true);
    try {
      const res = await getCurrentAddress();
      if (res && res.address) {
        setFrom(res.address);
      }
    } catch (err) {
      alert(err.message || 'GPS aniqlab bo\'lmadi');
    } finally {
      setLoadingGps(false);
    }
  };

  const handleSearch = async () => {
    if (!from || !to) return;
    setStatus('searching');

    try {
      await supabase.from('taxi_rides').insert([
        {
          from_address: from,
          to_address: to,
          tariff: selectedTariff,
          price: activeTariffObj.price,
          driver_name: MOCK_DRIVER.name,
          car_model: MOCK_DRIVER.carModel,
          plate_number: MOCK_DRIVER.plateNumber,
          status: 'searching'
        }
      ]);
    } catch (err) {
      console.error('Supabase write error:', err);
    }
    
    setTimeout(() => {
      setStatus('found');
    }, 2800);
  };

  const handleCancel = () => {
    setStatus('idle');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0F1015] overflow-hidden relative">
      {/* Map Background (Yandex Map Style SVG Grid) */}
      <div className="absolute inset-0 z-0 bg-[#121319] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1F2330" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {from && to && (
            <g>
              <path 
                d="M 120 180 Q 220 280 320 150 T 420 300" 
                fill="none" 
                stroke="#FF5B4C" 
                strokeWidth="5" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_12px_rgba(255,91,76,0.6)]" 
              />
              <circle cx="120" cy="180" r="8" fill="#22C55E" />
              <circle cx="420" cy="300" r="8" fill="#FF5B4C" />
            </g>
          )}

          <circle cx="180" cy="220" r="10" fill="#FF5B4C" className="animate-pulse" />
          <circle cx="280" cy="140" r="10" fill="#FF5B4C" />
        </svg>
      </div>

      {/* Taxi Bottom Sheet Container */}
      <div className="flex-1 overflow-y-auto p-4 z-10 flex flex-col justify-end max-w-lg mx-auto w-full">
        
        {status === 'idle' && (
          <div className="bg-[#181A20] rounded-3xl p-5 shadow-2xl border border-[#2C303E] backdrop-blur-xl animate-slide-up">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-white tracking-tight">UzGo Taksi</h2>
              
              <button 
                onClick={handleGetGps} 
                disabled={loadingGps}
                className="flex items-center gap-1.5 bg-[#FF5B4C]/10 text-[#FF5B4C] hover:bg-[#FF5B4C]/20 font-extrabold text-xs px-3 py-1.5 rounded-full border border-[#FF5B4C]/30 transition-all"
              >
                {loadingGps ? <Loader2 size={14} className="animate-spin" /> : <Compass size={14} />}
                <span>{loadingGps ? 'GPS Aniqlanmoqda...' : 'Mening joyim'}</span>
              </button>
            </div>
            
            {/* Address Inputs */}
            <div className="relative flex flex-col gap-2 mb-5">
              <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-[#2C303E] z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center bg-[#0F1015] rounded-2xl p-3.5 border border-[#2C303E] focus-within:border-[#22C55E] transition-colors">
                  <div className="w-3 h-3 rounded-full bg-[#22C55E] mr-3 shrink-0"></div>
                  <input 
                    type="text" 
                    placeholder="Qayerdan (Manzilingiz)" 
                    className="bg-transparent w-full outline-none text-white text-sm font-medium"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onFocus={() => setShowFromDropdown(true)}
                    onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                  />
                </div>
                {showFromDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-[#181A20] border border-[#2C303E] rounded-2xl shadow-2xl z-30 max-h-48 overflow-y-auto">
                    {TASHKENT_DISTRICTS.filter(d => d.toLowerCase().includes(from.toLowerCase())).map(district => (
                      <div 
                        key={`from-${district}`} 
                        className="p-3 border-b border-[#2C303E]/50 hover:bg-[#22252E] cursor-pointer text-white text-xs font-medium flex items-center gap-2"
                        onClick={() => { setFrom(district); setShowFromDropdown(false); }}
                      >
                        <MapPin size={14} className="text-[#22C55E]" />
                        {district}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <div className="flex items-center bg-[#0F1015] rounded-2xl p-3.5 border border-[#2C303E] focus-within:border-[#FF5B4C] transition-colors">
                  <div className="w-3 h-3 rounded-full bg-[#FF5B4C] mr-3 shrink-0"></div>
                  <input 
                    type="text" 
                    placeholder="Qayerga boramiz?" 
                    className="bg-transparent w-full outline-none text-white text-sm font-medium"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => setShowToDropdown(true)}
                    onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                  />
                </div>
                {showToDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-[#181A20] border border-[#2C303E] rounded-2xl shadow-2xl z-30 max-h-48 overflow-y-auto">
                    {TASHKENT_DISTRICTS.filter(d => d.toLowerCase().includes(to.toLowerCase())).map(district => (
                      <div 
                        key={`to-${district}`} 
                        className="p-3 border-b border-[#2C303E]/50 hover:bg-[#22252E] cursor-pointer text-white text-xs font-medium flex items-center gap-2"
                        onClick={() => { setTo(district); setShowToDropdown(false); }}
                      >
                        <Navigation size={14} className="text-[#FF5B4C]" />
                        {district}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Horizontal Tariff Selector Slider */}
            <h3 className="text-xs font-bold text-[#8B8D98] uppercase tracking-wider mb-2">Tarifni tanlang</h3>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {TARIFFS.map((t) => {
                const isSelected = selectedTariff === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTariff(t.id)}
                    className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between text-center ${
                      isSelected
                        ? 'border-[#FF5B4C] bg-[#FF5B4C]/15 shadow-[0_0_15px_rgba(255,91,76,0.3)]'
                        : 'border-[#2C303E] bg-[#0F1015] hover:border-gray-600'
                    }`}
                  >
                    <span className="text-2xl mb-1">{t.icon}</span>
                    <span className="font-extrabold text-xs text-white leading-tight">{t.name}</span>
                    <span className="text-[10px] text-[#8B8D98] mt-1">{t.duration}</span>
                    <span className="text-xs font-black text-[#FF5B4C] mt-1">{t.price.toLocaleString('ru-RU')}</span>
                  </div>
                );
              })}
            </div>

            {/* Price & Booking Button */}
            <div className="flex items-center justify-between bg-[#0F1015] p-3.5 rounded-2xl border border-[#2C303E] mb-4">
              <div className="flex items-center gap-2">
                <Car className="text-[#FF5B4C]" size={18} />
                <div>
                  <div className="text-xs font-bold text-white">{activeTariffObj.name} ({activeTariffObj.car})</div>
                  <div className="text-[10px] text-[#8B8D98]">Naqd yoki Karta orqali</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-[#FF5B4C]">{activeTariffObj.price.toLocaleString('ru-RU')} so'm</div>
              </div>
            </div>

            <button 
              className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
                from && to 
                  ? 'bg-[#FF5B4C] text-white hover:bg-[#E5493A] active:scale-[0.98] shadow-[#FF5B4C]/30' 
                  : 'bg-[#2C303E] text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleSearch}
              disabled={!from || !to}
            >
              <Search size={20} />
              {activeTariffObj.name}'ni chaqirish
            </button>
          </div>
        )}

        {status === 'searching' && (
          <div className="bg-[#181A20] rounded-3xl p-8 shadow-2xl border border-[#2C303E] flex flex-col items-center justify-center h-72 animate-slide-up">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-[#FF5B4C]/10 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-24 h-24 bg-[#FF5B4C]/20 rounded-full flex items-center justify-center relative z-10 border border-[#FF5B4C]/40">
                <Loader2 size={48} className="text-[#FF5B4C] animate-spin" />
              </div>
            </div>
            <h2 className="text-xl font-black text-white mb-1">Haydovchi izlanmoqda...</h2>
            <p className="text-gray-400 text-xs text-center max-w-xs mb-4">
              Yaqin atrofdagi {activeTariffObj.name} haydovchilariga taklif yuborildi
            </p>
            <button 
              className="text-[#FF5B4C] font-bold text-sm hover:underline"
              onClick={handleCancel}
            >
              Qidiruvni bekor qilish
            </button>
          </div>
        )}

        {status === 'found' && (
          <div className="flex flex-col gap-3 animate-slide-up">
            <div className="bg-[#22C55E]/20 text-[#22C55E] p-3.5 rounded-2xl border border-[#22C55E]/30 text-center font-bold text-sm animate-pulse flex items-center justify-center gap-2">
              <Check size={18} /> Haydovchi topildi! U siz tomonga yo'l oldi.
            </div>
            
            {/* Driver Card */}
            <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#2C303E] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16C2B2] to-[#FFE066] flex items-center justify-center text-[#0F1015] font-black text-xl shadow-lg">
                    {MOCK_DRIVER.photo}
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-base">{MOCK_DRIVER.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#F2A93B] font-bold">
                      <Star size={14} fill="currentColor" />
                      <span>{MOCK_DRIVER.rating} (500+ sayohat)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#0F1015] bg-[#F2A93B] px-2.5 py-1 rounded-xl text-sm shadow-md">
                    {MOCK_DRIVER.plateNumber}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold mt-1">{MOCK_DRIVER.carModel}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Yetib keladi:</p>
                  <p className="text-white font-black text-xl text-[#FF5B4C]">~3 daqiqada</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="bg-[#0F1015] border border-[#2C303E] text-white p-3.5 rounded-2xl hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all" 
                    onClick={handleCancel}
                  >
                    <X size={20} />
                  </button>
                  <a 
                    href={`tel:${MOCK_DRIVER.phone}`} 
                    className="bg-[#FF5B4C] text-white p-3.5 rounded-2xl hover:bg-[#E5493A] transition-all font-bold flex items-center gap-2 shadow-lg shadow-[#FF5B4C]/25"
                  >
                    <Phone size={20} /> Chaqirish
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
