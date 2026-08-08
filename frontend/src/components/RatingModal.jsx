'use client';

import React, { useState } from 'react';
import { Star, X, Check, Heart, DollarSign } from 'lucide-react';

export default function RatingModal({ isOpen, onClose, driverName = "Otabek Tursunov", onSubmit }) {
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0); // 0, 2000, 5000, 10000
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ rating, tip, comment });
    alert(`Rahmat! Bahoyingiz (${rating} ⭐) va ${tip > 0 ? tip.toLocaleString('ru-RU') + " so'm choychaqa" : "sharhingiz"} yuborildi! ❤️`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 w-full max-w-md shadow-2xl text-center space-y-4 animate-slide-up">
        
        <div className="flex justify-between items-center border-b border-[#2C303E] pb-3">
          <span className="text-xs font-black text-[#16C2B2] uppercase">Safarni Baholash</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={18} /></button>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#16C2B2] to-[#FFE066] text-[#0F1015] font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
          {driverName.charAt(0)}
        </div>

        <div>
          <h3 className="text-base font-extrabold text-white">{driverName} bilan safar qanday o'tdi?</h3>
          <p className="text-xs text-gray-400">Termiz bo'ylab xizmat ko'rsatildi</p>
        </div>

        {/* 5-Star Rating Selector */}
        <div className="flex justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 hover:scale-125 transition-transform"
            >
              <Star
                size={32}
                className={star <= rating ? 'text-[#F2A93B] fill-[#F2A93B]' : 'text-gray-600'}
              />
            </button>
          ))}
        </div>

        {/* Driver Tips Selector */}
        <div>
          <label className="text-xs text-gray-400 font-bold block mb-2">Haydovchiga choychaqa (Tip) qoldirish:</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 2000, 5000, 10000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setTip(amount)}
                className={`py-2 px-1 rounded-xl border text-xs font-black transition-all ${
                  tip === amount 
                    ? 'border-[#16C2B2] bg-[#16C2B2]/20 text-[#16C2B2]' 
                    : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                }`}
              >
                {amount === 0 ? 'Yo\'q' : `+${amount / 1000}k`}
              </button>
            ))}
          </div>
        </div>

        {/* Comment input */}
        <textarea
          placeholder="Tafsilotlar yoki fikr bildiring (Ixtiyoriy)..."
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-2xl bg-[#16C2B2] text-[#0F1015] font-black text-xs shadow-lg shadow-[#16C2B2]/20"
        >
          Bahoni Yuborish
        </button>
      </div>
    </div>
  );
}
