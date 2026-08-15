'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { 
  Menu, Bell, Wallet, MapPin, Search, ChevronRight, 
  Car, Utensils, Package, Smartphone, ShoppingBag, Grid, 
  Zap, ShieldCheck, Headphones, Gift, ArrowUpRight, Sparkles, Navigation
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || { user: null });
  const { t } = useLanguage();
  const userName = user?.name || "Sarvarbek";
  const [selectedLocation, setSelectedLocation] = useState("Termiz, Markaz");

  const services = [
    { 
      id: 'taxi', 
      title: 'Taksi', 
      subtitle: 'Tez va qulay', 
      badge: '3 min',
      icon: <Car className="w-8 h-8 text-[#F59E0B]" />, 
      bg: 'bg-amber-500/10 border-amber-500/20 hover:border-[#F59E0B]',
      badgeBg: 'bg-[#F59E0B] text-black',
      link: '/taxi' 
    },
    { 
      id: 'food', 
      title: 'Ovqat dastavka', 
      subtitle: 'Issiq taomlar', 
      badge: 'Top',
      icon: <Utensils className="w-8 h-8 text-[#10B981]" />, 
      bg: 'bg-emerald-500/10 border-emerald-500/20 hover:border-[#10B981]',
      badgeBg: 'bg-[#10B981] text-white',
      link: '/delivery' 
    },
    { 
      id: 'courier', 
      title: 'Kuryer', 
      subtitle: 'Eshikgacha posilka', 
      badge: 'Pochta',
      icon: <Package className="w-8 h-8 text-[#06B6D4]" />, 
      bg: 'bg-cyan-500/10 border-cyan-500/20 hover:border-[#06B6D4]',
      badgeBg: 'bg-[#06B6D4] text-white',
      link: '/delivery' 
    },
    { 
      id: 'electronics', 
      title: 'Elektronika', 
      subtitle: 'Gadjet & Smartfon', 
      badge: 'Chegirma',
      icon: <Smartphone className="w-8 h-8 text-[#6366F1]" />, 
      bg: 'bg-indigo-500/10 border-indigo-500/20 hover:border-[#6366F1]',
      badgeBg: 'bg-[#6366F1] text-white',
      link: '/market' 
    },
    { 
      id: 'market', 
      title: 'Market', 
      subtitle: 'Kiyim & Xaridlar', 
      badge: 'Brendlar',
      icon: <ShoppingBag className="w-8 h-8 text-[#F43F5E]" />, 
      bg: 'bg-rose-500/10 border-rose-500/20 hover:border-[#F43F5E]',
      badgeBg: 'bg-[#F43F5E] text-white',
      link: '/market' 
    },
    { 
      id: 'all', 
      title: 'Barchasi', 
      subtitle: 'Barcha xizmatlar', 
      badge: 'Xizmatlar',
      icon: <Grid className="w-8 h-8 text-[#0F1015]" />, 
      bg: 'bg-gray-500/10 border-gray-300 hover:border-[#0F1015]',
      badgeBg: 'bg-[#0F1015] text-white',
      link: '/market' 
    },
  ];

  const quickBenefits = [
    { title: 'Tez yetkazish', desc: '15-30 daqiqada', icon: <Zap className="w-5 h-5 text-[#F59E0B]" /> },
    { title: 'Xavfsiz to‘lov', desc: 'Click, Payme, Naqd', icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" /> },
    { title: '24/7 yordam', desc: 'Doimiy qo‘llab-quvvatlash', icon: <Headphones className="w-5 h-5 text-[#06B6D4]" /> },
    { title: 'Bonuslar', desc: 'Keshbek va sovg‘alar', icon: <Gift className="w-5 h-5 text-[#F43F5E]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0F1015] text-[#111827] dark:text-[#F5F5F7] pb-28 font-sans overflow-x-hidden transition-colors">
       {/* Main Container */}
      <main className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 pt-6 space-y-6">

        {/* Location & Destination Search Field */}
        <div className="bg-white dark:bg-[#181A20] rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/80 dark:border-gray-800 space-y-3">
          
          {/* Location Selector */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
            <div className="flex items-center gap-1.5 text-[#0F1015] dark:text-white">
              <Navigation size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
              <span className="font-extrabold text-sm">{selectedLocation}</span>
            </div>
            <span className="text-xs text-[#F59E0B] font-extrabold cursor-pointer hover:underline">O'zgartirish</span>
          </div>

          {/* Large Search Input */}
          <div 
            onClick={() => router.push('/taxi')}
            className="bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100/80 dark:hover:bg-gray-800 border border-gray-200/70 dark:border-gray-700 hover:border-[#F59E0B] rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all duration-200 apple-card-press group"
          >
            <Search size={22} className="text-gray-400 group-hover:text-[#F59E0B] transition-colors" />
            <span className="text-gray-400 dark:text-gray-300 font-medium text-sm flex-1">Qayerga boramiz?</span>
            <div className="bg-[#0F1015] dark:bg-[#F59E0B] text-[#F59E0B] dark:text-[#0F1015] px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1 shadow-md shadow-black/10">
              Taksi <ChevronRight size={14} />
            </div>
          </div>

        </div>

        {/* 6 Main Service Bento Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {services.map((srv) => (
            <div 
              key={srv.id}
              onClick={() => router.push(srv.link)}
              className={`bg-white dark:bg-[#181A20] rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.03)] cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 apple-card-press relative overflow-hidden group ${srv.bg}`}
            >
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform">
                  {srv.icon}
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm ${srv.badgeBg}`}>
                  {srv.badge}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm md:text-base text-[#0F1015] dark:text-white group-hover:text-[#F59E0B] transition-colors">{srv.title}</h3>
                  <ArrowUpRight size={16} className="text-gray-400 group-hover:text-[#F59E0B] transition-colors" />
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 truncate">{srv.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Cashback Banner */}
        <div className="rounded-3xl p-5 bg-gradient-to-r from-[#0F1015] via-[#1C1E26] to-[#0F1015] text-white shadow-xl shadow-black/10 border border-gray-800 relative overflow-hidden group">
          <div className="flex justify-between items-center relative z-10">
            <div className="space-y-1 max-w-[70%]">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#F59E0B] uppercase tracking-wider">
                <Sparkles size={14} className="animate-spin" />
                <span>BUGUNGI KESHBЕK</span>
              </div>
              <h2 className="text-sm md:text-base font-extrabold text-white leading-tight">
                Har bir buyurtmangizdan 10% keshbek oling!
              </h2>
            </div>

            <div className="bg-[#F59E0B] text-[#0F1015] p-3 rounded-2xl flex flex-col items-center justify-center font-black text-center shadow-lg shadow-[#F59E0B]/20 group-hover:scale-105 transition-transform">
              <span className="text-base font-black">+10%</span>
              <span className="text-[9px] uppercase tracking-tighter">KESHBEK</span>
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Quick Benefits Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">Afzalliklarimiz</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickBenefits.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[#181A20] rounded-2xl p-3.5 border border-gray-100/80 dark:border-gray-800 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0F1015] dark:text-white">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Services List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">Tezkor xizmatlar</h3>
            <span 
              onClick={() => router.push('/market')}
              className="text-xs font-extrabold text-[#F59E0B] cursor-pointer hover:underline"
            >
              Barchasi
            </span>
          </div>

          <div className="bg-white dark:bg-[#181A20] rounded-3xl border border-gray-100/80 dark:border-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.03)] divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
            <div 
              onClick={() => router.push('/taxi')}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl">
                  🚕
                </div>
                <div>
                  <h4 className="font-black text-sm text-[#0F1015] dark:text-white group-hover:text-[#F59E0B] transition-colors">Termiz markaziga taksi</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Taxminan 12,000 so'm • 3 daqiqa</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-[#F59E0B] transition-colors" />
            </div>

            <div 
              onClick={() => router.push('/delivery')}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl">
                  🥟
                </div>
                <div>
                  <h4 className="font-black text-sm text-[#0F1015] dark:text-white group-hover:text-[#F59E0B] transition-colors">Surxon Somsa va Fast Food</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Yetkazish 15 daqiqada • 5,000 so'm</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-[#F59E0B] transition-colors" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
