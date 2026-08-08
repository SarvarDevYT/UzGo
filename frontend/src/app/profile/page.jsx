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
  Phone
} from 'lucide-react';
import { logout } from '../../store/authSlice';
import { useLanguage } from '../../context/LanguageContext';
import { useWallet } from '../../context/WalletContext';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { lang, toggleLanguage, t } = useLanguage();
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
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-24 font-sans">
      {/* Header Profile Section */}
      <div className="bg-[#181A20] border-b border-[#2C303E] pt-10 pb-8 px-4 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#16C2B2] rounded-full filter blur-[120px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#16C2B2] via-[#20E3D1] to-[#FFE066] flex items-center justify-center shadow-xl shadow-[#16C2B2]/20 border-4 border-[#0F1015]">
              <span className="text-4xl font-black text-[#0F1015]">
                {getInitial(user.name)}
              </span>
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-[#181A20] border border-[#2C303E] rounded-2xl text-white hover:text-[#16C2B2] transition-colors shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-4 text-center flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">{user.name}</h1>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 text-gray-400 hover:text-[#16C2B2] rounded-xl bg-[#0F1015] border border-[#2C303E] transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400 font-medium">{user.phone}</span>
            <span className="bg-[#16C2B2]/20 text-[#16C2B2] border border-[#16C2B2]/40 text-[9px] px-2 py-0.5 rounded-full font-black uppercase">
              {user.role === 'admin' ? 'Super Admin' : user.role === 'driver' ? 'Haydovchi' : 'Mijoz'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">

        {/* UzGo Wallet Card */}
        <div className="bg-gradient-to-br from-[#181A20] via-[#1F2330] to-[#181A20] rounded-3xl border border-[#2C303E] p-5 shadow-2xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-[#16C2B2]/15 border border-[#16C2B2]/30 flex items-center justify-center text-[#16C2B2]">
                <Wallet size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">UzGo Hamyon Balansi</h3>
                <span className="text-[10px] text-[#F2A93B] font-bold flex items-center gap-1">
                  <Sparkles size={10} /> +{(cashbackBalance || 0).toLocaleString('ru-RU')} so'm Keshbek
                </span>
              </div>
            </div>
            <Link 
              href="/wallet"
              className="bg-[#16C2B2] text-[#0F1015] font-black text-xs px-3.5 py-2 rounded-xl shadow-md shadow-[#16C2B2]/20"
            >
              Boshqarish
            </Link>
          </div>
          <div className="text-2xl font-black text-white">
            {(walletBalance || 0).toLocaleString('ru-RU')} <span className="text-xs text-gray-400 font-medium">so'm</span>
          </div>
        </div>

        {/* Driver Mode Button */}
        <div className="bg-[#181A20] rounded-3xl border border-[#2C303E] p-2 shadow-xl">
          <Link href="/driver" className="flex items-center justify-between p-3.5 hover:bg-[#22252E] rounded-2xl transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#FF5B4C]/15 border border-[#FF5B4C]/30 rounded-2xl text-[#FF5B4C] flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">Haydovchi va Kuryer Rejimi</h3>
                <p className="text-[11px] text-gray-400">Buyurtmalarni qabul qilish va daromad</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" />
          </Link>
        </div>

        {/* Orders Section */}
        <div className="bg-[#181A20] rounded-3xl border border-[#2C303E] p-2 shadow-xl">
          <Link href="/market/cart" className="flex items-center justify-between p-3.5 hover:bg-[#22252E] rounded-2xl transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-blue-500/15 border border-blue-500/30 rounded-2xl text-blue-400 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">Mening Buyurtmalarim</h3>
                <p className="text-[11px] text-gray-400">Savat va buyurtmalar tarixi</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" />
          </Link>
        </div>

        {/* Language Switcher */}
        <div className="bg-[#181A20] rounded-3xl border border-[#2C303E] p-2 shadow-xl">
          <div 
            onClick={toggleLanguage}
            className="flex items-center justify-between p-3.5 hover:bg-[#22252E] rounded-2xl transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-purple-500/15 border border-purple-500/30 rounded-2xl text-purple-400 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">Ilova Tili</h3>
                <p className="text-[11px] text-[#16C2B2] font-bold">{lang === 'uz' ? 'O\'zbek tili 🇺🇿' : 'Русский язык 🇷🇺'}</p>
              </div>
            </div>
            <span className="text-xs font-black text-[#16C2B2] bg-[#16C2B2]/15 border border-[#16C2B2]/30 px-3 py-1 rounded-xl">
              Almashtirish ⇄
            </span>
          </div>
        </div>

        {/* Admin Panel Link (If admin) */}
        {user.role === 'admin' && (
          <div className="bg-[#181A20] rounded-3xl border border-[#2C303E] p-2 shadow-xl">
            <Link href="/admin/dashboard" className="flex items-center justify-between p-3.5 hover:bg-[#22252E] rounded-2xl transition-colors group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-amber-500/15 border border-amber-500/30 rounded-2xl text-amber-400 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Super Admin Panel</h3>
                  <p className="text-[11px] text-amber-400 font-bold">Termiz platforma boshqaruvi</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" />
            </Link>
          </div>
        )}

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-3xl p-4 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl"
        >
          <LogOut className="w-4 h-4" />
          Tizimdan Chiqish
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#2C303E] pb-3">
              <h2 className="text-base font-black text-white">Profil Sozlamalarini Tahrirlash</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-400 mb-1 block">
                  Ismingiz
                </label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl p-3 text-white text-xs outline-none focus:border-[#16C2B2]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 mb-1 block">
                  Telefon Raqami
                </label>
                <input 
                  type="text" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl p-3 text-white text-xs outline-none focus:border-[#16C2B2]"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-[#0F1015] border border-[#2C303E] text-gray-400 font-bold py-3 rounded-xl text-xs"
                >
                  Bekor qilish
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#16C2B2] text-[#0F1015] font-black rounded-xl py-3 text-xs shadow-lg shadow-[#16C2B2]/20"
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
