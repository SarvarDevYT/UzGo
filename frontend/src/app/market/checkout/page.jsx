'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, CreditCard, CheckCircle2, ChevronLeft } from 'lucide-react';
import { selectCartTotal, clearCart } from '../../../store/cartSlice';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);

  const [address, setAddress] = useState({ city: 'Toshkent', street: '', house: '' });
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash | click | payme
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartTotal || 15550000;
  const delivery = 20000;
  const total = subtotal + delivery;

  const handleConfirm = () => {
    if (!address.street || !address.house) return;
    
    setIsSuccess(true);
    setTimeout(() => {
      dispatch(clearCart());
      router.push('/market');
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-dark-bg relative">
      <div className="p-4 bg-dark-card border-b border-dark-border z-10 sticky top-0 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full text-dark-text hover:bg-dark-bg transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-dark-text">Buyurtmani rasmiylashtirish</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-xl mx-auto w-full">
        {/* Address Section */}
        <section className="bg-dark-card p-4 rounded-xl border border-dark-border shadow-sm">
          <h2 className="text-lg font-semibold text-dark-text mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-primary-900" /> Yetkazib berish manzili
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-dark-text/70 mb-1 block">Shahar / Tuman</label>
              <input 
                type="text" 
                value={address.city}
                onChange={e => setAddress({...address, city: e.target.value})}
                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text focus:outline-none focus:border-primary-900"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="text-xs text-dark-text/70 mb-1 block">Ko'cha</label>
                <input 
                  type="text"
                  placeholder="Masalan: Navoiy"
                  value={address.street}
                  onChange={e => setAddress({...address, street: e.target.value})}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text focus:outline-none focus:border-primary-900"
                />
              </div>
              <div>
                <label className="text-xs text-dark-text/70 mb-1 block">Uy / Xonadon</label>
                <input 
                  type="text"
                  placeholder="Masalan: 14A"
                  value={address.house}
                  onChange={e => setAddress({...address, house: e.target.value})}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text focus:outline-none focus:border-primary-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className="bg-dark-card p-4 rounded-xl border border-dark-border shadow-sm">
          <h2 className="text-lg font-semibold text-dark-text mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-accent" /> To'lov usuli
          </h2>
          <div className="space-y-3">
            <label className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-[#ffc107] bg-[#ffc107]/10' : 'border-dark-border hover:border-dark-text/30'}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <span className="font-medium text-dark-text">Naqd pul</span>
              </div>
              <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="w-5 h-5 accent-[#ffc107]" />
            </label>
            
            <label className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'click' ? 'border-[#ffc107] bg-[#ffc107]/10' : 'border-dark-border hover:border-dark-text/30'}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span className="font-medium text-dark-text">Click</span>
              </div>
              <input type="radio" name="payment" checked={paymentMethod === 'click'} onChange={() => setPaymentMethod('click')} className="w-5 h-5 accent-[#ffc107]" />
            </label>

            <label className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'payme' ? 'border-[#ffc107] bg-[#ffc107]/10' : 'border-dark-border hover:border-dark-text/30'}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🟢</span>
                <span className="font-medium text-dark-text">Payme</span>
              </div>
              <input type="radio" name="payment" checked={paymentMethod === 'payme'} onChange={() => setPaymentMethod('payme')} className="w-5 h-5 accent-[#ffc107]" />
            </label>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-dark-card p-4 rounded-xl border border-dark-border shadow-sm">
          <h2 className="text-lg font-semibold text-dark-text mb-4">Xulosa</h2>
          <div className="space-y-2 text-sm text-dark-text/80 mb-4">
            <div className="flex justify-between">
              <span>Mahsulotlar narxi:</span>
              <span>{new Intl.NumberFormat('uz-UZ').format(subtotal)} so'm</span>
            </div>
            <div className="flex justify-between">
              <span>Yetkazib berish:</span>
              <span>{new Intl.NumberFormat('uz-UZ').format(delivery)} so'm</span>
            </div>
          </div>
          <div className="pt-3 border-t border-dark-border flex justify-between font-bold text-lg">
            <span className="text-dark-text">Jami:</span>
            <span className="text-accent">{new Intl.NumberFormat('uz-UZ').format(total)} so'm</span>
          </div>
        </section>
      </div>

      <div className="p-4 bg-dark-card border-t border-dark-border mt-auto z-10 max-w-xl mx-auto w-full">
        <button 
          onClick={handleConfirm}
          disabled={!address.street || !address.house}
          className="w-full bg-[#1a237e] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#283593] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#1a237e]/30"
        >
          Buyurtmani tasdiqlash
        </button>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-dark-card rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-dark-border animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-dark-text mb-2">Buyurtmangiz qabul qilindi!</h2>
            <p className="text-dark-text/70 mb-6">Tez orada kuryerimiz siz bilan bog'lanadi.</p>
            <div className="inline-block border-2 border-accent/30 rounded-full px-4 py-2 text-sm font-semibold text-accent animate-pulse">
              Bosh sahifaga qaytilmoqda...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
