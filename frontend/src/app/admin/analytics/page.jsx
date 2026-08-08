'use client';

import React from 'react';
import { TrendingUp, DollarSign, Car, ShoppingBag, Users, ArrowUpRight, BarChart3 } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const weeklyStats = [
    { day: 'Dush', revenue: 4200000, rides: 142 },
    { day: 'Sesh', revenue: 5100000, rides: 178 },
    { day: 'Chorsh', revenue: 4800000, rides: 160 },
    { day: 'Pay', revenue: 6200000, rides: 210 },
    { day: 'Jum', revenue: 7500000, rides: 255 },
    { day: 'Shan', revenue: 8900000, rides: 310 },
    { day: 'Yak', revenue: 9400000, rides: 340 },
  ];

  const maxRevenue = Math.max(...weeklyStats.map(s => s.revenue));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <BarChart3 className="text-[#16C2B2]" size={22} />
            UzGo Analitika va Tushum Statistikasi (Termiz)
          </h1>
          <p className="text-xs text-gray-400">Kunlik va haftalik platforma aylanmalari hamda tushumlari</p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400">Haftalik Tushum</span>
            <span className="text-xs text-green-400 font-extrabold flex items-center gap-1"><TrendingUp size={12} /> +18.4%</span>
          </div>
          <div className="text-xl font-black text-white mt-2">46,100,000 so'm</div>
          <span className="text-[10px] text-gray-500 mt-1 block">Termiz taksi & market tushumi</span>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400">Jami Safarlar</span>
            <span className="text-xs text-[#16C2B2] font-extrabold flex items-center gap-1"><TrendingUp size={12} /> +12.1%</span>
          </div>
          <div className="text-xl font-black text-[#16C2B2] mt-2">1,595 ta</div>
          <span className="text-[10px] text-gray-500 mt-1 block">Taksi & Mototaksi</span>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400">Net Sof Foyda (10%)</span>
            <span className="text-xs text-[#F2A93B] font-extrabold">Komissiya</span>
          </div>
          <div className="text-xl font-black text-[#F2A93B] mt-2">4,610,000 so'm</div>
          <span className="text-[10px] text-gray-500 mt-1 block">UzGo platformasi daromadi</span>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400">Faol Haydovchilar</span>
            <span className="text-xs text-blue-400 font-extrabold">● Real-time</span>
          </div>
          <div className="text-xl font-black text-white mt-2">42 nafar</div>
          <span className="text-[10px] text-gray-500 mt-1 block">Termiz bo'yicha navbatchilikda</span>
        </div>
      </div>

      {/* Visual Revenue Bar Chart */}
      <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 shadow-xl">
        <h3 className="text-sm font-extrabold text-white mb-6">Haftalik Tushum Dinamikasi (So'mda)</h3>
        
        <div className="h-64 flex items-end justify-between gap-2 pt-8 border-b border-[#2C303E] pb-2">
          {weeklyStats.map((item, index) => {
            const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] text-gray-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {(item.revenue / 1000000).toFixed(1)}M
                </div>
                <div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-[#16C2B2] to-[#FFE066] rounded-t-xl transition-all duration-500 group-hover:scale-105 shadow-lg shadow-[#16C2B2]/20"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs font-bold text-gray-400 mt-1">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
