'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { 
  LayoutDashboard, Users, Car, Package, 
  Layers, ShoppingCart, Tag, MapPin, 
  Menu, X, Bell, LogOut, UserCircle, BarChart3 
} from 'lucide-react';
import { logout } from '../../store/authSlice';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Analitika', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Talab Xaritasi', path: '/admin/heatmap', icon: MapPin },
    { name: 'Foydalanuvchilar', path: '/admin/users', icon: Users },
    { name: 'Haydovchilar', path: '/admin/drivers', icon: Car },
    { name: 'Mahsulotlar', path: '/admin/products', icon: Package },
    { name: 'Promo-kodlar', path: '/admin/promos', icon: Tag },
    { name: 'Buyurtmalar', path: '/admin/orders', icon: ShoppingCart },
  ];

  const getPageTitle = () => {
    const current = navigation.find(item => pathname?.startsWith(item.path));
    return current ? current.name : 'Admin Panel (Termiz)';
  };

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "uzgo_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "uzgo_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#0F1015] text-[#F5F5F7] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#181A20] transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col border-r border-[#2C303E] shadow-2xl`}
      >
        <div className="flex items-center justify-between h-16 border-b border-[#2C303E] px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#16C2B2] to-[#FFE066] flex items-center justify-center font-black text-[#0F1015] text-sm shadow-md">
              U
            </div>
            <span className="text-lg font-black text-white tracking-wide">
              Uz<span className="text-[#16C2B2]">Go</span> Admin
            </span>
          </div>
          <button 
            className="text-gray-400 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname?.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`group flex items-center px-3 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#16C2B2]/15 text-[#16C2B2] border-l-4 border-[#16C2B2] shadow-md shadow-[#16C2B2]/10' 
                      : 'text-gray-400 hover:bg-[#22252E] hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  <Icon className="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#2C303E]">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2.5 text-xs font-bold text-gray-400 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Tizimdan chiqish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 h-16 bg-[#181A20] border-b border-[#2C303E] flex items-center justify-between px-4 lg:px-8 shadow-sm">
          <div className="flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none lg:hidden mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-white">
                {getPageTitle()}
              </h1>
              <span className="text-[10px] text-[#16C2B2] font-semibold">📍 Termiz, Surxondaryo boshqaruvi</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-[#16C2B2] relative p-2 rounded-xl hover:bg-[#22252E] transition-colors">
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-[#FF5B4C]" />
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-3 border-l border-[#2C303E] pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white">Super Admin</p>
                <p className="text-[10px] text-[#16C2B2]">Termiz Hub</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#16C2B2] text-[#0F1015] font-black flex items-center justify-center text-xs">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0F1015] p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
