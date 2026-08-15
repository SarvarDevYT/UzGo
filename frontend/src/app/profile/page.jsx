'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Settings, 
  CreditCard, 
  Package, 
  LogOut, 
  ChevronRight, 
  Camera, 
  X,
  Edit2,
  Wallet,
  Globe,
  Shield,
  Car,
  Check,
  Sparkles,
  Phone,
  Sun,
  Moon
} from 'lucide-react';
import { logout } from '../../store/authSlice';
import { useLanguage } from '../../context/LanguageContext';
import { useWallet } from '../../context/WalletContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { lang, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const reduxUser = useSelector((state) => state.auth?.user);
  const { walletBalance, cashbackBalance } = useWallet() || { walletBalance: 150000, cashbackBalance: 25000 };

  const [user, setUser] = useState({
    name: reduxUser?.name || 'Sarvarbek (Termiz)',
    phone: reduxUser?.phone || '+998 90 123 45 67',
    role: reduxUser?.role || 'user'
  });
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "uzgo_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "uzgo_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push('/login');
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editName, phone: editPhone });
    setIsEditModalOpen(false);
    alert("Profil sozlamalari saqlandi! ✨");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0F1015] text-[#111827] dark:text-[#F5F5F7] pb-28 font-sans transition-colors">
      {/* Header Profile Section */}
      <div className="bg-white dark:bg-[#181A20] border-b border-gray-100 dark:border-gray-800 pt-10 pb-8 px-4 relative overflow-hidden shadow-sm">
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-[#0F1015] dark:bg-white text-[#F59E0B] dark:text-[#0F1015] flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800">
              <span className="text-4xl font-black">
                {getInitial(user.name)}
              </span>
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-200 hover:text-[#F59E0B] transition-colors shadow-sm apple-card-press">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-4 text-center flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F1015] dark:text-white">{user.name}</h1>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-[#F59E0B] rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors apple-card-press"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1 mt-1">
            <Phone className="w-3 h-3 text-[#F59E0B]" /> {user.phone}
          </p>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-4">
        {/* Wallet & Balance Overview Card */}
        <div className="bg-gradient-to-br from-[#0F1015] via-[#1C1E26] to-[#0F1015] text-white rounded-3xl p-5 shadow-xl border border-gray-800 relative overflow-hidden space-y-4">
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2 text-xs font-black text-[#F59E0B]">
              <Wallet className="w-4 h-4" />
              <span>UzGo Hamyon</span>
            </div>
            <button 
              onClick={() => router.push('/wallet')}
              className="text-[10px] bg-[#F59E0B] text-[#0F1015] font-black px-3 py-1 rounded-xl shadow-sm hover:scale-105 transition-transform"
            >
              To'ldirish +
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10 pt-1">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Asosiy Balans</p>
              <h2 className="text-xl font-black text-white">{walletBalance.toLocaleString('ru-RU')} so'm</h2>
            </div>
            <div>
              <p className="text-[10px] text-amber-400 font-bold uppercase">Keshbek Balans</p>
              <h2 className="text-xl font-black text-[#F59E0B]">{cashbackBalance.toLocaleString('ru-RU')} so'm</h2>
            </div>
          </div>
        </div>

        {/* Quick Services Menu */}
        <div className="bg-white dark:bg-[#181A20] rounded-3xl border border-gray-200/80 dark:border-gray-800 p-2 shadow-[0_8px_25px_rgba(0,0,0,0.03)] divide-y divide-gray-100 dark:divide-gray-800">
          <Link href="/taxi" className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors group apple-card-press">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[#F59E0B] flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F1015] dark:text-white group-hover:text-[#F59E0B] transition-colors">Taksi Safarlari</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Safarlar tarixi va faol buyurtmalar</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-[#F59E0B] transition-all" />
          </Link>

          <Link href="/market/cart" className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors group apple-card-press">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-500 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F1015] dark:text-white group-hover:text-[#F59E0B] transition-colors">UzGo Market Savati</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Savat va buyurtmalar tarixi</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-[#F59E0B] transition-all" />
          </Link>
        </div>

        {/* Theme Switcher */}
        <div className="bg-white dark:bg-[#181A20] rounded-3xl border border-gray-200/80 dark:border-gray-800 p-2 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          <div 
            onClick={() => toggleTheme()}
            className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors cursor-pointer group apple-card-press"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[#F59E0B] flex items-center justify-center shrink-0">
                {isDark ? <Sun className="w-5 h-5 text-[#F59E0B]" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F1015]">Yoritish Rejimi</h3>
                <p className="text-[11px] text-gray-500 font-extrabold">{isDark ? 'Qorong\'u (Dark Mode) 🌙' : 'Yoritilgan (Light Mode) ☀️'}</p>
              </div>
            </div>
            <span className="text-xs font-black text-[#0F1015] bg-gray-100 border border-gray-200 px-3 py-1 rounded-xl">
              Almashtirish ⇄
            </span>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-2 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          <div 
            onClick={toggleLanguage}
            className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group apple-card-press"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F1015]">Ilova Tili</h3>
                <p className="text-[11px] text-[#D97706] font-extrabold">{lang === 'uz' ? 'O\'zbek tili 🇺🇿' : 'Русский язык 🇷🇺'}</p>
              </div>
            </div>
            <span className="text-xs font-black text-[#0F1015] bg-gray-100 border border-gray-200 px-3 py-1 rounded-xl">
              Almashtirish ⇄
            </span>
          </div>
        </div>

        {/* Admin Panel Link (If admin) */}
        {user.role === 'admin' && (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-2 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
            <Link href="/admin/dashboard" className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group apple-card-press">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-600 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#0F1015]">Super Admin Panel</h3>
                  <p className="text-[11px] text-emerald-600 font-bold">Termiz platforma boshqaruvi</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-all" />
            </Link>
          </div>
        )}

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-6 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-3xl p-4 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm apple-card-press"
        >
          <LogOut className="w-4 h-4" />
          Tizimdan Chiqish
        </button>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="text-base font-black text-[#0F1015]">Profil Sozlamalarini Tahrirlash</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">
                  Ismingiz
                </label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[#0F1015] text-xs outline-none focus:border-[#F59E0B] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">
                  Telefon Raqami
                </label>
                <input 
                  type="text" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[#0F1015] text-xs outline-none focus:border-[#F59E0B] font-medium"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-100 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl text-xs"
                >
                  Bekor qilish
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#0F1015] text-[#F59E0B] font-black rounded-xl py-3 text-xs shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

