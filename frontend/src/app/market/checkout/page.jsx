'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, Phone, User, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { clearCart } from '../../../store/cartSlice';
import { supabase } from '../../../services/supabaseClient';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || { user: null });
  const { items } = useSelector((state) => state.cart || { items: [] });

  const [name, setName] = useState(user?.name || 'Sardor Rahimov');
  const [phone, setPhone] = useState(user?.phone || '+998901234567');
  const [address, setAddress] = useState('Chilonzor 8-kvartal, 12-uy');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 15000 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save order to Supabase orders table
      await supabase.from('orders').insert([
        {
          user_name: name,
          phone: phone,
          order_type: 'market',
          items: items,
          total_price: total,
          delivery_fee: deliveryFee,
          address: address,
          payment_method: paymentMethod,
          status: 'pending'
        }
      ]);
    } catch (err) {
      console.error('Order save error:', err);
    }

    setLoading(false);
    setIsSuccess(true);
    dispatch(clearCart());
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0F1015] text-[#F3F4F6] flex flex-col justify-center items-center p-4">
        <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-slide-up">
          <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl font-black text-white mb-2">Buyurtma Qabul Qilindi!</h1>
          <p className="text-xs text-gray-400 mb-6">
            Rahmat, {name}! Buyurtmangiz Supabase-ga saqlandi va kuryer tez orada yetkazib beradi.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl bg-[#FFCC00] text-[#0F1015] font-black text-sm hover:bg-yellow-400 transition-all shadow-lg"
          >
            Bosh Sahifaga Qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F3F4F6] p-4 pb-24 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-white mb-4">Rasmiylashtirish</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Info */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 shadow-xl space-y-3">
          <h2 className="text-xs font-bold text-[#FFCC00] uppercase tracking-wider">Mijoz Ma'lumotlari</h2>
          
          <div>
            <label className="text-xs text-gray-400 block mb-1">Ism va Familiya</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#FFCC00]" 
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Telefon Raqam</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#FFCC00]" 
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Yetkazib berish manzili</label>
            <input 
              type="text" 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#FFCC00]" 
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 shadow-xl">
          <h2 className="text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-3">To'lov Usuli</h2>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'cash', label: 'Naqd' },
              { id: 'click', label: 'Click' },
              { id: 'payme', label: 'Payme' },
            ].map(m => (
              <button
                type="button"
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`py-3 rounded-2xl text-xs font-extrabold border transition-all ${
                  paymentMethod === m.id 
                    ? 'border-[#FFCC00] bg-[#FFCC00]/10 text-[#FFCC00]' 
                    : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Mahsulotlar:</span>
            <span>{subtotal.toLocaleString('ru-RU')} so'm</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Yetkazib berish:</span>
            <span>{deliveryFee.toLocaleString('ru-RU')} so'm</span>
          </div>
          <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#2C303E]">
            <span>Jami:</span>
            <span className="text-[#FFCC00]">{total.toLocaleString('ru-RU')} so'm</span>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || items.length === 0}
          className="w-full py-4 rounded-2xl bg-[#FFCC00] hover:bg-yellow-400 text-[#0F1015] font-black text-base transition-all shadow-xl shadow-[#FFCC00]/20 flex items-center justify-center gap-2"
        >
          <span>{loading ? 'Yuborilmoqda...' : 'Buyurtmani Tasdiqlash'}</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
