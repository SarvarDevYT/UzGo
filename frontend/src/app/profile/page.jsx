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
    <div className="min-h-screen bg-[#FAFAFC] text-[#111827] pb-28 font-sans">
      {/* Header Profile Section */}
      <div className="bg-white border-b border-gray-100 pt-10 pb-8 px-4 relative overflow-hidden shadow-sm">
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-[#0F1015] text-[#F59E0B] flex items-center justify-center shadow-xl border-4 border-white">
              <span className="text-4xl font-black">
                {getInitial(user.name)}
              </span>
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-white border border-gray-200 rounded-2xl text-gray-700 hover:text-[#F59E0B] transition-colors shadow-sm apple-card-press">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-4 text-center flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F1015]">{user.name}</h1>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 text-gray-500 hover:text-[#F59E0B] rounded-xl bg-gray-100 border border-gray-200 transition-colors apple-card-press"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 font-semibold">{user.phone}</span>
            <span className="bg-[#0F1015] text-[#F59E0B] text-[9px] px-2 py-0.5 rounded-full font-black uppercase shadow-sm">
              {user.role === 'admin' ? 'Super Admin' : user.role === 'driver' ? 'Haydovchi' : 'Mijoz'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">

        {/* UzGo Wallet Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
                <Wallet size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F1015]">UzGo Hamyon Balansi</h3>
                <span className="text-[10px] text-[#D97706] font-bold flex items-center gap-1">
                  <Sparkles size={10} /> +{(cashbackBalance || 0).toLocaleString('ru-RU')} so'm Keshbek
                </span>
              </div>
            </div>
            <Link 
              href="/wallet"
              className="bg-[#0F1015] text-[#F59E0B] font-black text-xs px-3.5 py-2 rounded-2xl shadow-sm apple-card-press"
            >
              Boshqarish
            </Link>
          </div>
          <div className="text-2xl font-black text-[#0F1015]">
            {(walletBalance || 0).toLocaleString('ru-RU')} <span className="text-xs text-gray-400 font-medium">so'm</span>
          </div>
        </div>

        {/* Driver Mode Button */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-2 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          <Link href="/driver" className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group apple-card-press">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[#F59E0B] flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F1015]">Haydovchi va Kuryer Rejimi</h3>
                <p className="text-[11px] text-gray-500">Buyurtmalarni qabul qilish va daromad</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-all" />
          </Link>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-2 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          <Link href="/market/cart" className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group apple-card-press">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-600 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F1015]">Mening Buyurtmalarim</h3>
                <p className="text-[11px] text-gray-500">Savat va buyurtmalar tarixi</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-all" />
          </Link>
        </div>

        {/* Theme Switcher */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-2 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          <div 
            onClick={() => toggleTheme()}
            className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group apple-card-press"
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
          className="w-full mt-6 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-3xl p-4 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm apple-card-press"
        >
          <LogOut className="w-4 h-4" />
          Tizimdan Chiqish
        </button>
      </div>

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

