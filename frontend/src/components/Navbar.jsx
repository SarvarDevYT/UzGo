'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { User, Bell, Car, ShoppingBag, Utensils, Package, Globe, Wallet, Sun, Moon, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth || { user: null });
  const pathname = usePathname();
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, isDark, toggleTheme } = useTheme();

  if (pathname === '/login' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#121214]/90 backdrop-blur-2xl border-b border-gray-200/80 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Yandex Go Style */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black text-xl shadow-[0_4px_14px_rgba(252,224,0,0.4)] group-hover:scale-105 transition-transform border border-black/10">
                Go
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-[#121214] dark:text-white leading-none">
                  Uz<span className="text-[#FCE000]">Go</span>
                </span>
                <span className="text-[9px] font-extrabold text-gray-500 dark:text-gray-400 tracking-wider uppercase mt-0.5">
                  SuperApp
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5">
              <Link 
                href="/taxi" 
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  pathname === '/taxi' || pathname === '/'
                    ? 'bg-[#121214] text-[#FCE000] dark:bg-[#FCE000] dark:text-[#121214] shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1C1C1E]'
                }`}
              >
                <Car size={15} /> Taksi
              </Link>
              <Link 
                href="/delivery" 
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  pathname?.startsWith('/delivery') 
                    ? 'bg-[#121214] text-[#FCE000] dark:bg-[#FCE000] dark:text-[#121214] shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1C1C1E]'
                }`}
              >
                <Utensils size={15} /> Taomlar
              </Link>
              <Link 
                href="/market" 
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  pathname?.startsWith('/market') 
                    ? 'bg-[#121214] text-[#FCE000] dark:bg-[#FCE000] dark:text-[#121214] shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1C1C1E]'
                }`}
              >
                <ShoppingBag size={15} /> Lavka & Market
              </Link>
            </div>
          </div>

          {/* Right Section Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* UzGo Pay Wallet Pill */}
            <Link 
              href="/wallet"
              className="bg-[#FCE000]/15 hover:bg-[#FCE000]/25 border border-[#FCE000]/40 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-black text-[#121214] dark:text-[#FCE000] transition-colors apple-card-press"
              title="UzGo Hamyon va Keshbek"
            >
              <Wallet size={15} className="text-[#FCE000] fill-[#FCE000]" />
              <span className="font-extrabold text-xs">85,000 so'm</span>
              <span className="hidden sm:inline-block bg-[#FC3F1D] text-white text-[9px] px-1.5 py-0.5 rounded-md font-black">
                +3%
              </span>
            </Link>

            {/* Yandex Pro Driver Switch */}
            <Link 
              href="/driver"
              className="hidden lg:flex items-center gap-1.5 text-xs font-black bg-[#1C1C1E] text-white border border-gray-700 px-3 py-1.5 rounded-2xl hover:bg-black transition-colors"
              title="Yandex Pro Haydovchi Rejimi"
            >
              <Zap size={14} className="text-[#FCE000] fill-[#FCE000]" />
              <span>Haydovchi (Pro)</span>
            </Link>

            {/* Language Switcher */}
            <button 
              onClick={() => toggleLanguage()}
              className="flex items-center gap-1.5 text-xs font-black bg-gray-100 dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-700 text-[#121214] dark:text-[#FCE000] px-3 py-1.5 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#2C2C2E] transition-colors shadow-sm"
              title="Tilni almashtirish / Сменить язык"
            >
              <Globe size={14} className="text-[#FCE000]" />
              <span>{lang === 'uz' ? 'O\'Z 🇺🇿' : 'РУ 🇷🇺'}</span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button 
              onClick={() => toggleTheme()}
              className="w-9 h-9 rounded-2xl bg-gray-100 dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#2C2C2E] transition-colors apple-card-press"
              title={isDark ? "Yoritilgan rejimga o'tish (Light Mode)" : "Qorong'u rejimga o'tish (Dark Mode)"}
            >
              {isDark ? <Sun size={17} className="text-[#FCE000]" /> : <Moon size={17} className="text-[#121214]" />}
            </button>

            {/* Profile Avatar / Login Button */}
            {user ? (
              <Link href="/profile" className="flex items-center gap-2 bg-gray-100 dark:bg-[#1C1C1E] px-3 py-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#FCE000]">
                <div className="w-6 h-6 rounded-xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black text-xs shadow-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={13} />}
                </div>
                <span className="hidden md:block text-xs font-black text-[#121214] dark:text-white">{user.name || 'Foydalanuvchi'}</span>
              </Link>
            ) : (
              <Link href="/login" className="bg-[#FCE000] hover:bg-[#E5CB00] text-[#121214] px-4 py-1.5 rounded-2xl text-xs font-black transition-all shadow-sm">
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
