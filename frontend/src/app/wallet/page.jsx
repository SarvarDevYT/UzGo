'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, Sparkles, CreditCard, Banknote } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export default function WalletPage() {
  const router = useRouter();
  const { walletBalance, cashbackBalance, transactions, topUpWallet } = useWallet() || {
    walletBalance: 150000,
    cashbackBalance: 25000,
    transactions: [],
    topUpWallet: () => {}
  };
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(50000);

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    topUpWallet(topUpAmount);
    setShowTopUpModal(false);
    alert(`🎉 Tabriklaymiz! Hamyoningizga ${topUpAmount.toLocaleString('ru-RU')} so'm muvaffaqiyatli o'tkazildi!`);
  };

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-24 p-4 max-w-lg mx-auto space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center pt-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Wallet className="text-[#16C2B2]" size={24} />
            UzGo Hamyon & Keshbek
          </h1>
          <p className="text-xs text-gray-400">Balans va to'plangan keshbeklarni boshqarish</p>
        </div>
        <button 
          onClick={() => setShowTopUpModal(true)}
          className="bg-[#16C2B2] text-[#0F1015] font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-[#16C2B2]/20"
        >
          <Plus size={16} /> To'ldirish
        </button>
      </div>

      {/* Main Balances Card */}
      <div className="bg-gradient-to-br from-[#181A20] via-[#1F2330] to-[#181A20] border border-[#2C303E] rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#16C2B2]/10 rounded-full filter blur-2xl pointer-events-none"></div>
        
        <div>
          <span className="text-xs text-gray-400 font-bold block mb-1">Asosiy Hamyon Balansi</span>
          <span className="text-3xl font-black text-[#16C2B2]">{(walletBalance || 0).toLocaleString('ru-RU')} <span className="text-base text-gray-300">so'm</span></span>
        </div>

        <div className="border-t border-[#2C303E] pt-3 flex justify-between items-center">
          <div>
            <span className="text-xs text-[#F2A93B] font-extrabold flex items-center gap-1">
              <Sparkles size={14} /> To'plangan Keshbek (+10%)
            </span>
            <span className="text-lg font-black text-white">{(cashbackBalance || 0).toLocaleString('ru-RU')} so'm</span>
          </div>
          <span className="text-[10px] bg-[#F2A93B]/20 text-[#F2A93B] border border-[#F2A93B]/40 px-2 py-1 rounded-lg font-black">
            100% ishlatiladi
          </span>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => setShowTopUpModal(true)}
          className="bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] p-4 rounded-2xl flex items-center gap-3 shadow-xl transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
            <ArrowDownLeft size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white">Click / Payme</div>
            <div className="text-[10px] text-gray-400">Hamyonni to'ldirish</div>
          </div>
        </button>

        <button 
          onClick={() => router.push('/market')}
          className="bg-[#181A20] border border-[#2C303E] hover:border-[#F2A93B] p-4 rounded-2xl flex items-center gap-3 shadow-xl transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
            <ArrowUpRight size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white">Xarid Qilish</div>
            <div className="text-[10px] text-gray-400">Market & Delivery</div>
          </div>
        </button>
      </div>

      {/* Transactions History */}
      <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 shadow-xl space-y-3">
        <h3 className="text-xs font-black text-white uppercase tracking-wider">O'tkazmalar Tarixi</h3>
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center p-3 rounded-2xl bg-[#0F1015] border border-[#2C303E]/50">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                  t.amount > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {t.amount > 0 ? '+' : '-'}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.title}</div>
                  <div className="text-[10px] text-gray-400">{t.date}</div>
                </div>
              </div>
              <span className={`text-xs font-black ${t.amount > 0 ? 'text-[#16C2B2]' : 'text-gray-300'}`}>
                {t.amount > 0 ? `+${t.amount.toLocaleString('ru-RU')}` : t.amount.toLocaleString('ru-RU')} so'm
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white">UzGo Hamyonni To'ldirish</h3>
            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-2">Summani tanlang:</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[20000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2 rounded-xl border text-xs font-black transition-all ${
                        topUpAmount === amt ? 'border-[#16C2B2] bg-[#16C2B2]/20 text-[#16C2B2]' : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                      }`}
                    >
                      +{amt / 1000}k so'm
                    </button>
                  ))}
                </div>
                <input 
                  type="number" 
                  value={topUpAmount} 
                  onChange={e => setTopUpAmount(Number(e.target.value))}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-[#16C2B2] font-black p-3 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowTopUpModal(false)}
                  className="flex-1 bg-[#0F1015] border border-[#2C303E] text-gray-400 font-bold py-3 rounded-xl text-xs"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-[#16C2B2] text-[#0F1015] font-black py-3 rounded-xl text-xs shadow-lg shadow-[#16C2B2]/20"
                >
                  To'lash (Click / Payme)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
