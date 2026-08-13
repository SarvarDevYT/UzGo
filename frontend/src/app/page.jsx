'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { 
  Car, ShoppingBag, Package, ChevronRight, MapPin, 
  Gift, Share2, Sparkles, Flame, ShieldCheck, ArrowUpRight, Search, Navigation, Globe, Home, Briefcase, GraduationCap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import YandexMap from '../components/YandexMap';

export default function HomePage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || { user: null });
  const { t, language, changeLanguage } = useLanguage();
  const userName = user?.name || "Sarvarbek";
  const [selectedAddress, setSelectedAddress] = useState("Termiz Markaz, Al-Hakim at-Tirmiziy");
  const [showAddressPicker, setShowAddressPicker] = useState(false);

  const termizDestinations = [
    { title: "Termiz Markaz", icon: <MapPin className="text-[#FF5B4C]" size={18} />, subtitle: "Al-Hakim at-Tirmiziy k." },
    { title: "TerDU Campus", icon: <GraduationCap className="text-[#16C2B2]" size={18} />, subtitle: "Termiz Davlat Univ." },
    { title: "Indorama MFY", icon: <Briefcase className="text-[#F2A93B]" size={18} />, subtitle: "Sanoat va ish hududi" },
    { title: "Surxon Sohil", icon: <Home className="text-[#22C55E]" size={18} />, subtitle: "Amudaryo bo'yi dam olish" },
  ];

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-24 overflow-x-hidden relative font-sans">
      
      {/* Background Yandex Map Canvas */}
      <div className="absolute top-0 left-0 right-0 h-[340px] z-0 opacity-40 mask-gradient">
        <YandexMap 
          fromAddress={selectedAddress} 
          toAddress="TerDU Campus"
          onSelectLocation={(addr) => setSelectedAddress(addr)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1015]/40 via-transparent to-[#0F1015] pointer-events-none"></div>
      </div>

      {/* Top Floating Glass Bar */}
      <div className="relative z-20 pt-4 px-4 max-w-lg mx-auto">
        <div className="bg-[#181A20]/80 backdrop-blur-xl border border-[#2C303E] rounded-2xl p-2.5 flex items-center justify-between shadow-2xl">
          
          {/* Brand & Address selector */}
          <div className="flex items-center gap-2.5">
            <img 
              src="/icon.png" 
              alt="UzGo" 
              className="w-9 h-9 object-contain rounded-xl bg-[#16C2B2]/10 p-1 border border-[#16C2B2]/30 shadow-md"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-black text-base text-white tracking-tight">
                  Uz<span className="text-[#16C2B2]">Go</span>
                </span>
                <span className="bg-[#FF5B4C] text-white text-[8px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider">
                  Termiz 75
                </span>
              </div>
              <div 
                onClick={() => setShowAddressPicker(!showAddressPicker)}
                className="flex items-center gap-1 text-[11px] text-[#16C2B2] font-semibold cursor-pointer hover:underline"
              >
                <Navigation size={10} className="fill-[#16C2B2]" />
                <span className="truncate max-w-[140px] sm:max-w-[180px]">{selectedAddress}</span>
              </div>
            </div>
          </div>

          {/* Controls: Language & Profile */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => changeLanguage && changeLanguage(language === 'uz' ? 'ru' : 'uz')}
              className="bg-[#222530] text-gray-300 border border-[#2C303E] px-2.5 py-1 rounded-xl text-[11px] font-extrabold flex items-center gap-1 hover:border-[#16C2B2] transition-colors"
            >
              <Globe size={12} className="text-[#16C2B2]" />
              {language === 'uz' ? 'UZ 🇺🇿' : 'RU 🇷🇺'}
            </button>

            <Link 
              href="/profile" 
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#16C2B2] to-[#0D7A70] flex items-center justify-center font-black text-sm text-[#0F1015] shadow-lg shadow-[#16C2B2]/20 hover:scale-105 transition-transform"
            >
              {userName.charAt(0).toUpperCase()}
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-lg mx-auto px-4 mt-20 relative z-20 space-y-4">
        
        {/* Yandex Go Style 2x2 Bento Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          
          {/* 🚕 TAXI CARD (Coral Red) */}
          <div 
            onClick={() => router.push('/taxi')}
            className="group relative rounded-3xl p-4 bg-[#181A20]/90 backdrop-blur-xl border border-[#2C303E] hover:border-[#FF5B4C] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-44 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF5B4C]/15 rounded-full filter blur-2xl group-hover:bg-[#FF5B4C]/30 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5B4C] to-[#C93325] flex items-center justify-center text-white text-2xl shadow-lg shadow-[#FF5B4C]/30 transform group-hover:rotate-6 transition-transform">
                🚕
              </div>
              <span className="text-[9px] font-black bg-[#FF5B4C]/20 text-[#FF5B4C] border border-[#FF5B4C]/40 px-2 py-0.5 rounded-full uppercase tracking-wide">
                3 daqiqa
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white group-hover:text-[#FF5B4C] transition-colors">Taksi</h2>
                <ArrowUpRight size={18} className="text-gray-500 group-hover:text-[#FF5B4C] transition-colors" />
              </div>
              <p className="text-[11px] text-[#9CA3AF] font-medium mt-0.5">Termiz & viloyat bo'ylab</p>
              <div className="mt-2 text-xs font-extrabold text-[#FF5B4C] flex items-center gap-1">
                <span>12,000 so'm</span> <span className="text-[10px] text-gray-400 font-normal">boshlang'ich</span>
              </div>
            </div>
          </div>

          {/* 🛵 MOTOTAKSI CARD (Coral Orange) */}
          <div 
            onClick={() => router.push('/taxi')}
            className="group relative rounded-3xl p-4 bg-[#181A20]/90 backdrop-blur-xl border border-[#2C303E] hover:border-[#FF7A45] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-44 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF7A45]/15 rounded-full filter blur-2xl group-hover:bg-[#FF7A45]/30 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7A45] to-[#D94E1A] flex items-center justify-center text-white text-2xl shadow-lg shadow-[#FF7A45]/30 transform group-hover:-rotate-6 transition-transform">
                🛵
              </div>
              <span className="text-[9px] font-black bg-[#FF7A45]/20 text-[#FF7A45] border border-[#FF7A45]/40 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Tezkor
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white group-hover:text-[#FF7A45] transition-colors">Mototaksi</h2>
                <ArrowUpRight size={18} className="text-gray-500 group-hover:text-[#FF7A45] transition-colors" />
              </div>
              <p className="text-[11px] text-[#9CA3AF] font-medium mt-0.5">Tiqilinchsiz harakat</p>
              <div className="mt-2 text-xs font-extrabold text-[#FF7A45] flex items-center gap-1">
                <span>8,000 so'm</span> <span className="text-[10px] text-gray-400 font-normal">boshlang'ich</span>
              </div>
            </div>
          </div>

          {/* 🍕 DELIVERY / TAOMLAR CARD (Emerald Green) */}
          <div 
            onClick={() => router.push('/delivery')}
            className="group relative rounded-3xl p-4 bg-[#181A20]/90 backdrop-blur-xl border border-[#2C303E] hover:border-[#22C55E] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-44 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#22C55E]/15 rounded-full filter blur-2xl group-hover:bg-[#22C55E]/30 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#15803D] flex items-center justify-center text-white text-2xl shadow-lg shadow-[#22C55E]/30 transform group-hover:scale-110 transition-transform">
                🥟
              </div>
              <span className="text-[9px] font-black bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Somsa & FastFood
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white group-hover:text-[#22C55E] transition-colors">Delivery</h2>
                <ArrowUpRight size={18} className="text-gray-500 group-hover:text-[#22C55E] transition-colors" />
              </div>
              <p className="text-[11px] text-[#9CA3AF] font-medium mt-0.5">Termiz oshxonalaridan</p>
              <div className="mt-2 text-xs font-extrabold text-[#22C55E] flex items-center gap-1">
                <span>15-25 min</span> <span className="text-[10px] text-gray-400 font-normal">yetkazish</span>
              </div>
            </div>
          </div>

          {/* 📦 UZGO POCHTA CARD (Turquoise) */}
          <div 
            onClick={() => router.push('/delivery')}
            className="group relative rounded-3xl p-4 bg-[#181A20]/90 backdrop-blur-xl border border-[#2C303E] hover:border-[#16C2B2] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-44 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#16C2B2]/15 rounded-full filter blur-2xl group-hover:bg-[#16C2B2]/30 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#16C2B2] to-[#0D7A70] flex items-center justify-center text-[#0F1015] text-2xl shadow-lg shadow-[#16C2B2]/30 font-black transform group-hover:rotate-12 transition-transform">
                📦
              </div>
              <span className="text-[9px] font-black bg-[#16C2B2]/20 text-[#16C2B2] border border-[#16C2B2]/40 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Posilka
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white group-hover:text-[#16C2B2] transition-colors">UzGo Pochta</h2>
                <ArrowUpRight size={18} className="text-gray-500 group-hover:text-[#16C2B2] transition-colors" />
              </div>
              <p className="text-[11px] text-[#9CA3AF] font-medium mt-0.5">Hujjat va kuryerlik</p>
              <div className="mt-2 text-xs font-extrabold text-[#16C2B2] flex items-center gap-1">
                <span>Eshikgacha</span> <span className="text-[10px] text-gray-400 font-normal">xavfsiz</span>
              </div>
            </div>
          </div>

        </div>

        {/* Yandex Go Draggable Bottom Sheet Card */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-4 shadow-2xl relative overflow-hidden">
          
          {/* Drag Handle indicator */}
          <div className="w-10 h-1 bg-[#2C303E] rounded-full mx-auto mb-4"></div>

          {/* Search Input Bar */}
          <div 
            onClick={() => router.push('/taxi')}
            className="flex items-center bg-[#222530] border border-[#2C303E] hover:border-[#FF5B4C] rounded-2xl px-4 py-3.5 cursor-pointer transition-all shadow-inner group"
          >
            <Search className="text-[#FF5B4C] mr-3 group-hover:scale-110 transition-transform" size={20} />
            <span className="text-gray-400 font-medium text-sm flex-1">Qayerga boramiz? (Masalan: TerDU)</span>
            <div className="bg-[#FF5B4C] text-white px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-lg shadow-[#FF5B4C]/30">
              Taksi <ChevronRight size={14} />
            </div>
          </div>

          {/* Saved Destinations list */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {termizDestinations.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setSelectedAddress(item.title);
                  router.push('/taxi');
                }}
                className="bg-[#14161E] border border-[#2C303E]/80 hover:border-[#16C2B2]/60 p-3 rounded-2xl cursor-pointer transition-all hover:bg-[#1E212B] flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#222530] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="overflow-hidden">
                  <div className="font-extrabold text-xs text-white truncate">{item.title}</div>
                  <div className="text-[10px] text-gray-400 truncate">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Promo & Referral Banner */}
        <div className="bg-gradient-to-r from-[#0D3833] via-[#181A20] to-[#181A20] border border-[#16C2B2]/40 rounded-3xl p-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#16C2B2]/15 border border-[#16C2B2]/40 flex items-center justify-center text-[#16C2B2] shrink-0">
              <Gift size={22} />
            </div>
            <div>
              <div className="text-xs font-black text-white">Do'stni taklif qiling</div>
              <div className="text-[11px] text-[#16C2B2] font-bold">15,000 so'm promo-kod oling</div>
            </div>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard?.writeText("TERMIZ2026");
              alert("Promo-kod nusxalandi: TERMIZ2026 🎁");
            }}
            className="bg-[#16C2B2] text-[#0F1015] px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#16C2B2]/20 hover:scale-105 transition-transform"
          >
            <Share2 size={14} /> Ulashish
          </button>
        </div>

      </div>
    </div>
  );
}
