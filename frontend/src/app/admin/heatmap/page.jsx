'use client';

import React from 'react';
import { MapPin, TrendingUp, Car, Flame, RefreshCw } from 'lucide-react';

const TERMIZ_HEATMAP_DATA = [
  { id: 1, district: 'Termiz Markaz (Al-Hakim at-Tirmiziy)', rides: 142, demand: 'Yuqori 🔥', color: 'bg-red-500/20 border-red-500 text-red-400' },
  { id: 2, district: 'TerDU Campus (Termiz Davlat Univ)', rides: 98, demand: 'Yuqori 🔥', color: 'bg-red-500/20 border-red-500 text-red-400' },
  { id: 3, district: 'Termiz Avtovokzal', rides: 85, demand: 'O\'rta ⚡', color: 'bg-yellow-500/20 border-yellow-500 text-yellow-400' },
  { id: 4, district: 'San\'at Saroyi va Teatr tumani', rides: 64, demand: 'O\'rta ⚡', color: 'bg-yellow-500/20 border-yellow-500 text-yellow-400' },
  { id: 5, district: 'Indorama MFY (Sanoat zonasi)', rides: 42, demand: 'Normall 👍', color: 'bg-green-500/20 border-green-500 text-green-400' },
  { id: 6, district: 'Termiz Aeroporti', rides: 38, demand: 'Normall 👍', color: 'bg-green-500/20 border-green-500 text-green-400' },
];

export default function TermizHeatmapPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Flame className="text-[#FF5B4C]" size={22} />
            Termiz Shahri Talab Issiq Xaritasi (Heatmap)
          </h1>
          <p className="text-xs text-gray-400">Termiz tumanlari va hududlaridagi real-vaqt buyurtmalar intensivligi</p>
        </div>
        <button onClick={() => window.location.reload()} className="flex items-center gap-1.5 bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] text-[#16C2B2] px-3 py-2 rounded-xl text-xs font-bold transition-all">
          <RefreshCw size={14} /> Yangilash
        </button>
      </div>

      {/* Visual Heatmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TERMIZ_HEATMAP_DATA.map((item) => (
          <div key={item.id} className={`p-5 rounded-2xl border ${item.color} shadow-xl transition-all hover:scale-105`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="font-extrabold text-sm text-white">{item.district}</span>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#0F1015] border border-current">
                {item.demand}
              </span>
            </div>
            
            <div className="flex justify-between items-end mt-4">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">So'nggi 2 soatdagi buyurtmalar:</span>
                <span className="text-2xl font-black text-white">{item.rides} <span className="text-xs text-gray-400">ta</span></span>
              </div>
              <span className="text-xs font-bold text-[#16C2B2] flex items-center gap-1">
                <TrendingUp size={14} /> +14.2%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Termiz SVG Interactive Map Simulation */}
      <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <h3 className="text-sm font-extrabold text-white mb-4">Termiz Shahri Hududiy Intensivlik Tarmog'i</h3>
        <div className="h-64 bg-[#0F1015] rounded-2xl border border-[#2C303E] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#16C2B2_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Simulated Hotspots */}
          <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-red-500/30 rounded-full filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-yellow-500/30 rounded-full filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-green-500/30 rounded-full filter blur-xl animate-pulse"></div>

          <div className="relative z-10 text-center">
            <Flame size={36} className="text-[#FF5B4C] mx-auto mb-2 animate-bounce" />
            <span className="text-xs font-extrabold text-white">Termiz Markaz & TerDU hududida eng yuqori talab!</span>
            <p className="text-[10px] text-gray-400 mt-1">Haydovchilarga ushbu hududlarga borish tavsiya etiladi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
