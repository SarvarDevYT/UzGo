'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Users, Car, ShoppingBag, DollarSign, Plus } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: '24.6M',
    activeOrders: 183,
    onlineDrivers: 47,
    newUsers: 312,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    supabase.from('orders').select('*').limit(5).order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setRecentOrders(data);
        } else {
          setRecentOrders([
            { id: '1042', user_name: 'Simsiz quloqchin', total_price: 340000, status: 'pending' },
            { id: '1041', user_name: 'Smart soat X2', total_price: 890000, status: 'processing' },
            { id: '1039', user_name: 'Sport krossovka', total_price: 560000, status: 'delivered' },
          ]);
        }
      });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
          <p className="text-xs text-gray-400">Bugungi umumiy statistika va ko'rsatkichlar</p>
        </div>

        <Link 
          href="/admin/products"
          className="flex items-center gap-2 bg-[#FFCC00] hover:bg-yellow-400 text-[#0F1015] font-black py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-[#FFCC00]/20 text-xs uppercase"
        >
          <Plus size={16} /> Mahsulot qo'shish
        </Link>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Bugungi daromad</span>
          <div className="text-2xl font-black text-white">{stats.revenue} <span className="text-xs font-medium text-gray-400">so'm</span></div>
          <div className="text-xs font-bold text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> ↑ 12.4% o'sish
          </div>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Faol buyurtmalar</span>
          <div className="text-2xl font-black text-white">{stats.activeOrders} <span className="text-xs font-medium text-gray-400">ta</span></div>
          <div className="text-xs font-bold text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> ↑ 6.1%
          </div>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Onlayn haydovchilar</span>
          <div className="text-2xl font-black text-white">{stats.onlineDrivers} <span className="text-xs font-medium text-gray-400">onlayn</span></div>
          <div className="text-xs font-bold text-red-400 mt-2 flex items-center gap-1">
            <TrendingDown size={14} /> ↓ 2.3%
          </div>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Yangi foydalanuvchilar</span>
          <div className="text-2xl font-black text-white">{stats.newUsers} <span className="text-xs font-medium text-gray-400">ta</span></div>
          <div className="text-xs font-bold text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> ↑ 18.9%
          </div>
        </div>
      </div>

      {/* Chart Bar Box */}
      <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Haftalik Daromad Grafigi</h3>
        <div className="flex items-end gap-3 h-28 pt-4 border-b border-[#2C303E] pb-2">
          {[40, 65, 52, 80, 45, 70, 95].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <div 
                style={{ height: `${h}%` }} 
                className="w-full bg-gradient-to-t from-[#FFCC00]/20 to-[#FFCC00] rounded-t-lg transition-all duration-500 hover:brightness-125"
              ></div>
              <span className="text-[10px] text-gray-500 font-semibold">{['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#2C303E] flex justify-between items-center bg-[#0F1015]">
          <h3 className="text-sm font-bold text-white">So'nggi Buyurtmalar</h3>
          <Link href="/admin/orders" className="text-xs text-[#FFCC00] font-bold hover:underline">Barchasini ko'rish →</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-3.5">ID</th>
                <th className="px-5 py-3.5">Mijoz / Mahsulot</th>
                <th className="px-5 py-3.5">Summa</th>
                <th className="px-5 py-3.5">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {recentOrders.map((o, idx) => (
                <tr key={idx} className="hover:bg-[#22252E] transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-white">#{o.id.toString().slice(0, 8)}</td>
                  <td className="px-5 py-3.5 font-semibold text-white">{o.user_name}</td>
                  <td className="px-5 py-3.5 font-black text-[#FFCC00]">{o.total_price?.toLocaleString('ru-RU')} so'm</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                      o.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      o.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {o.status === 'pending' ? 'Kutilmoqda' : o.status === 'processing' ? 'Jarayonda' : 'Yetkazildi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
