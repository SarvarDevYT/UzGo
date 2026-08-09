'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, Sparkles, CreditCard, Send, Copy, Check, MessageCircle } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState('telegram'); // telegram | click_payme
  const [copiedCard, setCopiedCard] = useState(false);

  const P2P_CARD_NUMBER = '8600 5456 7890 1234';
  const CARD_HOLDER = 'Sarvarbek (UzGo Admin)';
  const TELEGRAM_ADMIN_USERNAME = 'uzgo_admin'; // Telegram username

  const handleCopyCard = () => {
    navigator.clipboard.writeText(P2P_CARD_NUMBER.replace(/\s+/g, ''));
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2500);
  };

  const handleSendTelegramChek = () => {
    const text = encodeURIComponent(
      `Assalomu alaykum! UzGo Hamyonimni to'ldirish uchun to'lov qildim.\n\n` +
      `📱 Tel: +998 90 123 45 67\n` +
      `💰 Summa: ${topUpAmount.toLocaleString('ru-RU')} so'm\n` +
      `💳 Karta: 8600****1234\n\n` +
      `Iltimos, chekni tekshirib balansimni tasdiqlang! 📄`
    );
    window.open(`https://t.me/${TELEGRAM_ADMIN_USERNAME}?text=${text}`, '_blank');
  };

  const handleAutoTopUpSubmit = (e) => {
    e.preventDefault();
    topUpWallet(topUpAmount);
    setShowTopUpModal(false);
    alert(`🎉 Tabriklaymiz! UzGo Hamyoningizga ${topUpAmount.toLocaleString('ru-RU')} so'm o'tkazildi!`);
  };

  return (
    <div className="min-h-screen bg-[#0F1015] text-[#F5F5F7] pb-24 p-4 max-w-lg mx-auto space-y-5 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center pt-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Wallet className="text-[#16C2B2]" size={24} />
            UzGo Hamyon & Keshbek
          </h1>
          <p className="text-xs text-gray-400">Telegram Admin va Click/Payme orqali balans to'ldirish</p>
        </div>
        <button 
          onClick={() => setShowTopUpModal(true)}
          className="bg-[#16C2B2] text-[#0F1015] font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-[#16C2B2]/20"
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
            100% qaytadi
          </span>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => { setPaymentMethod('telegram'); setShowTopUpModal(true); }}
          className="bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] p-4 rounded-2xl flex items-center gap-3 shadow-xl transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black">
            <MessageCircle size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white">Telegram Admin</div>
            <div className="text-[10px] text-[#16C2B2] font-bold">Chek yuborish 💬</div>
          </div>
        </button>

        <button 
          onClick={() => { setPaymentMethod('click_payme'); setShowTopUpModal(true); }}
          className="bg-[#181A20] border border-[#2C303E] hover:border-[#F2A93B] p-4 rounded-2xl flex items-center gap-3 shadow-xl transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
            <CreditCard size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white">Click / Payme</div>
            <div className="text-[10px] text-gray-400">Tezkor to'lov</div>
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

      {/* Enhanced Top Up Modal (Telegram Admin + Click/Payme) */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#2C303E] pb-3">
              <h3 className="text-base font-black text-white">UzGo Hamyonni To'ldirish</h3>
              <button onClick={() => setShowTopUpModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            {/* Method Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('telegram')}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'telegram' ? 'border-sky-500 bg-sky-500/20 text-sky-400' : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                }`}
              >
                <MessageCircle size={14} /> Telegram Admin
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('click_payme')}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'click_payme' ? 'border-[#16C2B2] bg-[#16C2B2]/20 text-[#16C2B2]' : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                }`}
              >
                <CreditCard size={14} /> Click / Payme
              </button>
            </div>

            {/* Amount Selector */}
            <div>
              <label className="text-xs text-gray-400 font-bold block mb-2">To'ldirish Summasi (so'm):</label>
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

            {/* Method Content */}
            {paymentMethod === 'telegram' ? (
              <div className="bg-[#0F1015] border border-[#2C303E] rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-bold">UzGo Admin Kartasi:</span>
                  <span className="text-[10px] text-gray-400 font-bold">{CARD_HOLDER}</span>
                </div>

                <div className="flex justify-between items-center bg-[#181A20] border border-[#2C303E] p-3 rounded-xl">
                  <span className="font-mono font-black text-sm text-[#16C2B2]">{P2P_CARD_NUMBER}</span>
                  <button
                    onClick={handleCopyCard}
                    className="flex items-center gap-1 text-xs text-white bg-[#2C303E] hover:bg-gray-600 px-2.5 py-1 rounded-lg font-bold"
                  >
                    {copiedCard ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {copiedCard ? 'Nusxalandi!' : 'Nusxa'}
                  </button>
                </div>

                <div className="text-[11px] text-gray-400 space-y-1 pt-1">
                  <p>1. Kartaga Click yoki Payme orqali <b>{topUpAmount.toLocaleString('ru-RU')} so'm</b> o'tkazing.</p>
                  <p>2. Pastdagi tugmani bosib, Telegram Admin'ga chek rasmini yuboring.</p>
                </div>

                <button
                  type="button"
                  onClick={handleSendTelegramChek}
                  className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                >
                  <Send size={16} /> Telegram Admin'ga Chek Yuborish 💬
                </button>
              </div>
            ) : (
              <form onSubmit={handleAutoTopUpSubmit} className="space-y-3">
                <p className="text-xs text-gray-400">Click / Payme to'lov tizimiga avtomatik yo'naltirilasiz.</p>
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
                    Click / Payme bilan To'lash
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
