'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Phone, ArrowRight, ShieldCheck, User, Sparkles } from 'lucide-react';
import { setCredentials } from '../../store/authSlice';
import { supabase } from '../../services/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [step, setStep] = useState('register'); // register | otp
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name || name.trim().length < 2) {
      alert('Iltimos to\'liq ismingizni kiriting');
      return;
    }
    if (!phone || phone.length < 9) {
      alert('Iltimos to\'g\'ri telefon raqam kiriting');
      return;
    }
    setStep('otp');
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upsert profile in Supabase PostgreSQL database
      const { data: profile, error } = await supabase
        .from('profiles')
        .upsert([
          { phone: phone.trim(), name: name.trim(), role: 'customer' }
        ], { onConflict: 'phone' })
        .select()
        .single();

      const userObj = {
        id: profile?.id || 'usr_101',
        name: name.trim(),
        phone: phone.trim(),
        role: 'customer',
      };

      dispatch(setCredentials({
        user: userObj,
        token: `uzgo_jwt_token_${Date.now()}`
      }));

      // Redirect to home page
      router.push('/');
    } catch (err) {
      console.error('Supabase auth error:', err);
      // Fallback local registration
      dispatch(setCredentials({
        user: { id: 'usr_101', name: name.trim(), phone: phone.trim(), role: 'customer' },
        token: 'uzgo_mock_token'
      }));
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F3F4F6] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFCC00] rounded-full filter blur-[150px] opacity-15 pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#181A20] border border-[#2C303E] rounded-3xl p-8 shadow-2xl relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFCC00] to-[#FC3F1D] flex items-center justify-center shadow-lg shadow-[#FFCC00]/25 font-black text-[#0F1015] text-2xl mb-3">
            GO
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">UzGo-ga Xush Kelibsiz</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Xizmatlardan foydalanish uchun ro'yxatdan o'ting
          </p>
        </div>

        {step === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1.5 flex items-center gap-1">
                <User size={14} className="text-[#FFCC00]" /> Ismingiz va Familiyangiz
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: Sardor Rahimov"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0F1015] border border-[#2C303E] focus:border-[#FFCC00] rounded-2xl px-4 py-3.5 text-white font-medium text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1.5 flex items-center gap-1">
                <Phone size={14} className="text-[#FFCC00]" /> Telefon Raqamingiz
              </label>
              <input
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0F1015] border border-[#2C303E] focus:border-[#FFCC00] rounded-2xl px-4 py-3.5 text-white font-medium text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#FFCC00] hover:bg-yellow-400 text-[#0F1015] font-black text-sm transition-all shadow-xl shadow-[#FFCC00]/20 flex items-center justify-center gap-2 mt-4"
            >
              <span>Davom etish</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="bg-[#0F1015] p-3.5 rounded-2xl border border-[#2C303E] text-center mb-4">
              <span className="text-xs text-gray-400">Tasdiqlash kodi yuborildi:</span>
              <div className="font-extrabold text-white text-sm">{phone}</div>
              <div className="text-[10px] text-[#FFCC00] mt-1 font-bold">Test kodi: 123456</div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1.5 text-center">
                SMS Kodingizni kiriting
              </label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-[#0F1015] border border-[#2C303E] focus:border-[#FFCC00] rounded-2xl px-4 py-3.5 text-white font-bold text-center tracking-widest text-lg outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#FFCC00] hover:bg-yellow-400 text-[#0F1015] font-black text-sm transition-all shadow-xl shadow-[#FFCC00]/20 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Tasdiqlanmoqda...' : 'Kirish va Saqlash'}
            </button>

            <button
              type="button"
              onClick={() => setStep('register')}
              className="w-full text-center text-xs text-gray-400 hover:text-white mt-2 font-medium"
            >
              ← Ma'lumotlarni o'zgartirish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
