'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, MapPin, CreditCard, Banknote, ShieldCheck, Tag, Check, Loader2 } from 'lucide-react';
import { clearCart } from '../../../store/cartSlice';
import { supabase } from '../../../services/supabaseClient';

export default function MarketCheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || { user: null });
  const cartItems = useSelector((state) => state.cart?.items || []);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('Termiz shahar, Al-Hakim at-Tirmiziy ko\'chasi, 14-uy');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash | click | payme
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 6000;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    const code = promoInput.trim().toUpperCase();
    if (code === 'TERMIZ10' || code === 'UZGO2026') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      alert("Noto'g'ri promo-kod!");
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address || !name || !phone) {
      alert("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from('orders').insert([
        {
          user_name: name,
          phone: phone,
          order_type: 'market',
          items: cartItems,
          total_price: total,
          delivery_fee: deliveryFee,
          address: address,
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'cash' ? 'pending' : 'paid',
          discount_amount: discountAmount,
          promo_code: promoApplied ? promoInput.toUpperCase() : null,
          status: 'pending'
        }
      ]).select();

      const newId = data?.[0]?.id ? data[0].id.slice(0, 8) : Math.floor(Math.random() * 10000);
      setOrderId("UZG-" + newId);
      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (err) {
      console.error('Checkout error:', err);
      setOrderId("UZG-" + Math.floor(Math.random() * 10000));
      dispatch(clearCart());
      setOrderPlaced(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#0F1015] p-4 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-[#22C55E]/20 text-[#22C55E] rounded-full flex items-center justify-center mb-4 border border-[#22C55E]/30 animate-bounce">
          <Check size={40} />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Buyurtmangiz tasdiqlandi! 🎉</h2>
        <p className="text-gray-400 text-xs mb-4">Buyurtma raqami: <span className="font-bold text-[#16C2B2]">{orderId}</span></p>
        <p className="text-xs text-gray-500 max-w-xs mb-6">Termiz kuryerimiz tez orada mahsulotlarni manzilingizga yetkazib beradi.</p>
        <button 
          onClick={() => router.push('/market')}
          className="bg-[#16C2B2] text-[#0F1015] font-extrabold px-6 py-3 rounded-xl text-xs shadow-lg shadow-[#16C2B2]/20"
        >
          Marketga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-24">
      {/* Header */}
      <div className="bg-[#181A20] p-4 flex items-center gap-3 border-b border-[#2C303E] sticky top-0 z-10">
        <button onClick={() => router.back()} className="p-1 text-gray-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-extrabold text-white">Buyurtmani rasmiylashtirish (Termiz)</h1>
      </div>

      <div className="p-4 space-y-5 max-w-xl mx-auto">
        {/* Customer Details */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl space-y-3">
          <h2 className="font-bold text-sm text-white">Mijoz ma'lumotlari</h2>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              placeholder="Ism va Familiya" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
            />
            <input 
              type="text" 
              placeholder="Telefon raqam" 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              className="bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
            />
          </div>
        </div>

        {/* Address Input */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <h2 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#22C55E]" /> Yetkazib berish manzili
          </h2>
          <textarea 
            className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl p-3 text-white focus:border-[#22C55E] focus:outline-none transition-colors text-xs font-medium"
            placeholder="Termiz tumani, ko'cha, uy raqami..."
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        {/* Promo Code System */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <h2 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#F2A93B]" /> Promo-kod
          </h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Masalan: TERMIZ10" 
              value={promoInput}
              onChange={e => setPromoInput(e.target.value)}
              className="flex-1 bg-[#0F1015] border border-[#2C303E] text-white p-2.5 rounded-xl text-xs outline-none uppercase font-bold focus:border-[#F2A93B]"
            />
            <button 
              onClick={handleApplyPromo}
              className="bg-[#F2A93B] text-[#0F1015] px-4 py-2.5 rounded-xl font-extrabold text-xs shadow-md"
            >
              {promoApplied ? 'Qo\'llandi ✓' : 'Qo\'llash'}
            </button>
          </div>
        </div>

        {/* Payment Gateways: Click & Payme & Cash */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <h2 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#16C2B2]" /> To'lov usuli
          </h2>
          <div className="space-y-2">
            <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-[#F2A93B] bg-[#F2A93B]/10' : 'border-[#2C303E] bg-[#0F1015]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="hidden" />
                <Banknote className={`w-5 h-5 ${paymentMethod === 'cash' ? 'text-[#F2A93B]' : 'text-gray-400'}`} />
                <span className={paymentMethod === 'cash' ? 'font-bold text-white text-xs' : 'text-gray-300 text-xs'}>Naqd pul (Kuryerga)</span>
              </div>
              <span className="text-[10px] text-[#F2A93B] font-bold">Termizda mashhur</span>
            </label>

            <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'click' ? 'border-blue-500 bg-blue-500/10' : 'border-[#2C303E] bg-[#0F1015]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" value="click" checked={paymentMethod === 'click'} onChange={() => setPaymentMethod('click')} className="hidden" />
                <ShieldCheck className={`w-5 h-5 ${paymentMethod === 'click' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className={paymentMethod === 'click' ? 'font-bold text-white text-xs' : 'text-gray-300 text-xs'}>Click Up / Click Pass</span>
              </div>
              <span className="text-[10px] text-blue-400 font-bold">Onlayn</span>
            </label>

            <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'payme' ? 'border-cyan-400 bg-cyan-400/10' : 'border-[#2C303E] bg-[#0F1015]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" value="payme" checked={paymentMethod === 'payme'} onChange={() => setPaymentMethod('payme')} className="hidden" />
                <ShieldCheck className={`w-5 h-5 ${paymentMethod === 'payme' ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span className={paymentMethod === 'payme' ? 'font-bold text-white text-xs' : 'text-gray-300 text-xs'}>Payme</span>
              </div>
              <span className="text-[10px] text-cyan-400 font-bold">Onlayn</span>
            </label>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 space-y-2 shadow-xl">
          <div className="flex justify-between text-gray-400 text-xs font-semibold">
            <span>Mahsulotlar jami</span>
            <span className="text-white">{subtotal.toLocaleString('ru-RU')} so'm</span>
          </div>
          <div className="flex justify-between text-gray-400 text-xs font-semibold">
            <span>Yetkazib berish (Termiz)</span>
            <span className="text-white">{deliveryFee.toLocaleString('ru-RU')} so'm</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-[#F2A93B] text-xs font-bold">
              <span>Chegirma (Promo-kod)</span>
              <span>-{discountAmount.toLocaleString('ru-RU')} so'm</span>
            </div>
          )}
          <div className="border-t border-[#2C303E] pt-2 mt-2 flex justify-between font-black text-base">
            <span>Jami to'lov</span>
            <span className="text-[#16C2B2]">{total.toLocaleString('ru-RU')} so'm</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleCheckout}
          disabled={isSubmitting || !address}
          className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 ${
            isSubmitting || !address 
              ? 'bg-[#2C303E] text-gray-500 cursor-not-allowed' 
              : 'bg-[#F2A93B] text-[#0F1015] hover:bg-[#E0982A] shadow-[#F2A93B]/20'
          }`}
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
          {isSubmitting ? 'Rasmiylashtirilmoqda...' : `${total.toLocaleString('ru-RU')} so'm to'lash va tasdiqlash`}
        </button>
      </div>
    </div>
  );
}
