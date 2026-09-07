'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Utensils, ShoppingBag, Wallet, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname === '/login' || pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { path: '/', label: 'Taksi', icon: Car },
    { path: '/delivery', label: 'Taomlar', icon: Utensils },
    { path: '/market', label: 'Lavka', icon: ShoppingBag },
    { path: '/wallet', label: 'Hamyon', icon: Wallet },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto md:hidden pointer-events-none">
      <div className="pointer-events-auto bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-2xl border border-gray-200/90 dark:border-gray-800 rounded-3xl p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.18)] flex justify-around items-center h-16 transition-all">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = (item.path === '/' && (pathname === '/' || pathname === '/taxi')) || 
                           (item.path !== '/' && pathname?.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full spring-transition ${
                isActive ? 'text-[#121214] dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-1.5 h-1.5 rounded-full bg-[#FCE000] shadow-[0_0_8px_#FCE000]"></span>
              )}
              <div className={`p-1 rounded-2xl spring-transition ${
                isActive ? 'bg-[#FCE000] text-[#121214] scale-105 shadow-sm' : 'hover:scale-105'
              }`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-black mt-0.5 tracking-tight transition-colors ${
                isActive ? 'text-[#121214] dark:text-white font-extrabold' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
