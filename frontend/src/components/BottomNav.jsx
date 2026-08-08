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
    { path: '/', label: 'Bosh', icon: Home },
    { path: '/taxi', label: 'Taksi', icon: Car },
    { path: '/market', label: 'Market', icon: ShoppingBag },
    { path: '/delivery', label: 'Yetkazish', icon: Package },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-[#181A20]/95 backdrop-blur-xl border-t border-[#2C303E] pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || 
                          (item.path !== '/' && pathname?.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex flex-col items-center justify-center w-16 h-full space-y-1 transition-all ${
                isActive ? 'text-[#FFCC00]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-[#FFCC00]/10' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-[#FFCC00]' : 'text-gray-400'}`}>
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
