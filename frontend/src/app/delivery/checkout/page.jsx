'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import OrderTracker from '../../../modules/delivery/components/OrderTracker';

export default function DeliveryCheckoutPage() {
  const router = useRouter();
  
  const [cart] = useState([
    { id: 'm1', name: 'Margarita', price: 45000, quantity: 1 },
    { id: 'm2', name: 'Pepperoni', price: 52000, quantity: 1 }
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
      <div className="min-h-screen bg-dark-bg p-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-dark-text mb-6 text-center">Buyurtmangiz qabul qilindi! 🎉</h2>
        <OrderTracker orderId={orderId} onClose={() => router.push('/delivery')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text pb-20">
      {/* Header */}
      <div className="bg-dark-card p-4 flex items-center gap-3 border-b border-dark-border sticky top-0 z-10">
        <button onClick={() => router.back()} className="p-1 text-dark-muted hover:text-dark-text">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Buyurtmani rasmiylashtirish</h1>
      </div>

      <div className="p-4 space-y-6 max-w-xl mx-auto">
        {/* Order Items */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-3">{storeName}</h2>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-medium">{item.price.toLocaleString('uz-UZ')} so'm</span>
              </div>
            ))}
          </div>
        </div>

        {/* Address Input */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#1a237e]" /> Yetkazib berish manzili
          </h2>
          <textarea 
            className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text focus:border-[#1a237e] focus:outline-none transition-colors"
            placeholder="Shahar, tuman, ko'cha, uy raqami..."
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        {/* Payment Methods */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#1a237e]" /> To'lov usuli
          </h2>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-[#ffc107] bg-[#ffc107]/10' : 'border-dark-border bg-dark-bg'}`}>
              <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="hidden" />
              <Banknote className={`w-5 h-5 ${paymentMethod === 'cash' ? 'text-[#ffc107]' : 'text-dark-muted'}`} />
              <span className={paymentMethod === 'cash' ? 'font-medium' : ''}>Naqd pul (Kuryerga)</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'click' ? 'border-blue-500 bg-blue-500/10' : 'border-dark-border bg-dark-bg'}`}>
              <input type="radio" name="payment" value="click" checked={paymentMethod === 'click'} onChange={() => setPaymentMethod('click')} className="hidden" />
              <ShieldCheck className={`w-5 h-5 ${paymentMethod === 'click' ? 'text-blue-500' : 'text-dark-muted'}`} />
              <span className={paymentMethod === 'click' ? 'font-medium' : ''}>Click orqali</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'payme' ? 'border-cyan-500 bg-cyan-500/10' : 'border-dark-border bg-dark-bg'}`}>
              <input type="radio" name="payment" value="payme" checked={paymentMethod === 'payme'} onChange={() => setPaymentMethod('payme')} className="hidden" />
              <ShieldCheck className={`w-5 h-5 ${paymentMethod === 'payme' ? 'text-cyan-500' : 'text-dark-muted'}`} />
              <span className={paymentMethod === 'payme' ? 'font-medium' : ''}>Payme orqali</span>
            </label>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-dark-muted text-sm">
            <span>Mahsulotlar narxi</span>
            <span>{subtotal.toLocaleString('uz-UZ')} so'm</span>
          </div>
          <div className="flex justify-between text-dark-muted text-sm">
            <span>Yetkazib berish</span>
            <span>{deliveryFee.toLocaleString('uz-UZ')} so'm</span>
          </div>
          <div className="border-t border-dark-border pt-2 mt-2 flex justify-between font-bold text-lg">
            <span>Jami</span>
            <span className="text-[#ffc107]">{total.toLocaleString('uz-UZ')} so'm</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleCheckout}
          disabled={isSubmitting || !address}
          className={`w-full py-4 rounded-xl font-bold text-white transition-colors ${
            isSubmitting || !address ? 'bg-dark-border text-dark-muted cursor-not-allowed' : 'bg-[#1a237e] hover:bg-[#283593] shadow-lg'
          }`}
        >
          {isSubmitting ? 'Buyurtma rasmiylashtirilmoqda...' : 'Buyurtmani tasdiqlash'}
        </button>
      </div>
    </div>
  );
}
