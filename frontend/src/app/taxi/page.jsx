'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Search, Loader2, Phone, Star, X, Check, Car, Compass, Calendar, Share2, MessageSquare, Send, ShieldCheck } from 'lucide-react';
import { getCurrentAddress } from '../../utils/geolocation';
import { supabase } from '../../services/supabaseClient';
import { useLanguage } from '../../context/LanguageContext';
import YandexMap from '../../components/YandexMap';

const TERMIZ_DISTRICTS = [
  'Termiz Markaz (Al-Hakim at-Tirmiziy)', 
  'Indorama MFY (Sanoat zonasi)', 
  'Surxon Sohil MFY (Amudaryo bo\'yi)', 
  'San\'at Saroyi va Teatr tumani', 
  'Do\'stlik MFY (Navoi ko\'chasi)', 
  'Chegara MFY (Manguzar Post Tomonda)', 
  'Termiz Avtovokzal (Shimoliy kapasi)', 
  'Termiz Xalqaro Aeroporti', 
  'TerDU Campus (Termiz Davlat Univ)'
];

const TARIFFS = [
  { id: 'economy', name: 'Ekonom', price: 12000, duration: '~3 min', car: 'Chevrolet Cobalt', icon: '🚗' },
  { id: 'comfort', name: 'Komfort', price: 18000, duration: '~4 min', car: 'Chevrolet Monza', icon: '🚙' },
  { id: 'comfort_plus', name: 'Komfort+', price: 25000, duration: '~5 min', car: 'BYD Song Plus', icon: '🏎️' },
  { id: 'business', name: 'Business', price: 40000, duration: '~7 min', car: 'Kia K5 / Malibu', icon: '👑' },
];

const MOCK_DRIVER = {
  name: 'Otabek Tursunov (Termiz)',
  carModel: 'Chevrolet Cobalt (Oq metallik)',
  plateNumber: '75 A 777 AA', // Termiz region code 75
  rating: 4.9,
  phone: '+998912345678',
  photo: 'O'
};

