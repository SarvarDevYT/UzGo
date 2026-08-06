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
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-dark-bg">
      <div className="p-4 bg-dark-card border-b border-dark-border z-10 sticky top-0 flex items-center justify-between">
        <h1 className="text-xl font-bold text-dark-text">Mening savatim</h1>
        <div className="bg-primary-900/20 text-[#ffc107] px-3 py-1 rounded-full text-sm font-semibold border border-[#ffc107]/30">
          {cartItems.length} ta mahsulot
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-dark-card rounded-full flex items-center justify-center mb-6 border border-dark-border">
              <ShoppingBag size={64} className="text-dark-text/30" />
            </div>
            <h2 className="text-xl font-bold text-dark-text mb-2">Savat bo'sh</h2>
            <p className="text-dark-text/60 mb-8 max-w-[250px]">
              Market bo'limiga o'tib, kerakli mahsulotlarni xarid qilishingiz mumkin
            </p>
            <button 
              onClick={() => router.push('/market')}
              className="bg-[#1a237e] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#283593] transition-colors shadow-lg"
            >
              Market ga o'tish
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-dark-card border border-dark-border rounded-xl p-3 flex gap-3 relative animate-in fade-in">
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 p-1 text-dark-text/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
                
                <img 
                  src={item.image_url || item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-dark-bg"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150'; }}
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-dark-text text-sm font-medium pr-6 line-clamp-2">{item.name}</h3>
                  <div className="text-accent font-bold text-sm">
                    {new Intl.NumberFormat('uz-UZ').format(item.price)} so'm
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-dark-bg border border-dark-border rounded-lg">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-dark-text hover:text-accent disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-dark-text">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-dark-text hover:text-accent"
                      >
                        <Plus size={16} />
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
        <div className="bg-dark-card border-t border-dark-border p-4 mt-auto z-10 sticky bottom-0 max-w-2xl mx-auto w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-dark-text/70">Jami to'lov:</span>
            <span className="text-xl font-bold text-accent">{formattedTotal} so'm</span>
          </div>
          <button 
            onClick={() => router.push('/market/checkout')}
            className="w-full bg-[#1a237e] hover:bg-[#283593] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#1a237e]/30"
          >
            Buyurtma berish <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
