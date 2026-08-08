'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import OrderTracker from '../../../components/OrderTracker';

export default function DeliveryCheckoutPage() {
  const router = useRouter();
  
  const [cart] = useState([
    { id: 'm1', name: 'Margarita Pizza', price: 45000, quantity: 1 },
    { id: 'm2', name: 'Pepperoni Pizza', price: 52000, quantity: 1 }
  ]);
  const storeName = "Toshkent Pizza";
  const deliveryFee = 5000;
  
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address) {
      alert("Iltimos, manzilni kiriting");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setOrderId("UZG-" + Math.floor(Math.random() * 10000));
      setOrderPlaced(true);
      setIsSubmitting(false);
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#0F1015] p-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-white mb-6 text-center">Buyurtmangiz qabul qilindi! 🎉</h2>
        <OrderTracker orderId={orderId} onClose={() => router.push('/delivery')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-20">
      {/* Header */}
      <div className="bg-[#181A20] p-4 flex items-center gap-3 border-b border-[#2C303E] sticky top-0 z-10">
        <button onClick={() => router.back()} className="p-1 text-gray-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-extrabold text-white">Buyurtmani rasmiylashtirish</h1>
      </div>

      <div className="p-4 space-y-6 max-w-xl mx-auto">
        {/* Order Items */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <h2 className="font-extrabold text-lg text-white mb-3">{storeName}</h2>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm font-medium">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-black text-[#16C2B2]">{item.price.toLocaleString('ru-RU')} so'm</span>
              </div>
            ))}
          </div>
        </div>

        {/* Address Input */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <h2 className="font-bold mb-3 flex items-center gap-2 text-white">
            <MapPin className="w-5 h-5 text-[#22C55E]" /> Yetkazib berish manzili
          </h2>
          <textarea 
            className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl p-3 text-white focus:border-[#22C55E] focus:outline-none transition-colors text-sm font-medium"
            placeholder="Shahar, tuman, ko'cha, uy raqami..."
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <h2 className="font-bold mb-3 flex items-center gap-2 text-white">
            <CreditCard className="w-5 h-5 text-[#16C2B2]" /> To'lov usuli
          </h2>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-[#F2A93B] bg-[#F2A93B]/10' : 'border-[#2C303E] bg-[#0F1015]'}`}>
              <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="hidden" />
              <Banknote className={`w-5 h-5 ${paymentMethod === 'cash' ? 'text-[#F2A93B]' : 'text-gray-400'}`} />
              <span className={paymentMethod === 'cash' ? 'font-bold text-white' : 'text-gray-300'}>Naqd pul (Kuryerga)</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'click' ? 'border-blue-500 bg-blue-500/10' : 'border-[#2C303E] bg-[#0F1015]'}`}>
              <input type="radio" name="payment" value="click" checked={paymentMethod === 'click'} onChange={() => setPaymentMethod('click')} className="hidden" />
              <ShieldCheck className={`w-5 h-5 ${paymentMethod === 'click' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className={paymentMethod === 'click' ? 'font-bold text-white' : 'text-gray-300'}>Click orqali</span>
            </label>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 space-y-2 shadow-xl">
          <div className="flex justify-between text-gray-400 text-xs font-semibold">
            <span>Mahsulotlar narxi</span>
            <span className="text-white">{subtotal.toLocaleString('ru-RU')} so'm</span>
          </div>
          <div className="flex justify-between text-gray-400 text-xs font-semibold">
            <span>Yetkazib berish</span>
            <span className="text-white">{deliveryFee.toLocaleString('ru-RU')} so'm</span>
          </div>
          <div className="border-t border-[#2C303E] pt-2 mt-2 flex justify-between font-black text-base">
            <span>Jami</span>
            <span className="text-[#16C2B2]">{total.toLocaleString('ru-RU')} so'm</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleCheckout}
          disabled={isSubmitting || !address}
          className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-xl ${
            isSubmitting || !address 
              ? 'bg-[#2C303E] text-gray-500 cursor-not-allowed' 
              : 'bg-[#22C55E] text-[#0F1015] hover:bg-[#16A34A] shadow-[#22C55E]/20'
          }`}
        >
          {isSubmitting ? 'Buyurtma rasmiylashtirilmoqda...' : 'Buyurtmani tasdiqlash'}
        </button>
      </div>
    </div>
  );
}
