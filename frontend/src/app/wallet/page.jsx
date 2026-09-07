'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, Sparkles, 
  CreditCard, Send, Copy, Check, MessageCircle, ArrowLeft, Award, 
  Zap, Lock, ChevronRight
} from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export default function WalletPage() {
  const router = useRouter();
  const { walletBalance = 85000, cashbackBalance = 14500, transactions = [], topUpWallet = () => {} } = useWallet() || {};

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(50000);
  const [copiedCard, setCopiedCard] = useState(false);

  const P2P_CARD_NUMBER = '8600 5456 7890 1234';
  const CARD_HOLDER = 'UzGo Payments (Admin)';

  const handleCopyCard = () => {
    navigator.clipboard.writeText(P2P_CARD_NUMBER.replace(/\s+/g, ''));
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    topUpWallet(topUpAmount);
    setShowTopUpModal(false);
    alert(`🎉 Balansingizga ${topUpAmount.toLocaleString()} so'm muvaffaqiyatli qo'shildi!`);
  };

  const sampleTransactions = [
    { id: 1, title: 'UzGo Taksi (Comfort)', date: 'Bugun, 14:20', amount: -18000, cashback: +540 },
    { id: 2, title: 'UzGo Eats (KFC Toshkent)', date: 'Kecha, 19:45', amount: -42000, cashback: +1260 },
    { id: 3, title: 'Hamyon to\'ldirish (Click)', date: '05 Sentabr', amount: +100000, cashback: 0 },
    { id: 4, title: 'UzGo Lavka (Ekspress)', date: '04 Sentabr', amount: -35000, cashback: +1050 },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-[#121214] text-[#121214] dark:text-[#F5F5F7] pb-32 font-sans transition-colors">
      
      {/* Header */}
      <div className="max-w-lg mx-auto px-4 pt-6 flex justify-between items-center">
        <button
          onClick={() => router.push('/')}
          className="bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 p-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm apple-card-press"
        >
          <ArrowLeft size={16} /> Bosh sahifa
        </button>

        <h1 className="text-base font-black text-[#121214] dark:text-white flex items-center gap-1.5">
          <Wallet size={18} className="text-[#FCE000] fill-[#FCE000]" /> UzGo Pay
        </h1>

        <button
          onClick={() => setShowTopUpModal(true)}
          className="bg-[#FCE000] hover:bg-[#E5CB00] text-[#121214] px-3.5 py-2 rounded-2xl text-xs font-black shadow-md apple-card-press flex items-center gap-1"
        >
          <Plus size={15} /> To'ldirish
        </button>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-5">

        {/* 1. Virtual UzGo Black & Gold Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1E22] via-[#121214] to-[#0A0A0C] border border-gray-800 p-6 text-white shadow-2xl space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black text-lg shadow-md">
                Go
              </div>
              <span className="font-black text-lg tracking-tight">UzGo <span className="text-[#FCE000]">Pay</span></span>
            </div>
            <div className="bg-[#FCE000]/20 text-[#FCE000] border border-[#FCE000]/40 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1">
              <Sparkles size={12} /> 3% Keshbek
            </div>
          </div>

          <div>
            <span className="text-[11px] text-gray-400 font-bold block mb-1">Mavjud Balans</span>
            <div className="text-3xl font-black tracking-tight text-white flex items-baseline gap-2">
              {walletBalance.toLocaleString()} <span className="text-sm font-extrabold text-[#FCE000]">so'm</span>
            </div>
          </div>

          <div className="flex justify-between items-end pt-2 border-t border-gray-800/80">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Karta egasi</span>
              <span className="text-xs font-black tracking-wider text-gray-200">Sarvarbek Dev</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-black text-gray-400">
              •••• 8824
            </div>
          </div>
        </div>

        {/* 2. Cashback Widget */}
        <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FCE000]/20 text-[#121214] dark:text-[#FCE000] flex items-center justify-center text-2xl font-black">
              🎁
            </div>
            <div>
              <h4 className="font-black text-sm text-[#121214] dark:text-white">
                To'plangan Keshbek
              </h4>
              <span className="text-xs text-emerald-500 font-black block mt-0.5">
                +{cashbackBalance.toLocaleString()} so'm
              </span>
            </div>
          </div>

          <button
            onClick={() => alert("Keshbek balansingiz avtomatik tarzda safarlarga chegirma qilib beriladi!")}
            className="bg-gray-100 dark:bg-[#26262A] text-gray-700 dark:text-gray-300 text-xs font-black px-3.5 py-2 rounded-2xl apple-card-press"
          >
            Qo'llash
          </button>
        </div>

        {/* 3. Linked Bank Cards */}
        <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block px-1">
            Ulangan Bank Kartalari
          </span>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-[#26262A] border border-gray-200/70 dark:border-gray-700/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-black text-[10px]">
                  UZCARD
                </div>
                <div>
                  <span className="text-xs font-black text-[#121214] dark:text-white block">8600 •••• •••• 4412</span>
                  <span className="text-[10px] text-gray-400 font-semibold">Kapitalbank</span>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-md font-black">Asosiy</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-[#26262A] border border-gray-200/70 dark:border-gray-700/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded-lg bg-[#F59E0B] text-[#121214] flex items-center justify-center font-black text-[10px]">
                  HUMO
                </div>
                <div>
                  <span className="text-xs font-black text-[#121214] dark:text-white block">9860 •••• •••• 1902</span>
                  <span className="text-[10px] text-gray-400 font-semibold">TBC Bank</span>
                </div>
              </div>
              <button className="text-[10px] text-gray-400 hover:text-red-500 font-bold">O'chirish</button>
            </div>
          </div>
        </div>

        {/* 4. Transactions History */}
        <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block px-1">
            To'lovlar & Xaridlar Tarixi
          </span>

          <div className="space-y-2">
            {sampleTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#26262A] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs ${
                    tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-100 dark:bg-[#26262A] text-gray-700 dark:text-gray-300'
                  }`}>
                    {tx.amount > 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-[#121214] dark:text-white">{tx.title}</h5>
                    <span className="text-[10px] text-gray-400 font-medium">{tx.date}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-black block ${tx.amount > 0 ? 'text-emerald-500' : 'text-[#121214] dark:text-white'}`}>
                    {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()} so'm
                  </span>
                  {tx.cashback > 0 && (
                    <span className="text-[10px] font-black text-[#FCE000]">
                      +{tx.cashback} so'm keshbek
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="text-base font-black text-[#121214] dark:text-white flex items-center gap-2">
                <Plus size={18} className="text-[#FCE000]" /> Hamyonni to'ldirish
              </h3>
              <button onClick={() => setShowTopUpModal(false)} className="text-gray-400 hover:text-black dark:hover:text-white">✕</button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-400 block mb-2">Summani tanlang:</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[20000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-black border transition-all ${
                        topUpAmount === amt
                          ? 'bg-[#FCE000] text-[#121214] border-black/10'
                          : 'bg-gray-100 dark:bg-[#26262A] text-gray-600 dark:text-gray-300 border-transparent'
                      }`}
                    >
                      +{amt / 1000}k so'm
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  className="w-full bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white font-black p-3.5 rounded-2xl text-base outline-none border border-transparent focus:border-[#FCE000]"
                />
              </div>

              <div className="bg-gray-50 dark:bg-[#26262A] p-3 rounded-2xl text-xs space-y-1">
                <div className="flex justify-between font-bold text-gray-500">
                  <span>To'lov usuli:</span>
                  <span className="text-[#121214] dark:text-white font-black">Click / Payme / Uzcard</span>
                </div>
                <div className="flex justify-between font-bold text-gray-500">
                  <span>Keshbek bonusi:</span>
                  <span className="text-emerald-500 font-black">+3% har bir xaridga</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FCE000] hover:bg-[#E5CB00] text-[#121214] py-4 rounded-2xl font-black text-sm shadow-md apple-card-press"
              >
                {topUpAmount.toLocaleString()} so'm to'ldirish
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
