'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Settings, CreditCard, Package, LogOut, ChevronRight, Camera, 
  X, Edit2, Wallet, Globe, Shield, Car, Check, Sparkles, Phone, 
  Sun, Moon, Headphones, ArrowLeft, HeartHandshake, ShieldAlert, Award
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
  const { walletBalance = 85000, cashbackBalance = 14500 } = useWallet() || {};

  const [user, setUser] = useState({
    name: reduxUser?.name || 'Sarvarbek',
    phone: reduxUser?.phone || '+998 90 123 45 67',
    rating: 4.98,
    tripsCount: 42,
    role: reduxUser?.role || 'user'
  });
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "uzgo_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "uzgo_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push('/login');
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editName, phone: editPhone });
    setIsEditModalOpen(false);
    alert("Profil sozlamalari muvaffaqiyatli saqlandi! ✨");
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-[#121214] text-[#121214] dark:text-[#F5F5F7] pb-32 font-sans transition-colors">
      
      {/* Top Header */}
      <div className="max-w-md mx-auto px-4 pt-6 flex justify-between items-center">
        <button
          onClick={() => router.push('/')}
          className="bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 p-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm apple-card-press"
        >
          <ArrowLeft size={16} /> Bosh sahifa
        </button>

        <h1 className="text-base font-black text-[#121214] dark:text-white">
          Foydalanuvchi Profili
        </h1>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-[#121214] dark:hover:text-white rounded-2xl bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 shadow-sm apple-card-press"
        >
          <Edit2 size={16} />
        </button>
      </div>

      <main className="max-w-md mx-auto px-4 pt-5 space-y-4">
        
        {/* User Card */}
        <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-3xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black text-2xl shadow-md border-2 border-black/10">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="absolute -bottom-1 -right-1 bg-black text-[#FCE000] text-[10px] font-black px-1.5 py-0.5 rounded-md">
              ★ {user.rating}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-black text-[#121214] dark:text-white">{user.name}</h2>
            <p className="text-xs text-gray-500 font-medium">{user.phone}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-black px-2 py-0.5 rounded-md">
                {user.tripsCount} ta muvaffaqiyatli safar
              </span>
            </div>
          </div>
        </div>

        {/* UzGo Pay Balance Banner */}
        <div 
          onClick={() => router.push('/wallet')}
          className="bg-gradient-to-br from-[#1E1E22] to-[#121214] text-white rounded-3xl p-5 shadow-lg border border-gray-800 cursor-pointer apple-card-press flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black text-lg">
              <Wallet size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">UzGo Hamyon & Keshbek</span>
              <h3 className="text-lg font-black text-white">{walletBalance.toLocaleString()} so'm</h3>
            </div>
          </div>

          <div className="text-right flex items-center gap-1 text-xs font-black text-[#FCE000]">
            <span>To'ldirish</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Quick Menu List */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-200/80 dark:border-gray-800 p-2 shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
          
          <Link href="/taxi" className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-[#26262A] rounded-2xl transition-colors apple-card-press">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#FCE000]/15 rounded-2xl text-[#121214] dark:text-[#FCE000] flex items-center justify-center">
                <Car size={18} />
              </div>
              <div>
                <h4 className="font-black text-xs text-[#121214] dark:text-white">Taksi Safarlari</h4>
                <p className="text-[10px] text-gray-500">Safarlar tarixi va cheklar</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </Link>

          <Link href="/delivery" className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-[#26262A] rounded-2xl transition-colors apple-card-press">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#10B981]/15 rounded-2xl text-[#10B981] flex items-center justify-center">
                <Package size={18} />
              </div>
              <div>
                <h4 className="font-black text-xs text-[#121214] dark:text-white">Taomlar & Kuryer</h4>
                <p className="text-[10px] text-gray-500">Buyurtmalar va yetkazmalar</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </Link>

          <Link href="/driver" className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-[#26262A] rounded-2xl transition-colors apple-card-press">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#121214] dark:bg-white text-[#FCE000] dark:text-[#121214] rounded-2xl flex items-center justify-center font-black text-xs">
                PRO
              </div>
              <div>
                <h4 className="font-black text-xs text-[#121214] dark:text-white">Yandex Pro Haydovchi Rejimi</h4>
                <p className="text-[10px] text-gray-500">Kassali taxometr va daromadlar</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </Link>

        </div>

        {/* Theme & Preferences */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-200/80 dark:border-gray-800 p-2 shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
          
          <div 
            onClick={() => toggleTheme()}
            className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-[#26262A] rounded-2xl cursor-pointer apple-card-press"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-gray-100 dark:bg-[#26262A] rounded-2xl text-[#FCE000] flex items-center justify-center">
                {isDark ? <Sun size={18} /> : <Moon size={18} className="text-[#121214]" />}
              </div>
              <div>
                <h4 className="font-black text-xs text-[#121214] dark:text-white">Yoritish Rejimi</h4>
                <p className="text-[10px] text-gray-500">{isDark ? 'Qorong\'u (Dark Mode) 🌙' : 'Yoritilgan (Light Mode) ☀️'}</p>
              </div>
            </div>
            <span className="text-[10px] font-black bg-gray-100 dark:bg-[#26262A] px-2.5 py-1 rounded-xl">
              Almashtirish ⇄
            </span>
          </div>

          <div 
            onClick={() => alert("24/7 UzGo qo'llab-quvvatlash xizmati bilan bog'lanish: +998 71 200 00 00")}
            className="flex items-center justify-between p-3.5 hover:bg-gray-50 dark:hover:bg-[#26262A] rounded-2xl cursor-pointer apple-card-press"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-sky-500/15 rounded-2xl text-sky-500 flex items-center justify-center">
                <Headphones size={18} />
              </div>
              <div>
                <h4 className="font-black text-xs text-[#121214] dark:text-white">24/7 Qo'llab-quvvatlash</h4>
                <p className="text-[10px] text-gray-500">Savollar va yordam markazi</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 text-[#FC3F1D] py-4 rounded-3xl font-black text-xs transition-colors flex items-center justify-center gap-2 apple-card-press"
        >
          <LogOut size={16} /> Tizimdan chiqish
        </button>

      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-black text-base text-[#121214] dark:text-white">Profilni tahrirlash</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-black dark:hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Ism Familiya</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white p-3 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-[#FCE000]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Telefon raqam</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white p-3 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-[#FCE000]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 bg-gray-100 dark:bg-[#26262A] text-gray-600 dark:text-gray-300 py-3 rounded-2xl text-xs font-bold"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-[#FCE000] text-[#121214] py-3 rounded-2xl text-xs font-black shadow-md apple-card-press"
              >
                Saqlash ✓
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
