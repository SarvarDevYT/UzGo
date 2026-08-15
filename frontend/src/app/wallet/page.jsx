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
    <div className="min-h-screen bg-[#FAFAFC] text-[#111827] pb-28 p-4 max-w-lg mx-auto space-y-5 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center pt-4">
        <div>
          <h1 className="text-xl font-black text-[#0F1015] flex items-center gap-2">
            <Wallet className="text-[#F59E0B]" size={24} />
            UzGo Hamyon & Keshbek
          </h1>
          <p className="text-xs text-gray-500 font-medium">Telegram Admin va Click/Payme orqali balans to'ldirish</p>
        </div>
        <button 
          onClick={() => setShowTopUpModal(true)}
          className="bg-[#0F1015] text-[#F59E0B] font-black px-3.5 py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow-md apple-card-press"
        >
          <Plus size={16} /> To'ldirish
        </button>
      </div>

      {/* Main Balances Card */}
      <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4 relative overflow-hidden">
        <div>
          <span className="text-xs text-gray-500 font-semibold block mb-1">Asosiy Hamyon Balansi</span>
          <span className="text-3xl font-black text-[#0F1015]">{(walletBalance || 0).toLocaleString('ru-RU')} <span className="text-base text-gray-400 font-medium">so'm</span></span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <div>
            <span className="text-xs text-[#D97706] font-extrabold flex items-center gap-1">
              <Sparkles size={14} /> To'plangan Keshbek (+10%)
            </span>
            <span className="text-lg font-black text-[#0F1015]">{(cashbackBalance || 0).toLocaleString('ru-RU')} so'm</span>
          </div>
          <span className="text-[10px] bg-amber-500/10 text-[#D97706] border border-amber-500/30 px-2 py-1 rounded-lg font-black">
            100% qaytadi
          </span>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => { setPaymentMethod('telegram'); setShowTopUpModal(true); }}
          className="bg-white border border-gray-200/80 hover:border-sky-500 p-4 rounded-3xl flex items-center gap-3 shadow-[0_8px_25px_rgba(0,0,0,0.03)] transition-all apple-card-press"
        >
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-black">
            <MessageCircle size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-[#0F1015]">Telegram Admin</div>
            <div className="text-[10px] text-sky-600 font-extrabold">Chek yuborish 💬</div>
          </div>
        </button>

        <button 
          onClick={() => { setPaymentMethod('click_payme'); setShowTopUpModal(true); }}
          className="bg-white border border-gray-200/80 hover:border-[#F59E0B] p-4 rounded-3xl flex items-center gap-3 shadow-[0_8px_25px_rgba(0,0,0,0.03)] transition-all apple-card-press"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center font-black">
            <CreditCard size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-[#0F1015]">Click / Payme</div>
            <div className="text-[10px] text-gray-500 font-medium">Tezkor to'lov</div>
          </div>
        </button>
      </div>

      {/* Transactions History */}
      <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-[0_8px_25px_rgba(0,0,0,0.03)] space-y-3">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">O'tkazmalar Tarixi</h3>
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                  t.amount > 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-500'
                }`}>
                  {t.amount > 0 ? '+' : '-'}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F1015]">{t.title}</div>
                  <div className="text-[10px] text-gray-400">{t.date}</div>
                </div>
              </div>
              <span className={`text-xs font-black ${t.amount > 0 ? 'text-emerald-600' : 'text-gray-700'}`}>
                {t.amount > 0 ? `+${t.amount.toLocaleString('ru-RU')}` : t.amount.toLocaleString('ru-RU')} so'm
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-[#0F1015]">UzGo Hamyonni To'ldirish</h3>
              <button onClick={() => setShowTopUpModal(false)} className="text-gray-400 hover:text-black">✕</button>
            </div>

            {/* Method Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('telegram')}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'telegram' ? 'border-sky-500 bg-sky-50 text-sky-600' : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              >
                <MessageCircle size={14} /> Telegram Admin
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('click_payme')}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'click_payme' ? 'border-[#0F1015] bg-[#0F1015] text-[#F59E0B]' : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              >
                <CreditCard size={14} /> Click / Payme
              </button>
            </div>

            {/* Amount Selector */}
            <div>
              <label className="text-xs text-gray-500 font-bold block mb-2">To'ldirish Summasi (so'm):</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[20000, 50000, 100000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt)}
                    className={`py-2 rounded-xl border text-xs font-black transition-all ${
                      topUpAmount === amt ? 'border-[#0F1015] bg-[#0F1015] text-[#F59E0B]' : 'border-gray-200 bg-gray-50 text-gray-600'
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
                className="w-full bg-gray-50 border border-gray-200 text-[#0F1015] font-black p-3 rounded-xl text-sm outline-none focus:border-[#F59E0B]"
              />
            </div>

            {/* Method Content */}
            {paymentMethod === 'telegram' ? (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-bold">UzGo Admin Kartasi:</span>
                  <span className="text-[10px] text-gray-500 font-bold">{CARD_HOLDER}</span>
                </div>

                <div className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-xl shadow-sm">
                  <span className="font-mono font-black text-sm text-[#0F1015]">{P2P_CARD_NUMBER}</span>
                  <button
                    onClick={handleCopyCard}
                    className="flex items-center gap-1 text-xs text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg font-bold"
                  >
                    {copiedCard ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    {copiedCard ? 'Nusxalandi!' : 'Nusxa'}
                  </button>
                </div>

                <div className="text-[11px] text-gray-500 space-y-1 pt-1 font-medium">
                  <p>1. Kartaga Click yoki Payme orqali <b>{topUpAmount.toLocaleString('ru-RU')} so'm</b> o'tkazing.</p>
                  <p>2. Pastdagi tugmani bosib, Telegram Admin'ga chek rasmini yuboring.</p>
                </div>

                <button
                  type="button"
                  onClick={handleSendTelegramChek}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md apple-card-press"
                >
                  <Send size={16} /> Telegram Admin'ga Chek Yuborish 💬
                </button>
              </div>
            ) : (
              <form onSubmit={handleAutoTopUpSubmit} className="space-y-3">
                <p className="text-xs text-gray-500">Click / Payme to'lov tizimiga avtomatik yo'naltirilasiz.</p>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowTopUpModal(false)}
                    className="flex-1 bg-gray-100 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl text-xs"
                  >
                    Bekor qilish
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-[#0F1015] text-[#F59E0B] font-black py-3 rounded-xl text-xs shadow-md"
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

