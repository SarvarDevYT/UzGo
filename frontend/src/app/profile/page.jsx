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
  Edit2
} from 'lucide-react';
import { logout } from '../../store/authSlice';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.auth?.user);

  const [user, setUser] = useState({
    name: reduxUser?.name || 'Sultonbek Jumayev',
    phone: reduxUser?.phone || '+998 90 123 45 67',
  });
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editName });
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text pb-24">
      {/* Header Profile Section */}
      <div className="bg-dark-card border-b border-dark-border pt-12 pb-8 px-4 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a237e] rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
        
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center animate-fade-in">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-900/20 border-4 border-dark-bg">
              <span className="text-4xl font-bold text-white shadow-sm">
                {getInitial(user.name)}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 p-2.5 bg-dark-card border border-dark-border rounded-full text-dark-text hover:text-accent transition-colors shadow-lg">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-5 text-center flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 text-dark-muted hover:text-accent rounded-full bg-dark-bg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-dark-muted font-medium mt-1">{user.phone}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8 space-y-4 animate-slide-up">
        {/* Orders Section */}
        <div className="bg-dark-card rounded-2xl border border-dark-border p-2">
          <Link href="/market/cart" className="flex items-center justify-between p-4 hover:bg-dark-bg rounded-xl transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-900/20 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Mening buyurtmalarim</h3>
                <p className="text-sm text-dark-muted">Buyurtmalar tarixi va savat</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-dark-muted group-hover:text-dark-text group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Payment Methods */}
        <div className="bg-dark-card rounded-2xl border border-dark-border p-2">
          <div className="flex items-center justify-between p-4 hover:bg-dark-bg rounded-xl transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-900/20 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">To'lov usullari</h3>
                <p className="text-sm text-dark-muted">Click, Payme ulangan</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-dark-muted group-hover:text-dark-text group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Settings */}
        <div className="bg-dark-card rounded-2xl border border-dark-border p-2">
          <div className="flex items-center justify-between p-4 hover:bg-dark-bg rounded-xl transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/20 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Sozlamalar</h3>
                <p className="text-sm text-dark-muted">Til, xabarnomalar</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-dark-muted group-hover:text-dark-text group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-8 bg-red-900/10 hover:bg-red-900/20 border border-red-900/30 text-red-500 rounded-2xl p-4 font-semibold text-lg transition-all flex items-center justify-center gap-2 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Tizimdan chiqish
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-sm p-6 shadow-2xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Profilni tahrirlash</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-dark-muted hover:text-dark-text p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-dark-muted mb-1.5 block">
                  Ismingiz
                </label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:border-primary-900 focus:ring-1 focus:ring-primary-900 focus:outline-none transition-colors"
                  placeholder="Ismingizni kiriting"
                />
              </div>
              
              <button 
                onClick={handleSaveProfile}
                className="w-full bg-[#1a237e] hover:bg-[#283593] text-white rounded-xl py-3.5 font-semibold mt-4 transition-colors"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
