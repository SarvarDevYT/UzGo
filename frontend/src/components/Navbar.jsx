'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { User, Menu, Bell } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth || { user: null });
  const pathname = usePathname();

  // Hide Navbar on login and admin pages
  if (pathname === '/login' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1a1a2e]/80 backdrop-blur-md border-b border-[#2a2a4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-1">
              UzGo <span className="text-[#ffc107] w-2 h-2 rounded-full inline-block mb-1"></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/taxi" className={`transition-colors ${pathname === '/taxi' ? 'text-[#ffc107] font-semibold' : 'text-gray-300 hover:text-white'}`}>Taksi</Link>
            <Link href="/market" className={`transition-colors ${pathname?.startsWith('/market') ? 'text-[#ffc107] font-semibold' : 'text-gray-300 hover:text-white'}`}>Market</Link>
            <Link href="/delivery" className={`transition-colors ${pathname?.startsWith('/delivery') ? 'text-[#ffc107] font-semibold' : 'text-gray-300 hover:text-white'}`}>Yetkazib berish</Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white p-2" aria-label="Bildirishnomalar">
              <Bell size={20} />
            </button>
            
            {user ? (
              <Link href="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#1a237e] flex items-center justify-center text-white border border-[#2a2a4a]">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                </div>
                <span className="hidden md:block text-sm font-medium">{user.name || 'Foydalanuvchi'}</span>
              </Link>
            ) : (
              <Link href="/login" className="bg-[#1a237e] hover:bg-[#1a237e]/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Kirish
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-300 hover:text-white p-2" aria-label="Menyu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
