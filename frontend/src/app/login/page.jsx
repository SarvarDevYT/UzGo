'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowRight, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { sendOTP, verifyOTP, setAuth } from '../../store/authSlice';

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length < 9) {
      setError('Iltimos, to\'g\'ri telefon raqam kiriting');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await dispatch(sendOTP(`+998${phone}`)).unwrap();
      setLoading(false);
      setStep(2);
      setCountdown(30);
    } catch {
      // Fallback for demo
      setLoading(false);
      setStep(2);
      setCountdown(30);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length < 6) {
      setError('Kodni to\'liq kiriting');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(verifyOTP({ phone: `+998${phone}`, otp: otpCode })).unwrap();
      setLoading(false);
      router.push('/');
    } catch {
      // Demo login fallback
      setLoading(false);
      if (otpCode === '123456') {
        const mockUser = { id: 'u1', name: 'Sultonbek', phone: `+998${phone}`, role: 'customer' };
        dispatch(setAuth({ user: mockUser, token: 'demo_token_123' }));
        router.push('/');
      } else {
        setError('Noto\'g\'ri kod kiritildi (Demo: 123456)');
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#1a237e] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#ffc107] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl p-8 shadow-2xl relative z-10 animate-slide-up">
        
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-900/20 mb-4 animate-pulse-slow">
            <span className="text-4xl font-extrabold text-accent">UG</span>
          </div>
          <h1 className="text-3xl font-bold text-dark-text tracking-tight">UzGo</h1>
          <p className="text-dark-muted mt-2">Super ilovaga xush kelibsiz</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-900/50 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text ml-1">
                Telefon raqamingiz
              </label>
              <div className="flex bg-dark-bg rounded-xl border border-dark-border focus-within:border-primary-900 focus-within:ring-1 focus-within:ring-primary-900 transition-all duration-300 overflow-hidden">
                <div className="flex items-center px-4 bg-dark-card border-r border-dark-border gap-2">
                  <span className="text-xl">🇺🇿</span>
                  <span className="text-dark-text font-medium">+998</span>
                </div>
                <input
                  type="tel"
                  maxLength={9}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="90 123 45 67"
                  className="flex-1 bg-transparent px-4 py-4 text-dark-text focus:outline-none w-full"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || phone.length < 9}
              className="w-full bg-[#1a237e] hover:bg-[#283593] text-white rounded-xl py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-[#1a237e]/30"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  SMS kod yuborish
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-green-900/20 mb-2">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-dark-text text-lg">
                +998 {phone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')}
              </p>
              <p className="text-sm text-dark-muted">
                Raqamga tasdiqlash kodi yuborildi
              </p>
            </div>

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-primary-900 focus:ring-1 focus:ring-primary-900 focus:outline-none transition-all"
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-xs text-accent/80 bg-accent/10 py-1 px-3 rounded-full inline-block mb-4">
                Demo uchun: 123456 kodni ishlating
              </p>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading || otp.join('').length < 6}
                className="w-full bg-[#1a237e] hover:bg-[#283593] text-white rounded-xl py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#1a237e]/30"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Tasdiqlash'}
              </button>

              <button
                type="button"
                onClick={() => setCountdown(30)}
                disabled={countdown > 0}
                className="w-full py-3 text-sm font-medium text-dark-muted hover:text-dark-text transition-colors disabled:opacity-50"
              >
                {countdown > 0
                  ? `Kodni qayta yuborish (${countdown}s)`
                  : 'Kodni qayta yuborish'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
