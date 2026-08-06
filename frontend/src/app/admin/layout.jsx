'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { 
  LayoutDashboard, Users, Car, Package, 
  Layers, ShoppingCart, Truck, Store, 
  Menu, X, Bell, LogOut, UserCircle 
} from 'lucide-react';
import { logout } from '../../store/authSlice';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // If on admin login page, render children without sidebar layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Foydalanuvchilar', path: '/admin/users', icon: Users },
    { name: 'Haydovchilar', path: '/admin/drivers', icon: Car },
    { name: 'Mahsulotlar', path: '/admin/products', icon: Package },
    { name: 'Kategoriyalar', path: '/admin/categories', icon: Layers },
    { name: 'Buyurtmalar', path: '/admin/orders', icon: ShoppingCart },
  ];

  const getPageTitle = () => {
    const current = navigation.find(item => pathname?.startsWith(item.path));
    return current ? current.name : 'Admin Panel';
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#111827] text-[#f9fafb] font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0d1b3e] transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col border-r border-[#374151] shadow-xl`}
      >
        <div className="flex items-center justify-center h-16 border-b border-[#374151] px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFC300] flex items-center justify-center font-bold text-[#0d1b3e]">
              UG
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              Uz<span className="text-[#FFC300]">Go</span> Admin
            </span>
          </div>
          <button 
            className="ml-auto text-gray-400 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname?.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#1a2744] text-[#FFC300] border-l-4 border-[#FFC300]' 
                      : 'text-gray-300 hover:bg-[#1a2744] hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  <Icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#374151]">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-900/50 hover:text-red-400 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Chiqish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 h-16 bg-[#1a2744] border-b border-[#374151] flex items-center justify-between px-4 lg:px-8 shadow-sm">
          <div className="flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none lg:hidden mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-white">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-[#FFC300] relative p-1 rounded-full hover:bg-[#0d1b3e] transition-colors">
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#1a2744]" />
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 border-l border-[#374151] pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-[#9ca3af]">Super Admin</p>
              </div>
              <UserCircle size={32} className="text-gray-300" />
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#111827] p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
