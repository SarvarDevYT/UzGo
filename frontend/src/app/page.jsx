'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Car, ShoppingBag, Bike, ChevronRight, Star, TrendingUp, MapPin, Zap, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || { user: null });
  const userName = user?.name || "Sultonbek";

  const quickDestinations = [
    { title: "Uyga", icon: "🏠", subtitle: "Chilonzor 8-kvartal" },
    { title: "Ishga", icon: "💼", subtitle: "Amir Temur shoh ko'chasi" },
    { title: "Magic City", icon: "🎡", subtitle: "Tashkent City" },
    { title: "Mega Planet", icon: "🛍️", subtitle: "Yunusobod" },
  ];

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F3F4F6] pb-24 overflow-x-hidden">
      {/* Header Banner - Yandex Go Header */}
      <div className="relative pt-8 pb-14 px-4 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-[#181A20] to-[#0F1015] border-b border-[#2C303E]">
        {/* Glow accent */}
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#FFCC00] rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-[#FC3F1D] rounded-full filter blur-[120px] opacity-20"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFCC00] text-[#0F1015] text-xs font-black px-2 py-1 rounded-md uppercase tracking-wider">
                SUPER APP
              </span>
              <span className="text-gray-400 text-xs font-semibold">O'zbekiston</span>
            </div>
            
            <Link href="/profile" className="w-10 h-10 rounded-full bg-[#181A20] border border-[#2C303E] flex items-center justify-center overflow-hidden hover:border-[#FFCC00] transition-colors shadow-lg">
              <span className="font-extrabold text-sm text-[#FFCC00]">{userName.charAt(0).toUpperCase()}</span>
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            Xush kelibsiz, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] via-yellow-400 to-[#FC3F1D]">{userName}!</span>
          </h1>
          <p className="text-gray-400 font-medium text-base">Qayerga boramiz yoki nimani yetkazamiz?</p>

          {/* Search bar Yandex Go style */}
          <div 
            onClick={() => router.push('/taxi')}
            className="mt-6 flex items-center bg-[#181A20] border border-[#2C303E] hover:border-[#FFCC00]/50 rounded-2xl p-4 cursor-pointer shadow-xl transition-all group"
          >
            <MapPin className="text-[#FFCC00] mr-3 group-hover:scale-110 transition-transform" size={22} />
            <span className="text-gray-400 font-medium text-base flex-1">Qayerga boramiz?</span>
            <span className="bg-[#FFCC00] text-[#0F1015] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md">
              Taksi <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Main Core Modules - Yandex Go Inspired Cards */}
      <div className="max-w-md mx-auto px-4 -mt-6 relative z-20 space-y-4">
        
        {/* 🚕 TAXI MODULE */}
        <div 
          onClick={() => router.push('/taxi')}
          className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#FFCC00]/10 transition-all duration-300 hover:scale-[1.01] bg-[#181A20] border border-[#2C303E] hover:border-[#FFCC00]/50 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFCC00]/15 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#FFCC00] text-[#0F1015] p-2 rounded-xl text-xs font-black">TAKSI</span>
                <span className="text-xs text-yellow-400 font-semibold flex items-center gap-1">
                  <Zap size={12} /> ~3 min yetib keladi
                </span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">UzGo Taksi</h2>
              <p className="text-gray-400 text-sm font-medium mb-4">Ekonom, Komfort va Business tariflar</p>
              <button className="bg-[#FFCC00] hover:bg-yellow-400 text-[#0F1015] px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center gap-1 shadow-lg shadow-[#FFCC00]/20">
                Chaqirish <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-6xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 drop-shadow-2xl">
              🚕
            </div>
          </div>
        </div>

        {/* 🛍️ MARKET MODULE */}
        <div 
          onClick={() => router.push('/market')}
          className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 hover:scale-[1.01] bg-[#181A20] border border-[#2C303E] hover:border-purple-500/50 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-500 text-white p-2 rounded-xl text-xs font-black">MARKET</span>
                <span className="text-xs text-purple-300 font-semibold">14,000+ mahsulot</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">UzGo Market</h2>
              <p className="text-gray-400 text-sm font-medium mb-4">Elektronika, kiyim va maishiy texnika</p>
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center gap-1 shadow-lg shadow-purple-900/30">
                Xarid qilish <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-6xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 drop-shadow-2xl">
              🛍️
            </div>
          </div>
        </div>

        {/* 🛵 DELIVERY MODULE */}
        <div 
          onClick={() => router.push('/delivery')}
          className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 hover:scale-[1.01] bg-[#181A20] border border-[#2C303E] hover:border-emerald-500/50 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-500 text-white p-2 rounded-xl text-xs font-black">YETKAZISH</span>
                <span className="text-xs text-emerald-300 font-semibold">Restoran va do'konlar</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">UzGo Delivery</h2>
              <p className="text-gray-400 text-sm font-medium mb-4">Sevimli taomlar tezkor yetkaziladi</p>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center gap-1 shadow-lg shadow-emerald-900/30">
                Buyurtma berish <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-6xl group-hover:scale-110 group-hover:translate-x-2 transition-transform duration-500 drop-shadow-2xl">
              🛵
            </div>
          </div>
        </div>

      </div>

      {/* Quick Destinations Slider (Yandex Go Style) */}
      <div className="max-w-md mx-auto px-4 mt-8">
        <h3 className="text-base font-bold mb-3 text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FFCC00]" />
          Tezkor manzillar
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {quickDestinations.map((dest, i) => (
            <div 
              key={i} 
              onClick={() => router.push('/taxi')}
              className="bg-[#181A20] border border-[#2C303E] hover:border-[#FFCC00]/50 p-3 rounded-2xl cursor-pointer transition-all hover:bg-[#22252E] flex items-center gap-3"
            >
              <span className="text-2xl">{dest.icon}</span>
              <div className="overflow-hidden">
                <div className="font-bold text-sm text-white truncate">{dest.title}</div>
                <div className="text-xs text-gray-400 truncate">{dest.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Features Section */}
      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 grid grid-cols-3 gap-3 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-[#FFCC00]/10 text-[#FFCC00] flex items-center justify-center mb-2">
              <Zap size={20} />
            </div>
            <span className="font-bold text-white text-sm">~3 daqiqa</span>
            <span className="text-[10px] text-gray-400">Taksi yetib kelishi</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center mb-2">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-white text-sm">100% Xavfsiz</span>
            <span className="text-[10px] text-gray-400">Tekshirilgan haydovchilar</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
              <TrendingUp size={20} />
            </div>
            <span className="font-bold text-white text-sm">Best Price</span>
            <span className="text-[10px] text-gray-400">Hamyonbop narxlar</span>
          </div>
        </div>
      </div>

    </div>
  );
}
