'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { User, Bell, Car, ShoppingBag, Package } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth || { user: null });
  const pathname = usePathname();

  if (pathname === '/login' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#181A20]/90 backdrop-blur-xl border-b border-[#2C303E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Yandex Go Style */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFCC00] to-[#FC3F1D] flex items-center justify-center shadow-lg shadow-[#FFCC00]/20 font-black text-[#0F1015] text-lg tracking-tighter group-hover:scale-105 transition-transform">
                GO
              </div>
              <span className="font-extrabold text-xl text-white tracking-wide">
                Uz<span className="text-[#FFCC00]">Go</span>
              </span>
            </Link>

            {/* Desktop Navigation - Service Chips */}
            <div className="hidden md:flex items-center gap-2">
              <Link 
                href="/taxi" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  pathname === '/taxi' 
                    ? 'bg-[#FFCC00] text-[#0F1015] shadow-md shadow-[#FFCC00]/20' 
                    : 'text-gray-300 hover:bg-[#22252E] hover:text-white'
                }`}
              >
                <Car size={16} /> Taksi
              </Link>
              <Link 
                href="/market" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  pathname?.startsWith('/market') 
                    ? 'bg-[#FFCC00] text-[#0F1015] shadow-md shadow-[#FFCC00]/20' 
                    : 'text-gray-300 hover:bg-[#22252E] hover:text-white'
                }`}
              >
                <ShoppingBag size={16} /> Market
              </Link>
              <Link 
                href="/delivery" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  pathname?.startsWith('/delivery') 
                    ? 'bg-[#FFCC00] text-[#0F1015] shadow-md shadow-[#FFCC00]/20' 
                    : 'text-gray-300 hover:bg-[#22252E] hover:text-white'
                }`}
              >
                <Package size={16} /> Yetkazish
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-300 hover:text-[#FFCC00] p-2 rounded-xl hover:bg-[#22252E] transition-colors" aria-label="Bildirishnomalar">
              <Bell size={20} />
            </button>
            
            {user ? (
              <Link href="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-[#22252E] px-3 py-1.5 rounded-full border border-[#2C303E] hover:border-[#FFCC00]/50">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FC3F1D] flex items-center justify-center text-[#0F1015] font-extrabold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="hidden md:block text-xs font-bold text-white">{user.name || 'Foydalanuvchi'}</span>
              </Link>
            ) : (
              <Link href="/login" className="bg-[#FFCC00] hover:bg-yellow-400 text-[#0F1015] px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-[#FFCC00]/20">
                Kirish
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
