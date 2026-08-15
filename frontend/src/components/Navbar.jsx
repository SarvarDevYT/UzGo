'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { User, Bell, Car, ShoppingBag, Package, Globe, Wallet, Sun, Moon } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0F1015]/90 backdrop-blur-2xl border-b border-gray-200/80 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo UzGo Style */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img 
                src="/logo.jpg" 
                alt="UzGo Logo" 
                className="w-9 h-9 object-cover rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform" 
              />
              <span className="font-black text-2xl tracking-tight text-[#0F1015] dark:text-white group-hover:scale-105 transition-transform">
                Uz<span className="text-[#F59E0B]">Go</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5">
              <Link 
                href="/taxi" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all ${
                  pathname === '/taxi' 
                    ? 'bg-[#0F1015] text-[#F59E0B] dark:bg-[#F59E0B] dark:text-[#0F1015] shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Car size={15} /> {t('taxi')}
              </Link>
              <Link 
                href="/market" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all ${
                  pathname?.startsWith('/market') 
                    ? 'bg-[#0F1015] text-[#F59E0B] dark:bg-[#F59E0B] dark:text-[#0F1015] shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <ShoppingBag size={15} /> {t('market')}
              </Link>
              <Link 
                href="/delivery" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all ${
                  pathname?.startsWith('/delivery') 
                    ? 'bg-[#0F1015] text-[#F59E0B] dark:bg-[#F59E0B] dark:text-[#0F1015] shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Package size={15} /> {t('delivery')}
              </Link>
            </div>
          </div>

          {/* Right Section Actions */}
          <div className="flex items-center gap-2">
            
            {/* Wallet Button */}
            <Link 
              href="/wallet"
              className="bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black text-[#D97706] dark:text-[#F59E0B] transition-colors apple-card-press"
              title="UzGo Hamyon va Keshbek"
            >
              <Wallet size={14} className="text-[#F59E0B]" />
              <span className="hidden sm:inline">145,000 so'm</span>
            </Link>

            {/* Driver Mode Button */}
            <Link 
              href="/driver"
              className="hidden sm:flex items-center gap-1 text-xs font-black bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#0F1015] dark:text-white px-3 py-1.5 rounded-2xl hover:bg-gray-200/80 dark:hover:bg-gray-700 transition-colors"
              title="Haydovchi Rejimi"
            >
              🚖 <span>{t('driver')}</span>
            </Link>

            {/* 100% Working Language Switcher Button */}
            <button 
              onClick={() => toggleLanguage()}
              className="flex items-center gap-1.5 text-xs font-black bg-[#0F1015] dark:bg-gray-800 text-[#F59E0B] px-3 py-1.5 rounded-2xl hover:bg-[#1E212B] transition-colors shadow-sm"
              title="Tilni almashtirish / Сменить язык"
            >
              <Globe size={14} className="text-[#F59E0B]" />
              <span>{lang === 'uz' ? 'O\'Z 🇺🇿' : 'РУ 🇷🇺'}</span>
            </button>

            {/* Global Light / Dark Theme Switcher Button */}
            <button 
              onClick={() => toggleTheme()}
              className="w-9 h-9 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors apple-card-press"
              title={isDark ? "Yoritilgan rejimga o'tish (Light Mode)" : "Qorong'u rejimga o'tish (Dark Mode)"}
            >
              {isDark ? <Sun size={18} className="text-[#F59E0B]" /> : <Moon size={18} className="text-gray-700" />}
            </button>

            {/* Notification Bell */}
            <button className="relative w-9 h-9 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors apple-card-press" aria-label="Bildirishnomalar">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
            </button>

            
            {/* User Profile Avatar */}
            {user ? (
              <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors bg-gray-100 px-3 py-1.5 rounded-2xl border border-gray-200 hover:border-gray-300">
                <div className="w-7 h-7 rounded-xl bg-[#0F1015] text-[#F59E0B] flex items-center justify-center font-black text-xs shadow-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="hidden md:block text-xs font-extrabold text-[#0F1015]">{user.name || 'Foydalanuvchi'}</span>
              </Link>
            ) : (
              <Link href="/login" className="bg-[#0F1015] hover:bg-[#1E212B] text-[#F59E0B] px-4 py-1.5 rounded-2xl text-xs font-black transition-all shadow-md">
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