export default function TaxiPage() {
  const { t } = useLanguage();
  const [from, setFrom] = useState('Termiz Markaz (Al-Hakim at-Tirmiziy)');
  const [to, setTo] = useState('');
  const [loadingGps, setLoadingGps] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState('economy');
  const [status, setStatus] = useState('idle'); // idle | searching | found
  const [scheduledTime, setScheduledTime] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'driver', text: 'Assalomu alaykum! Men Termiz markazidan siz tomonga yo\'l oldim.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const activeTariffObj = TARIFFS.find(t => t.id === selectedTariff) || TARIFFS[0];

  const handleGetGps = async () => {
    setLoadingGps(true);
    try {
      const res = await getCurrentAddress();
      if (res && res.address) {
        setFrom(res.address + ' (Termiz)');
      }
    } catch (err) {
      alert(err.message || 'GPS aniqlab bo\'lmadi');
    } finally {
      setLoadingGps(false);
    }
  };

  const handleSearch = async () => {
    if (!from || !to) return;
    setStatus('searching');

    try {
      await supabase.from('taxi_rides').insert([
        {
          from_address: from,
          to_address: to,
          tariff: selectedTariff,
          price: activeTariffObj.price,
          driver_name: MOCK_DRIVER.name,
          car_model: MOCK_DRIVER.carModel,
          plate_number: MOCK_DRIVER.plateNumber,
          status: 'searching',
          scheduled_time: scheduledTime || null
        }
      ]);
    } catch (err) {
      console.error('Supabase write error:', err);
    }
    
    setTimeout(() => {
      setStatus('found');
    }, 2800);
  };

  const handleCancel = () => {
    setStatus('idle');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'driver', text: 'Tushundim, hozir yetib boraman!' }]);
    }, 1200);
  };

  const handleShareRide = () => {
    const shareUrl = `${window.location.origin}/taxi?shareToken=UZGO-TERMIZ-9981`;
    navigator.clipboard?.writeText(shareUrl);
    alert(`Safaringizni kuzatish havolasi nusxalandi:\n${shareUrl}\nOila a'zolaringiz va do'stlaringizga yuborishingiz mumkin! 🛡️`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0F1015] overflow-hidden relative">
      {/* Real Yandex Maps Integration (Termiz) */}
      <div className="absolute inset-0 z-0">
        <YandexMap 
          fromAddress={from} 
          toAddress={to} 
          onSelectLocation={(addr) => {
            if (!to) setTo(addr);
            else setFrom(addr);
          }} 
        />
      </div>

      {/* Taxi Bottom Sheet Container */}
      <div className="flex-1 overflow-y-auto p-4 z-10 flex flex-col justify-end max-w-lg mx-auto w-full">
        
        {status === 'idle' && (
          <div className="bg-white rounded-3xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-200/80 backdrop-blur-xl animate-slide-up">
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-black text-[#0F1015] tracking-tight">UzGo Taksi Termiz</h2>
                <span className="text-[10px] text-[#D97706] font-bold">📍 Surxondaryo viloyati</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowScheduleModal(!showScheduleModal)} 
                  className={`p-2 rounded-xl border text-xs font-bold transition-all apple-card-press ${
                    scheduledTime ? 'bg-[#0F1015] text-[#F59E0B] border-[#0F1015]' : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                  title="Oldindan rejalashtirish"
                >
                  <Calendar size={16} />
                </button>

                <button 
                  onClick={handleGetGps} 
                  disabled={loadingGps}
                  className="flex items-center gap-1 bg-amber-500/10 text-[#D97706] hover:bg-amber-500/20 font-extrabold text-xs px-3 py-1.5 rounded-full border border-amber-500/30 transition-all apple-card-press"
                >
                  {loadingGps ? <Loader2 size={14} className="animate-spin" /> : <Compass size={14} />}
                  <span>{loadingGps ? 'GPS...' : 'Mening joyim'}</span>
                </button>
              </div>
            </div>

            {/* Scheduled time info if set */}
            {scheduledTime && (
              <div className="mb-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs text-[#D97706] font-bold">
                <span>📅 Rejalashtirilgan vaqt: {new Date(scheduledTime).toLocaleString('uz-UZ')}</span>
                <button onClick={() => setScheduledTime('')} className="text-red-500 font-black"><X size={14} /></button>
              </div>
            )}

            {/* Rejalashtirish Modali */}
            {showScheduleModal && (
              <div className="mb-4 bg-gray-50 border border-gray-200 p-3 rounded-2xl">
                <label className="text-xs text-gray-500 font-bold block mb-2">Safar vaqtini tanlang:</label>
                <input 
                  type="datetime-local" 
                  className="w-full bg-white border border-gray-200 text-[#0F1015] p-2.5 rounded-xl text-xs outline-none focus:border-[#F59E0B] font-medium"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            )}
            
            {/* Address Inputs */}
            <div className="relative flex flex-col gap-2 mb-4">
              <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-gray-200 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center bg-gray-50 rounded-2xl p-3.5 border border-gray-200 focus-within:border-emerald-500 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3 shrink-0"></div>
                  <input 
                    type="text" 
                    placeholder="Qayerdan (Termiz manzil)" 
                    className="bg-transparent w-full outline-none text-[#0F1015] text-sm font-medium"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onFocus={() => setShowFromDropdown(true)}
                    onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                  />
                </div>
                {showFromDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl z-30 max-h-48 overflow-y-auto">
                    {TERMIZ_DISTRICTS.filter(d => d.toLowerCase().includes(from.toLowerCase())).map(district => (
                      <div 
                        key={`from-${district}`} 
                        className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-[#0F1015] text-xs font-medium flex items-center gap-2"
                        onClick={() => { setFrom(district); setShowFromDropdown(false); }}
                      >
                        <MapPin size={14} className="text-emerald-500" />
                        {district}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <div className="flex items-center bg-gray-50 rounded-2xl p-3.5 border border-gray-200 focus-within:border-[#F59E0B] transition-colors">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B] mr-3 shrink-0"></div>
                  <input 
                    type="text" 
                    placeholder="Qayerga boramiz?" 
                    className="bg-transparent w-full outline-none text-[#0F1015] text-sm font-medium"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => setShowToDropdown(true)}
                    onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                  />
                </div>
                {showToDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl z-30 max-h-48 overflow-y-auto">
                    {TERMIZ_DISTRICTS.filter(d => d.toLowerCase().includes(to.toLowerCase())).map(district => (
                      <div 
                        key={`to-${district}`} 
                        className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-[#0F1015] text-xs font-medium flex items-center gap-2"
                        onClick={() => { setTo(district); setShowToDropdown(false); }}
                      >
                        <Navigation size={14} className="text-[#F59E0B]" />
                        {district}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Horizontal Tariff Selector Slider */}
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tarifni tanlang</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {TARIFFS.map((t) => {
                const isSelected = selectedTariff === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTariff(t.id)}
                    className={`p-2 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between text-center apple-card-press ${
                      isSelected
                        ? 'border-[#0F1015] bg-[#0F1015] text-[#F59E0B] shadow-md'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl mb-0.5">{t.icon}</span>
                    <span className={`font-extrabold text-[10px] leading-tight ${isSelected ? 'text-white' : 'text-[#0F1015]'}`}>{t.name}</span>
                    <span className="text-[9px] font-black mt-1 text-[#F59E0B]">{t.price.toLocaleString('ru-RU')}</span>
                  </div>
                );
              })}
            </div>

            {/* Price & Booking Button */}
            <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl border border-gray-200 mb-4">
              <div className="flex items-center gap-2">
                <Car className="text-[#F59E0B]" size={18} />
                <div>
                  <div className="text-xs font-bold text-[#0F1015]">{activeTariffObj.name} ({activeTariffObj.car})</div>
                  <div className="text-[10px] text-gray-400 font-medium">Naqd, Click yoki Payme</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-[#0F1015]">{activeTariffObj.price.toLocaleString('ru-RU')} so'm</div>
              </div>
            </div>

            <button 
              className={`w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-md apple-card-press ${
                from && to 
                  ? 'bg-[#0F1015] text-[#F59E0B] hover:bg-[#1C1E26] active:scale-[0.98]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              onClick={handleSearch}
              disabled={!from || !to}
            >
              <Search size={18} />
              {activeTariffObj.name}'ni chaqirish
            </button>
          </div>
        )}

        {status === 'searching' && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 flex flex-col items-center justify-center h-72 animate-slide-up">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-amber-500/10 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center relative z-10 border border-amber-500/40">
                <Loader2 size={48} className="text-[#F59E0B] animate-spin" />
              </div>
            </div>
            <h2 className="text-xl font-black text-[#0F1015] mb-1">Termizda haydovchi izlanmoqda...</h2>
            <p className="text-gray-500 text-xs text-center max-w-xs mb-4 font-medium">
              Yaqin atrofdagi {activeTariffObj.name} haydovchilariga yuborildi
            </p>
            <button 
              className="text-red-500 font-extrabold text-sm hover:underline"
              onClick={handleCancel}
            >
              Qidiruvni bekor qilish
            </button>
          </div>
        )}


        {status === 'found' && (
          <div className="flex flex-col gap-3 animate-slide-up">
            <div className="bg-[#22C55E]/20 text-[#22C55E] p-3.5 rounded-2xl border border-[#22C55E]/30 text-center font-bold text-xs animate-pulse flex items-center justify-center gap-2">
              <Check size={16} /> Haydovchi topildi! U siz tomonga yo'l oldi.
            </div>
            
            {/* Driver Card */}
            <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#2C303E] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#16C2B2] to-[#FFE066] flex items-center justify-center text-[#0F1015] font-black text-lg shadow-lg">
                    {MOCK_DRIVER.photo}
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-sm">{MOCK_DRIVER.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#F2A93B] font-bold">
                      <Star size={12} fill="currentColor" />
                      <span>{MOCK_DRIVER.rating} (Surxondaryo)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#0F1015] bg-[#F2A93B] px-2 py-0.5 rounded-xl text-xs shadow-md">
                    {MOCK_DRIVER.plateNumber}
                  </div>
                  <div className="text-[10px] text-gray-400 font-semibold mt-1">{MOCK_DRIVER.carModel}</div>
                </div>
              </div>

              {/* Action Buttons: Share Ride & In-App Chat */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button 
                  onClick={handleShareRide}
                  className="bg-[#16C2B2]/10 text-[#16C2B2] border border-[#16C2B2]/30 hover:bg-[#16C2B2]/20 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Share2 size={14} /> Safarni ulashish
                </button>
                <button 
                  onClick={() => setShowChatModal(true)}
                  className="bg-[#F2A93B]/10 text-[#F2A93B] border border-[#F2A93B]/30 hover:bg-[#F2A93B]/20 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare size={14} /> Ichki Chat
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400">Yetib keladi:</p>
                  <p className="text-white font-black text-lg text-[#FF5B4C]">~2 daqiqada</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-2xl hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all" 
                    onClick={handleCancel}
                  >
                    <X size={18} />
                  </button>
                  <a 
                    href={`tel:${MOCK_DRIVER.phone}`} 
                    className="bg-[#FF5B4C] text-white px-4 py-3 rounded-2xl hover:bg-[#E5493A] transition-all font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#FF5B4C]/25"
                  >
                    <Phone size={16} /> Qo'ng'iroq
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Driver-Rider Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[420px]">
            <div className="p-4 bg-[#0F1015] border-b border-[#2C303E] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#16C2B2] text-[#0F1015] font-black flex items-center justify-center text-xs">O</div>
                <div>
                  <div className="font-bold text-white text-xs">Otabek Tursunov (Haydovchi)</div>
                  <div className="text-[10px] text-[#22C55E] font-medium">● Onlayn</div>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-xs font-medium ${
                    m.sender === 'user' ? 'bg-[#FF5B4C] text-white rounded-br-none' : 'bg-[#22252E] text-white rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-[#0F1015] border-t border-[#2C303E] flex gap-2">
              <input 
                type="text" 
                placeholder="Xabar yozing..." 
                className="flex-1 bg-[#181A20] border border-[#2C303E] text-white text-xs p-2.5 rounded-xl outline-none focus:border-[#16C2B2]"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="bg-[#16C2B2] text-[#0F1015] p-2.5 rounded-xl font-bold"><Send size={16} /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
