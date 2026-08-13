'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, ShoppingBag, Package, User } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname();

  if (pathname === '/login' || pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { path: '/', label: 'Bosh', icon: Home, activeColor: 'text-[#16C2B2]', glowColor: 'bg-[#16C2B2]' },
    { path: '/taxi', label: 'Taksi', icon: Car, activeColor: 'text-[#FF5B4C]', glowColor: 'bg-[#FF5B4C]' },
    { path: '/market', label: 'Market', icon: ShoppingBag, activeColor: 'text-[#F2A93B]', glowColor: 'bg-[#F2A93B]' },
    { path: '/delivery', label: 'Yetkazish', icon: Package, activeColor: 'text-[#22C55E]', glowColor: 'bg-[#22C55E]' },
    { path: '/profile', label: 'Profil', icon: User, activeColor: 'text-[#16C2B2]', glowColor: 'bg-[#16C2B2]' },
  ];

  return (
    <div className="fixed bottom-3 left-4 right-4 z-50 max-w-lg mx-auto">
      <div className="bg-[#181A20]/90 backdrop-blur-2xl border border-[#2C303E] rounded-3xl p-1.5 shadow-2xl shadow-black/80 flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || 
                          (item.path !== '/' && pathname?.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all group ${
                isActive ? item.activeColor : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {isActive && (
                <span className={`absolute -top-1 w-1.5 h-1.5 rounded-full ${item.glowColor} shadow-lg shadow-current animate-pulse`}></span>
              )}
              <div className={`p-1.5 rounded-2xl transition-all ${isActive ? 'bg-[#222530] scale-110 shadow-inner' : 'group-hover:scale-105'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-extrabold transition-colors ${isActive ? item.activeColor : 'text-gray-400'}`}>
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

