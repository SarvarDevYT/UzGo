'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { 
  Car, ShoppingBag, Package, ChevronRight, MapPin, 
  Gift, Share2, Sparkles, Flame, ShieldCheck, ArrowUpRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || { user: null });
  const { t } = useLanguage();
  const userName = user?.name || "Sarvarbek";

  const termizDestinations = [
    { title: "Termiz Markaz", icon: "🏙️", subtitle: "Al-Hakim at-Tirmiziy ko'chasi" },
    { title: "Indorama MFY", icon: "🏭", subtitle: "Sanoat hududi" },
    { title: "Surxon Sohil", icon: "🌊", subtitle: "Amudaryo bo'yi" },
    { title: "TerDU Campus", icon: "🎓", subtitle: "Termiz Davlat Universiteti" },
  ];

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-24 overflow-x-hidden">
      
      {/* Hero Header with Glow and Official Logo */}
      <div className="relative pt-6 pb-12 px-4 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-[#181A20] via-[#12141A] to-[#0F1015] border-b border-[#2C303E]">
        <div className="absolute top-[-20%] left-[-10%] w-80 h-80 bg-[#16C2B2] rounded-full filter blur-[130px] opacity-25"></div>
        <div className="absolute top-[10%] right-[-10%] w-80 h-80 bg-[#FF5B4C] rounded-full filter blur-[130px] opacity-20"></div>
        
        <div className="max-w-lg mx-auto relative z-10">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="UzGo Official Logo" 
                className="w-10 h-10 object-contain rounded-xl shadow-lg shadow-[#16C2B2]/20" 
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg text-white tracking-wide">
                    Uz<span className="text-[#16C2B2]">Go</span>
                  </span>
                  <span className="bg-[#16C2B2] text-[#0F1015] text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                    Super App
                  </span>
                </div>
                <span className="text-[10px] text-[#16C2B2] font-extrabold block">📍 Termiz shahar tarmog'i</span>
              </div>
            </div>
            
            <Link 
              href="/profile" 
              className="w-10 h-10 rounded-full bg-[#181A20] border border-[#2C303E] flex items-center justify-center overflow-hidden hover:border-[#16C2B2] transition-colors shadow-lg"
            >
              <span className="font-extrabold text-sm text-[#16C2B2]">{userName.charAt(0).toUpperCase()}</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
            {t('welcome')} 👋, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C2B2] via-[#F2A93B] to-[#FF5B4C]">{userName}!</span>
          </h1>
          <p className="text-[#8B8D98] font-medium text-xs sm:text-sm">{t('tagline')}</p>

          {/* Quick Search bar */}
          <div 
            onClick={() => router.push('/taxi')}
            className="mt-5 flex items-center bg-[#181A20]/90 backdrop-blur-xl border border-[#2C303E] hover:border-[#16C2B2]/60 rounded-2xl p-3.5 cursor-pointer shadow-2xl transition-all group"
          >
            <MapPin className="text-[#16C2B2] mr-3 group-hover:scale-110 transition-transform" size={22} />
            <span className="text-[#8B8D98] font-medium text-sm flex-1">{t('whereTo')}</span>
            <span className="bg-[#FF5B4C] text-white px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-lg shadow-[#FF5B4C]/25">
              {t('taxi')} <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Main Core Super-App Section */}
      <div className="max-w-lg mx-auto px-4 -mt-5 relative z-20 space-y-4">
        
        {/* Cashback Banner */}
        <div className="rounded-2xl p-4 bg-gradient-to-r from-[#0D3833] via-[#181A20] to-[#181A20] border border-[#16C2B2]/40 flex justify-between items-center shadow-2xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#16C2B2]/10 to-transparent pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#16C2B2] uppercase tracking-wide">
              <Sparkles size={14} /> {t('cashback')}
            </div>
            <div className="text-xs text-gray-300 font-semibold mt-0.5">Termiz shahri bo'ylab har xaridda qaytadi</div>
          </div>
          <div className="text-2xl font-black text-[#16C2B2] bg-[#16C2B2]/10 border border-[#16C2B2]/30 px-3 py-1 rounded-xl shadow-inner">
            +10%
          </div>
        </div>

        {/* Super-App 2x2 Bento Box Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* 🚕 TAXI MODULE (Coral Red) */}
          <div 
            onClick={() => router.push('/taxi')}
            className="group relative rounded-3xl p-4 bg-[#181A20] border border-[#2C303E] hover:border-[#FF5B4C] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-40 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5B4C]/10 rounded-full filter blur-xl group-hover:bg-[#FF5B4C]/20 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5B4C] flex items-center justify-center text-white text-2xl shadow-lg shadow-[#FF5B4C]/30">
                🚕
              </div>
              <span className="text-[9px] font-black bg-[#FF5B4C]/20 text-[#FF5B4C] border border-[#FF5B4C]/40 px-2 py-0.5 rounded-full uppercase">
                Tezkor Taksi
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-white group-hover:text-[#FF5B4C] transition-colors">UzGo Taksi</h2>
                <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#FF5B4C] transition-colors" />
              </div>
              <p className="text-[11px] text-[#8B8D98] font-medium leading-tight mt-0.5">Termiz bo'ylab 3 daqiqada</p>
            </div>
          </div>

          {/* 🛍️ MARKET MODULE (Gold Amber) */}
          <div 
            onClick={() => router.push('/market')}
            className="group relative rounded-3xl p-4 bg-[#181A20] border border-[#2C303E] hover:border-[#F2A93B] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-40 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2A93B]/10 rounded-full filter blur-xl group-hover:bg-[#F2A93B]/20 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#F2A93B] flex items-center justify-center text-[#0F1015] text-2xl shadow-lg shadow-[#F2A93B]/30 font-black">
                🛍️
              </div>
              <span className="text-[9px] font-black bg-[#F2A93B]/20 text-[#F2A93B] border border-[#F2A93B]/40 px-2 py-0.5 rounded-full uppercase">
                Top Mahsulot
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-white group-hover:text-[#F2A93B] transition-colors">UzGo Market</h2>
                <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#F2A93B] transition-colors" />
              </div>
              <p className="text-[11px] text-[#8B8D98] font-medium leading-tight mt-0.5">Elektronika & Kiyimlar</p>
            </div>
          </div>

          {/* 🛵 DELIVERY MODULE (Emerald Green) */}
          <div 
            onClick={() => router.push('/delivery')}
            className="group relative rounded-3xl p-4 bg-[#181A20] border border-[#2C303E] hover:border-[#22C55E] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-40 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#22C55E]/10 rounded-full filter blur-xl group-hover:bg-[#22C55E]/20 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#22C55E] flex items-center justify-center text-white text-2xl shadow-lg shadow-[#22C55E]/30">
                🍔
              </div>
              <span className="text-[9px] font-black bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 px-2 py-0.5 rounded-full uppercase">
                Fast Food
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-white group-hover:text-[#22C55E] transition-colors">UzGo Delivery</h2>
                <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#22C55E] transition-colors" />
              </div>
              <p className="text-[11px] text-[#8B8D98] font-medium leading-tight mt-0.5">Termiz milliy taomlari</p>
            </div>
          </div>

          {/* 📦 UZGO POCHTA MODULE (Turquoise) */}
          <div 
            onClick={() => router.push('/delivery')}
            className="group relative rounded-3xl p-4 bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between h-40 overflow-hidden hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#16C2B2]/10 rounded-full filter blur-xl group-hover:bg-[#16C2B2]/20 transition-colors"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#16C2B2] flex items-center justify-center text-[#0F1015] text-2xl shadow-lg shadow-[#16C2B2]/30 font-black">
                📦
              </div>
              <span className="text-[9px] font-black bg-[#16C2B2]/20 text-[#16C2B2] border border-[#16C2B2]/40 px-2 py-0.5 rounded-full uppercase">
                Yangi
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-white group-hover:text-[#16C2B2] transition-colors">UzGo Pochta</h2>
                <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#16C2B2] transition-colors" />
              </div>
              <p className="text-[11px] text-[#8B8D98] font-medium leading-tight mt-0.5">Hujjat va posilka yetkazish</p>
            </div>
          </div>

        </div>

        {/* Referral & Promo Banner */}
        <div className="bg-gradient-to-r from-[#181A20] via-[#22252E] to-[#181A20] border border-[#2C303E] rounded-3xl p-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F2A93B]/15 border border-[#F2A93B]/40 flex items-center justify-center text-[#F2A93B] shrink-0">
              <Gift size={22} />
            </div>
            <div>
              <div className="text-xs font-black text-white">Do'stingizni taklif qiling</div>
              <div className="text-[11px] text-[#F2A93B] font-bold">15,000 so'm promo-kod oling</div>
            </div>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard?.writeText("TERMIZ2026");
              alert("Promo-kod nusxalandi: TERMIZ2026 🎁. Do'stlaringizga yuboring!");
            }}
            className="bg-[#16C2B2] text-[#0F1015] px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#16C2B2]/20 hover:scale-105 transition-transform"
          >
            <Share2 size={14} /> Ulashish
          </button>
        </div>

      </div>

      {/* Termiz Destinations Section */}
      <div className="max-w-lg mx-auto px-4 mt-7">
        <h3 className="text-sm font-black mb-3 text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#16C2B2]" />
          Termiz shahri mashhur maskanlari
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {termizDestinations.map((dest, i) => (
            <div 
              key={i} 
              onClick={() => router.push('/taxi')}
              className="bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2]/60 p-3.5 rounded-2xl cursor-pointer transition-all hover:bg-[#22252E] flex items-center gap-3 shadow-lg"
            >
              <span className="text-2xl">{dest.icon}</span>
              <div className="overflow-hidden">
                <div className="font-extrabold text-xs text-white truncate">{dest.title}</div>
                <div className="text-[10px] text-[#8B8D98] truncate">{dest.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
