'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, ShoppingBag, Package, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname === '/login' || pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { path: '/', label: t('home') || 'Bosh sahifa', icon: Home },
    { path: '/taxi', label: t('taxi') || 'Taksi', icon: Car },
    { path: '/market', label: 'Market', icon: ShoppingBag },
    { path: '/delivery', label: 'Delivery', icon: Package },
    { path: '/profile', label: t('profile') || 'Profil', icon: User },
  ];


  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-white/90 dark:bg-[#0F1015]/90 backdrop-blur-2xl border border-gray-200/80 dark:border-gray-800 rounded-full p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex justify-around items-center h-16 transition-colors">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || 
                          (item.path !== '/' && pathname?.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full spring-transition ${
                isActive ? 'text-[#0F1015] dark:text-white' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-md shadow-[#F59E0B] animate-pulse"></span>
              )}
              <div className={`p-1.5 rounded-full spring-transition ${
                isActive ? 'bg-[#0F1015] dark:bg-white text-[#F59E0B] dark:text-[#0F1015] scale-110 shadow-md' : 'hover:scale-105'
              }`}>
                <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-extrabold mt-0.5 tracking-tight transition-colors ${
                isActive ? 'text-[#0F1015] dark:text-white' : 'text-gray-400'
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


