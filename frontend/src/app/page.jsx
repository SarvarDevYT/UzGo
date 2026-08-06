'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Car, ShoppingBag, Bike, ChevronRight, Star, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || { user: null });
  const userName = user?.name || "Sultonbek";

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text pb-24 overflow-x-hidden">
      {/* Hero Section with Animated Gradient */}
      <div className="relative pt-12 pb-16 px-4 overflow-hidden rounded-b-[2.5rem] bg-dark-card border-b border-dark-border shadow-lg">
        {/* Animated Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#1a237e] rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-purple-900 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-md mx-auto relative z-10 animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-900/30 rounded-xl flex items-center justify-center border border-primary-900/50">
                <span className="font-extrabold text-[#ffc107] text-xl">UG</span>
              </div>
              <span className="font-bold text-xl tracking-wide">UzGo</span>
            </div>
            
            <Link href="/profile" className="w-10 h-10 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center overflow-hidden hover:border-primary-900 transition-colors">
              <span className="font-bold text-sm text-[#ffc107]">{userName.charAt(0).toUpperCase()}</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">
            Xush kelibsiz, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#ffc107]">{userName}!</span>
          </h1>
          <p className="text-dark-muted font-medium text-lg">Bir platformada hamma narsa</p>
        </div>
      </div>

      {/* Main Modules - The Core of the Super App */}
      <div className="max-w-md mx-auto px-4 -mt-8 relative z-20 space-y-4">
        
        {/* TAXI MODULE */}
        <div 
          onClick={() => router.push('/taxi')}
          className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] bg-dark-card border border-dark-border animate-slide-up cursor-pointer"
          style={{ animationDelay: '100ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400 backdrop-blur-sm">
                  <Car className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">TAKSI</h2>
              </div>
              <p className="text-blue-200/80 mb-4 text-sm font-medium">Tez va qulay manzilga yetib oling</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-1 shadow-lg shadow-blue-900/30">
                Buyurtma berish <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-6xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 drop-shadow-2xl">
              🚕
            </div>
          </div>
        </div>

        {/* MARKET MODULE */}
        <div 
          onClick={() => router.push('/market')}
          className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02] bg-dark-card border border-dark-border animate-slide-up cursor-pointer"
          style={{ animationDelay: '200ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400 backdrop-blur-sm">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">MARKET</h2>
              </div>
              <p className="text-purple-200/80 mb-4 text-sm font-medium">Minglab mahsulotlar onlayn do'konda</p>
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-1 shadow-lg shadow-purple-900/30">
                Xarid qilish <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-6xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 drop-shadow-2xl">
              🛍️
            </div>
          </div>
        </div>

        {/* DELIVERY MODULE */}
        <div 
          onClick={() => router.push('/delivery')}
          className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02] bg-dark-card border border-dark-border animate-slide-up cursor-pointer"
          style={{ animationDelay: '300ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 backdrop-blur-sm">
                  <Bike className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">YETKAZIB BERISH</h2>
              </div>
              <p className="text-emerald-200/80 mb-4 text-sm font-medium">Pochta va taomlar tezkor yetkaziladi</p>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-1 shadow-lg shadow-emerald-900/30">
                Buyurtma <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-6xl group-hover:scale-110 group-hover:translate-x-2 transition-transform duration-500 drop-shadow-2xl">
              🛵
            </div>
          </div>
        </div>

      </div>

      {/* Stats / Trust Badges Section */}
      <div className="max-w-md mx-auto px-4 mt-10 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <h3 className="text-lg font-bold mb-4 text-dark-text flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Nega aynan UzGo?
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-4 text-center flex flex-col items-center justify-center hover:bg-dark-bg transition-colors">
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <span className="font-bold text-lg text-white">10K+</span>
            <span className="text-xs text-dark-muted font-medium">Foydalanuvchi</span>
          </div>
          
          <div className="bg-dark-card border border-dark-border rounded-2xl p-4 text-center flex flex-col items-center justify-center hover:bg-dark-bg transition-colors">
            <Car className="w-6 h-6 text-[#ffc107] mb-2" />
            <span className="font-bold text-lg text-white">500+</span>
            <span className="text-xs text-dark-muted font-medium">Haydovchi</span>
          </div>
          
          <div className="bg-dark-card border border-dark-border rounded-2xl p-4 text-center flex flex-col items-center justify-center hover:bg-dark-bg transition-colors">
            <Star className="w-6 h-6 text-purple-400 mb-2" />
            <span className="font-bold text-lg text-white">1000+</span>
            <span className="text-xs text-dark-muted font-medium">Mahsulot</span>
          </div>
        </div>
      </div>

    </div>
  );
}
