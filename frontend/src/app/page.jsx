'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Car, ShoppingBag, Package, ChevronRight, MapPin, Tag, Gift, Share2, Sparkles } from 'lucide-react';
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
      {/* Header Banner - Termiz Glow */}
      <div className="relative pt-8 pb-14 px-4 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-[#181A20] to-[#0F1015] border-b border-[#2C303E]">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#16C2B2] rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-[#FF5B4C] rounded-full filter blur-[120px] opacity-20"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#16C2B2] text-[#0F1015] text-xs font-black px-2 py-1 rounded-md uppercase tracking-wider">
                SUPER APP
              </span>
              <span className="text-[#16C2B2] text-xs font-bold bg-[#16C2B2]/10 px-2 py-0.5 rounded-full border border-[#16C2B2]/30">
                📍 Termiz, Surxondaryo
              </span>
            </div>
            
            <Link href="/profile" className="w-10 h-10 rounded-full bg-[#181A20] border border-[#2C303E] flex items-center justify-center overflow-hidden hover:border-[#16C2B2] transition-colors shadow-lg">
              <span className="font-extrabold text-sm text-[#16C2B2]">{userName.charAt(0).toUpperCase()}</span>
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            {t('welcome')} 👋, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C2B2] via-[#20E3D1] to-[#F2A93B]">{userName}!</span>
          </h1>
          <p className="text-[#8B8D98] font-medium text-sm">{t('tagline')}</p>

          {/* Search bar */}
          <div 
            onClick={() => router.push('/taxi')}
            className="mt-6 flex items-center bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2]/50 rounded-2xl p-4 cursor-pointer shadow-xl transition-all group"
          >
            <MapPin className="text-[#16C2B2] mr-3 group-hover:scale-110 transition-transform" size={22} />
            <span className="text-[#8B8D98] font-medium text-base flex-1">{t('whereTo')}</span>
            <span className="bg-[#FF5B4C] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md">
              {t('taxi')} <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Main Core Modules */}
      <div className="max-w-md mx-auto px-4 -mt-6 relative z-20 space-y-3">
        
        {/* Cashback Banner */}
        <div className="rounded-2xl p-4 bg-gradient-to-r from-[#0A2E2B] to-[#0F1015] border border-[#16C2B2]/40 flex justify-between items-center shadow-lg">
          <div>
            <div className="text-sm font-extrabold text-[#16C2B2]">{t('cashback')}</div>
            <div className="text-xs text-[#8B8D98]">Termiz shahri bo'ylab har xaridda</div>
          </div>
          <div className="text-2xl font-black text-[#16C2B2]">+10%</div>
        </div>

        {/* 🚕 TAXI & MOTOTAXI MODULE (Coral Red) */}
        <div 
          onClick={() => router.push('/taxi')}
          className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#FF5B4C]/15 via-[#181A20] to-[#181A20] border border-[#2C303E] hover:border-[#FF5B4C]/60 cursor-pointer transition-all duration-300 p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FF5B4C] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#FF5B4C]/30 text-2xl">
            🚕
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">UzGo Taksi</h2>
              <span className="text-[10px] bg-[#FF5B4C]/20 text-[#FF5B4C] px-2 py-0.5 rounded-full font-extrabold border border-[#FF5B4C]/30">
                🛵 Mototaksi bor!
              </span>
            </div>
            <p className="text-xs text-[#8B8D98] font-medium">Termiz ko'chalarida 3-5 daqiqada</p>
          </div>
          <span className="text-[#8B8D98] text-xl font-bold group-hover:translate-x-1 transition-transform">›</span>
        </div>

        {/* 🛍️ MARKET MODULE (Gold Amber) */}
        <div 
          onClick={() => router.push('/market')}
          className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#F2A93B]/15 via-[#181A20] to-[#181A20] border border-[#2C303E] hover:border-[#F2A93B]/60 cursor-pointer transition-all duration-300 p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#F2A93B] flex items-center justify-center text-[#0F1015] shrink-0 shadow-lg shadow-[#F2A93B]/30 text-2xl font-black">
            🛍️
          </div>
          <div className="flex-1">
            <h2 className="text-base font-extrabold text-white">UzGo Market</h2>
            <p className="text-xs text-[#8B8D98] font-medium">Elektronika, kiyim va uy mollari</p>
          </div>
          <span className="text-[#8B8D98] text-xl font-bold group-hover:translate-x-1 transition-transform">›</span>
        </div>

        {/* 🛵 DELIVERY MODULE (Emerald Green) */}
        <div 
          onClick={() => router.push('/delivery')}
          className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#22C55E]/15 via-[#181A20] to-[#181A20] border border-[#2C303E] hover:border-[#22C55E]/60 cursor-pointer transition-all duration-300 p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#22C55E] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#22C55E]/30 text-2xl">
            🛵
          </div>
          <div className="flex-1">
            <h2 className="text-base font-extrabold text-white">UzGo Delivery</h2>
            <p className="text-xs text-[#8B8D98] font-medium">Termiz Fast Food va Milliy taomlar</p>
          </div>
          <span className="text-[#8B8D98] text-xl font-bold group-hover:translate-x-1 transition-transform">›</span>
        </div>

        {/* 📦 UZGO POCHTA MODULE (NEW) */}
        <div 
          onClick={() => router.push('/delivery')}
          className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#16C2B2]/15 via-[#181A20] to-[#181A20] border border-[#2C303E] hover:border-[#16C2B2]/60 cursor-pointer transition-all duration-300 p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#16C2B2] flex items-center justify-center text-[#0F1015] shrink-0 shadow-lg shadow-[#16C2B2]/30 text-2xl font-black">
            📦
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">UzGo Pochta</h2>
              <span className="text-[9px] bg-[#16C2B2]/20 text-[#16C2B2] px-2 py-0.5 rounded-full font-black uppercase">NEW</span>
            </div>
            <p className="text-xs text-[#8B8D98] font-medium">Hujjat va posilkalarni tezkor yetkazish</p>
          </div>
          <span className="text-[#8B8D98] text-xl font-bold group-hover:translate-x-1 transition-transform">›</span>
        </div>

        {/* Referral & Promo Card */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/10 border border-[#F2A93B]/30 flex items-center justify-center text-[#F2A93B]">
              <Gift size={20} />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white">Do'stingizni taklif qiling</div>
              <div className="text-[10px] text-[#8B8D98]">15,000 so'm promo-kod oling</div>
            </div>
          </div>
          <button 
            onClick={() => alert("Sizning taklif kodingiz: TERMIZ2026. Do'stlaringizga yuboring!")}
            className="bg-[#16C2B2] text-[#0F1015] px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-md shadow-[#16C2B2]/20"
          >
            <Share2 size={12} /> Ulashish
          </button>
        </div>

      </div>

      {/* Termiz Destinations */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <h3 className="text-sm font-bold mb-3 text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#16C2B2]" />
          Termiz shahri mashhur maskanlari
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {termizDestinations.map((dest, i) => (
            <div 
              key={i} 
              onClick={() => router.push('/taxi')}
              className="bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2]/50 p-3 rounded-2xl cursor-pointer transition-all hover:bg-[#22252E] flex items-center gap-2.5"
            >
              <span className="text-xl">{dest.icon}</span>
              <div className="overflow-hidden">
                <div className="font-extrabold text-xs text-white truncate">{dest.title}</div>
                <div className="text-[10px] text-gray-400 truncate">{dest.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
