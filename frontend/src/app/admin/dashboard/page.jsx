'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Users, Car, ShoppingBag, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    activeOrders: 0,
    onlineDrivers: 0,
    totalUsers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const fetchLiveDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Query real orders from Supabase
      const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      
      // 2. Query real profiles from Supabase
      const { data: profilesData } = await supabase.from('profiles').select('*');

      // 3. Query real taxi rides from Supabase
      const { data: ridesData } = await supabase.from('taxi_rides').select('*');

      let totalRevenue = 0;
      let pendingCount = 0;
      let driversCount = 0;
      let usersCount = 0;

      if (ordersData) {
        setRecentOrders(ordersData.slice(0, 5));
        totalRevenue += ordersData.reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);
        pendingCount += ordersData.filter(o => o.status === 'pending' || o.status === 'processing').length;
      } else {
        setRecentOrders([]);
      }

      if (ridesData) {
        totalRevenue += ridesData.reduce((sum, r) => sum + (Number(r.price) || 0), 0);
        pendingCount += ridesData.filter(r => r.status === 'searching' || r.status === 'accepted').length;
      }

      if (profilesData) {
        usersCount = profilesData.length;
        driversCount = profilesData.filter(p => p.role === 'driver').length;
      }

      setStats({
        revenue: totalRevenue,
        activeOrders: pendingCount,
        onlineDrivers: driversCount,
        totalUsers: usersCount,
      });

    } catch (err) {
      console.error('Fetch dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard — Aniq Real Statistika</h1>
          <p className="text-xs text-gray-400">Termiz Super-App bazaviy real ma'lumotlar bazasidan hisoblangan ko'rsatkichlar</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={fetchLiveDashboardData}
            className="flex items-center gap-1.5 bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] text-[#16C2B2] font-bold py-2.5 px-3 rounded-xl text-xs"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Real Yangilash
          </button>

          <Link 
            href="/admin/products"
            className="flex items-center gap-1.5 bg-[#16C2B2] hover:bg-[#13B0A2] text-[#0F1015] font-black py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-[#16C2B2]/20 text-xs"
          >
            <Plus size={16} /> Mahsulot Qo'shish
          </Link>
        </div>
      </div>

      {/* Real Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Jami Daromad (Haqiqiy)</span>
          <div className="text-2xl font-black text-[#16C2B2]">
            {stats.revenue.toLocaleString('ru-RU')} <span className="text-xs font-medium text-gray-400">so'm</span>
          </div>
          <div className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">
            • Real bazaviy aylanma
          </div>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Faol Buyurtmalar</span>
          <div className="text-2xl font-black text-white">{stats.activeOrders} <span className="text-xs font-medium text-gray-400">ta</span></div>
          <div className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">
            • Hozir jarayonda
          </div>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Flot Haydovchilari</span>
          <div className="text-2xl font-black text-white">{stats.onlineDrivers} <span className="text-xs font-medium text-gray-400">nafar</span></div>
          <div className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">
            • Baza profilidagi haydovchilar
          </div>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-bold text-gray-400 block mb-1">Jami Foydalanuvchilar</span>
          <div className="text-2xl font-black text-white">{stats.totalUsers} <span className="text-xs font-medium text-gray-400">ta</span></div>
          <div className="text-xs font-bold text-gray-500 mt-2 flex items-center gap-1">
            • Bazada ro'yxatdan o'tgan
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#2C303E] flex justify-between items-center bg-[#0F1015]">
          <h3 className="text-sm font-bold text-white">So'nggi Real Buyurtmalar</h3>
          <Link href="/admin/orders" className="text-xs text-[#16C2B2] font-bold hover:underline">Barchasini ko'rish →</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-3.5">ID</th>
                <th className="px-5 py-3.5">Mijoz</th>
                <th className="px-5 py-3.5">Summa</th>
                <th className="px-5 py-3.5">To'lov</th>
                <th className="px-5 py-3.5">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">Yuklanmoqda...</td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 font-medium">
                    Hozircha bazada real buyurtmalar mavjud emas (0 ta)
                  </td>
                </tr>
              ) : (
                recentOrders.map((o, idx) => (
                  <tr key={idx} className="hover:bg-[#22252E] transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-white">#{o.id.toString().slice(0, 8)}</td>
                    <td className="px-5 py-3.5 font-semibold text-white">{o.user_name || o.phone || 'Foydalanuvchi'}</td>
                    <td className="px-5 py-3.5 font-black text-[#16C2B2]">{(o.total_price || 0).toLocaleString('ru-RU')} so'm</td>
                    <td className="px-5 py-3.5">
                      <span className="bg-[#22252E] border border-[#2C303E] text-xs font-bold px-2 py-0.5 rounded-lg uppercase">
                        {o.payment_method || 'cash'}
                      </span>
                    </td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
