'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Car, Flame, RefreshCw } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

const TERMIZ_DISTRICTS = [
  { id: 1, district: 'Termiz Markaz (Al-Hakim at-Tirmiziy)' },
  { id: 2, district: 'TerDU Campus (Termiz Davlat Univ)' },
  { id: 3, district: 'Termiz Avtovokzal' },
  { id: 4, district: 'San\'at Saroyi va Teatr tumani' },
  { id: 5, district: 'Indorama MFY (Sanoat zonasi)' },
  { id: 6, district: 'Termiz Aeroporti' },
];

export default function TermizHeatmapPage() {
  const [loading, setLoading] = useState(true);
  const [districtCounts, setDistrictCounts] = useState({});

  const fetchRealHeatmap = async () => {
    setLoading(true);
    try {
      const { data: rides } = await supabase.from('taxi_rides').select('*');
      const { data: orders } = await supabase.from('orders').select('*');

      const counts = {};
      TERMIZ_DISTRICTS.forEach(d => { counts[d.district] = 0; });

      if (rides) {
        rides.forEach(r => {
          if (r.from_address) {
            TERMIZ_DISTRICTS.forEach(d => {
              if (r.from_address.toLowerCase().includes(d.district.toLowerCase())) {
                counts[d.district] = (counts[d.district] || 0) + 1;
              }
            });
          }
        });
      }

      if (orders) {
        orders.forEach(o => {
          if (o.address) {
            TERMIZ_DISTRICTS.forEach(d => {
              if (o.address.toLowerCase().includes(d.district.toLowerCase())) {
                counts[d.district] = (counts[d.district] || 0) + 1;
              }
            });
          }
        });
      }

      setDistrictCounts(counts);
    } catch (err) {
      console.error('Fetch heatmap error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealHeatmap();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Flame className="text-[#FF5B4C]" size={22} />
            Termiz Shahri Real Talab Issiq Xaritasi (Heatmap)
          </h1>
          <p className="text-xs text-gray-400">Termiz tumanlari va hududlaridagi haqiqiy bazaviy buyurtmalar intensivligi</p>
        </div>
        <button 
          onClick={fetchRealHeatmap}
          className="flex items-center gap-1.5 bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] text-[#16C2B2] px-3 py-2 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Real Yangilash
        </button>
      </div>

      {/* Real Heatmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TERMIZ_DISTRICTS.map((item) => {
          const count = districtCounts[item.district] || 0;
          const isHigh = count >= 5;
          const isMedium = count > 0 && count < 5;

          const colorStyle = isHigh 
            ? 'bg-red-500/10 border-red-500/50 text-red-400' 
            : isMedium 
            ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' 
            : 'bg-[#181A20] border-[#2C303E] text-gray-400';

          const demandLabel = isHigh ? 'Yuqori 🔥' : isMedium ? 'O\'rta ⚡' : 'Tinch 🍃';

          return (
            <div key={item.id} className={`p-5 rounded-2xl border ${colorStyle} shadow-xl transition-all`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span className="font-extrabold text-sm text-white">{item.district}</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#0F1015] border border-current">
                  {demandLabel}
                </span>
              </div>
              
              <div className="flex justify-between items-end mt-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold block">Real buyurtmalar soni:</span>
                  <span className="text-2xl font-black text-white">{count} <span className="text-xs text-gray-400">ta</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Termiz Map Simulation */}
      <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <h3 className="text-sm font-extrabold text-white mb-4">Termiz Shahri Real Intensivlik Tarmog'i</h3>
        <div className="h-64 bg-[#0F1015] rounded-2xl border border-[#2C303E] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#16C2B2_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 text-center">
            <Flame size={36} className="text-[#FF5B4C] mx-auto mb-2" />
            <span className="text-xs font-extrabold text-white">Termiz Real Talab Integratsiyasi</span>
            <p className="text-[10px] text-gray-400 mt-1">Foydalanuvchilar real buyurtma berganida ushbu xaritada ko'rsatkichlar oshib boradi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
