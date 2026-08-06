'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Search, Loader2 } from 'lucide-react';
import TariffCard from '../../modules/taxi/components/TariffCard';
import DriverCard from '../../modules/taxi/components/DriverCard';

const TASHKENT_DISTRICTS = [
  'Chilonzor', 'Yunusobod', 'Mirzo Ulugbek', 'Sergeli', 
  'Shayxontohur', 'Olmazor', 'Bektemir', 'Uchtepa'
];

const MOCK_DRIVER = {
  name: 'Rustamjon T.',
  carModel: 'Chevrolet Cobalt (Oq)',
  plateNumber: '01 A 123 AA',
  rating: 4.9,
  phone: '+998901234567'
};

export default function TaxiPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState('economy');
  const [status, setStatus] = useState('idle'); // idle | searching | found

  const handleSearch = () => {
    if (!from || !to) return;
    setStatus('searching');
    
    setTimeout(() => {
      setStatus('found');
    }, 3000);
  };

  const handleCancel = () => {
    setStatus('idle');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-dark-bg overflow-hidden relative">
      {/* Mock Map Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a237e" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {status !== 'idle' && (
            <path d="M 50 150 Q 150 200 250 100 T 350 250" fill="none" stroke="#ffc107" strokeWidth="3" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
          )}
        </svg>
      </div>

      <div className="flex-1 overflow-y-auto p-4 z-10 flex flex-col justify-end">
        
        {status === 'idle' && (
          <div className="bg-dark-card rounded-2xl p-4 shadow-xl border border-dark-border animate-in slide-in-from-bottom-8">
            <h2 className="text-xl font-bold text-dark-text mb-4">Qayerga boramiz?</h2>
            
            {/* Address Inputs */}
            <div className="relative flex flex-col gap-3 mb-6">
              <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-dark-border z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center bg-dark-bg rounded-xl p-3 border border-dark-border focus-within:border-primary-900 transition-colors">
                  <MapPin className="text-primary-900 mr-3 shrink-0" size={20} />
                  <input 
                    type="text" 
                    placeholder="Qayerdan" 
                    className="bg-transparent w-full outline-none text-dark-text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onFocus={() => setShowFromDropdown(true)}
                    onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                  />
                </div>
                {showFromDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-dark-card border border-dark-border rounded-xl shadow-lg z-20 max-h-40 overflow-y-auto">
                    {TASHKENT_DISTRICTS.filter(d => d.toLowerCase().includes(from.toLowerCase())).map(district => (
                      <div 
                        key={`from-${district}`} 
                        className="p-3 border-b border-dark-border/50 hover:bg-dark-bg cursor-pointer text-dark-text"
                        onClick={() => { setFrom(district); setShowFromDropdown(false); }}
                      >
                        {district} tumani
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <div className="flex items-center bg-dark-bg rounded-xl p-3 border border-dark-border focus-within:border-accent transition-colors">
                  <Navigation className="text-accent mr-3 shrink-0" size={20} />
                  <input 
                    type="text" 
                    placeholder="Qayerga" 
                    className="bg-transparent w-full outline-none text-dark-text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => setShowToDropdown(true)}
                    onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                  />
                </div>
                {showToDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-dark-card border border-dark-border rounded-xl shadow-lg z-20 max-h-40 overflow-y-auto">
                    {TASHKENT_DISTRICTS.filter(d => d.toLowerCase().includes(to.toLowerCase())).map(district => (
                      <div 
                        key={`to-${district}`} 
                        className="p-3 border-b border-dark-border/50 hover:bg-dark-bg cursor-pointer text-dark-text"
                        onClick={() => { setTo(district); setShowToDropdown(false); }}
                      >
                        {district} tumani
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tariffs */}
            <h3 className="text-sm font-semibold text-dark-text/70 mb-3">Tarifni tanlang</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <TariffCard 
                tariff="economy" 
                price="12 000" 
                duration="~3 min"
                isSelected={selectedTariff === 'economy'}
                onSelect={setSelectedTariff}
              />
              <TariffCard 
                tariff="comfort" 
                price="18 000" 
                duration="~5 min"
                isSelected={selectedTariff === 'comfort'}
                onSelect={setSelectedTariff}
              />
              <TariffCard 
                tariff="premium" 
                price="35 000" 
                duration="~8 min"
                isSelected={selectedTariff === 'premium'}
                onSelect={setSelectedTariff}
              />
            </div>

            <button 
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                from && to 
                  ? 'bg-accent text-dark-bg hover:bg-yellow-400 active:scale-[0.98]' 
                  : 'bg-dark-border text-dark-text/50 cursor-not-allowed'
              }`}
              onClick={handleSearch}
              disabled={!from || !to}
            >
              <Search size={20} />
              Haydovchi qidirish
            </button>
          </div>
        )}

        {status === 'searching' && (
          <div className="bg-dark-card rounded-2xl p-8 shadow-xl border border-dark-border flex flex-col items-center justify-center h-64 animate-in zoom-in-95">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-primary-900/20 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-20 h-20 bg-primary-900/40 rounded-full flex items-center justify-center relative z-10">
                <Loader2 size={40} className="text-primary-900 animate-spin" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-dark-text mb-2">Haydovchi qidirilmoqda...</h2>
            <p className="text-dark-text/60 text-sm text-center">Iltimos kuting, yaqin atrofda mos haydovchilarni izlayapmiz</p>
            <button 
              className="mt-6 text-red-500 font-semibold text-sm hover:underline"
              onClick={handleCancel}
            >
              Bekor qilish
            </button>
          </div>
        )}

        {status === 'found' && (
          <div className="flex flex-col gap-4">
            <div className="bg-green-500/20 text-green-500 p-3 rounded-xl border border-green-500/30 text-center font-medium animate-pulse">
              🎉 Haydovchi topildi! U siz tomonga yo'l oldi.
            </div>
            <DriverCard driver={MOCK_DRIVER} onCancel={handleCancel} />
          </div>
        )}
      </div>
    </div>
  );
}
