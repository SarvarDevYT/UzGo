'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Car, ShoppingBag, Bike, ChevronRight, Star, TrendingUp, MapPin, Zap, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || { user: null });
  const userName = user?.name || "Sarvarbek";

  const quickDestinations = [
    { title: "Uyga", icon: "🏠", subtitle: "Chilonzor 8-kvartal" },
    { title: "Ishga", icon: "💼", subtitle: "Amir Temur shoh ko'chasi" },
    { title: "Magic City", icon: "🎡", subtitle: "Tashkent City" },
    { title: "Mega Planet", icon: "🛍️", subtitle: "Yunusobod" },
  ];

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-24 overflow-x-hidden">
      {/* Header Banner - Turquoise Glow */}
      <div className="relative pt-8 pb-14 px-4 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-[#181A20] to-[#0F1015] border-b border-[#2C303E]">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#16C2B2] rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-[#FF5B4C] rounded-full filter blur-[120px] opacity-20"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#16C2B2] text-[#0F1015] text-xs font-black px-2 py-1 rounded-md uppercase tracking-wider">
                SUPER APP
              </span>
              <span className="text-[#8B8D98] text-xs font-semibold">O'zbekiston</span>
            </div>
            
            <Link href="/profile" className="w-10 h-10 rounded-full bg-[#181A20] border border-[#2C303E] flex items-center justify-center overflow-hidden hover:border-[#16C2B2] transition-colors shadow-lg">
              <span className="font-extrabold text-sm text-[#16C2B2]">{userName.charAt(0).toUpperCase()}</span>
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            Xush kelibsiz 👋, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16C2B2] via-[#20E3D1] to-[#F2A93B]">{userName}!</span>
          </h1>
          <p className="text-[#8B8D98] font-medium text-sm">Qayerga boramiz yoki nimani yetkazamiz?</p>

          {/* Search bar */}
          <div 
            onClick={() => router.push('/taxi')}
            className="mt-6 flex items-center bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2]/50 rounded-2xl p-4 cursor-pointer shadow-xl transition-all group"
          >
            <MapPin className="text-[#16C2B2] mr-3 group-hover:scale-110 transition-transform" size={22} />
            <span className="text-[#8B8D98] font-medium text-base flex-1">Qayerga boramiz?</span>
            <span className="bg-[#FF5B4C] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md">
              Taksi <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Main Core Modules - Matching New HTML Cards */}
      <div className="max-w-md mx-auto px-4 -mt-6 relative z-20 space-y-3">
        
        {/* Cashback Banner */}
        <div className="rounded-2xl p-4 bg-gradient-to-r from-[#0A2E2B] to-[#0F1015] border border-[#16C2B2]/40 flex justify-between items-center shadow-lg">
          <div>
            <div className="text-sm font-extrabold text-[#16C2B2]">Bugungi keshbek</div>
            <div className="text-xs text-[#8B8D98]">Har qanday xizmatda</div>
          </div>
          <div className="text-2xl font-black text-[#16C2B2]">+10%</div>
        </div>

        {/* 🚕 TAXI MODULE (Coral Red) */}
        <div 
          onClick={() => router.push('/taxi')}
          className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#FF5B4C]/15 via-[#181A20] to-[#181A20] border border-[#2C303E] hover:border-[#FF5B4C]/60 cursor-pointer transition-all duration-300 p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FF5B4C] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#FF5B4C]/30 text-2xl">
            🚕
          </div>
          <div className="flex-1">
            <h2 className="text-base font-extrabold text-white">UzGo Taksi</h2>
            <p className="text-xs text-[#8B8D98] font-medium">3 daqiqada yetib keladi</p>
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
            <p className="text-xs text-[#8B8D98] font-medium">Elektronika va kiyim mahsulotlari</p>
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
            <p className="text-xs text-[#8B8D98] font-medium">Taom yetkazib berish</p>
          </div>
          <span className="text-[#8B8D98] text-xl font-bold group-hover:translate-x-1 transition-transform">›</span>
        </div>

      </div>

      {/* Quick Destinations Slider */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <h3 className="text-sm font-bold mb-3 text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#16C2B2]" />
          Tezkor manzillar
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {quickDestinations.slice(0, 3).map((dest, i) => (
            <div 
              key={i} 
              onClick={() => router.push('/taxi')}
              className="bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2]/50 p-2.5 rounded-2xl cursor-pointer transition-all hover:bg-[#22252E] flex items-center gap-2"
            >
              <span className="text-lg">{dest.icon}</span>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-white truncate">{dest.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
