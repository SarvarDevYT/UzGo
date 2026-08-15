'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { removeItem, updateQuantity, selectCartTotal } from '../../../store/cartSlice';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(selectCartTotal);
  const formattedTotal = new Intl.NumberFormat('uz-UZ').format(totalAmount);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFC] text-[#111827] pb-28">
      <div className="p-4 bg-white border-b border-gray-100 z-10 sticky top-0 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-black text-[#0F1015]">Mening savatim</h1>
        <div className="bg-amber-500/10 text-[#D97706] px-3 py-1 rounded-full text-xs font-black border border-amber-500/20">
          {cartItems.length} ta mahsulot
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center mb-6 border border-gray-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-black text-[#0F1015] mb-2">Savat bo'sh</h2>
            <p className="text-gray-500 text-xs mb-8 max-w-[250px] font-medium">
              Market bo'limiga o'tib, kerakli mahsulotlarni xarid qilishingiz mumkin
            </p>
            <button 
              onClick={() => router.push('/market')}
              className="bg-[#0F1015] text-[#F59E0B] px-8 py-3.5 rounded-2xl font-black text-xs hover:bg-[#1C1E26] transition-all shadow-md apple-card-press"
            >
              Market ga o'tish
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white border border-gray-200/80 rounded-3xl p-3.5 flex gap-3 relative shadow-[0_8px_25px_rgba(0,0,0,0.03)] apple-card-press">
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <X size={16} />
                </button>
                
                <img 
                  src={item.image_url || item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-2xl bg-gray-50 border border-gray-100"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150'; }}
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-[#0F1015] text-xs font-extrabold pr-6 line-clamp-2">{item.name}</h3>
                  <div className="text-[#D97706] font-black text-sm">
                    {new Intl.NumberFormat('uz-UZ').format(item.price)} so'm
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-gray-600 hover:text-black disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-xs font-black text-[#0F1015]">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-gray-600 hover:text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="bg-white border-t border-gray-100 p-4 mt-auto z-10 sticky bottom-0 max-w-2xl mx-auto w-full shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium text-xs">Jami to'lov:</span>
            <span className="text-xl font-black text-[#0F1015]">{formattedTotal} so'm</span>
          </div>
          <button 
            onClick={() => router.push('/market/checkout')}
            className="w-full bg-[#0F1015] hover:bg-[#1C1E26] text-[#F59E0B] py-4 rounded-3xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md apple-card-press"
          >
            Buyurtma berish <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

