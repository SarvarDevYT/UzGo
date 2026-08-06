import React, { useState, useEffect } from 'react';
import { Users, ShoppingCart, Car, DollarSign, Activity, BellRing, TrendingUp, TrendingDown } from 'lucide-react';
// import api from '../../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const response = await api.get('/admin/stats');
        // setStats(response.data);
        throw new Error('API not implemented, using mock');
      } catch (error) {
        // Fallback Mock Data
        setTimeout(() => {
          setStats({
            totalUsers: { value: 12450, trend: +12.5 },
            totalOrders: { value: 3420, trend: +8.2 },
            totalRides: { value: 5120, trend: +15.3 },
            totalRevenue: { value: '450.5M', trend: +22.4 },
            activeDrivers: { value: 450, trend: +5.1 },
            newOrders: { value: 125, trend: -2.4 },
            recentOrders: [
              { id: '#ORD-0012', user: 'Ali Valiyev', amount: '125,000 UZS', status: 'pending', date: '10:45, 12 Sen' },
              { id: '#ORD-0013', user: 'Zarina Rustamova', amount: '85,000 UZS', status: 'delivered', date: '09:30, 12 Sen' },
              { id: '#ORD-0014', user: 'Olimjon Tohirov', amount: '210,000 UZS', status: 'processing', date: '08:15, 12 Sen' },
            ],
            recentRides: [
              { driver: 'Murod N.', car: 'Cobalt (01 A 123 AA)', price: '35,000 UZS', status: 'completed', date: '11:00, 12 Sen' },
              { driver: 'Sanjar T.', car: 'Spark (01 B 456 BB)', price: '22,000 UZS', status: 'active', date: '10:55, 12 Sen' },
            ]
          });
          setLoading(false);
        }, 800);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-[#1f2937] h-32 rounded-xl border border-[#374151]"></div>
        ))}
      </div>
    );
  }

  const statCards = [
    { title: 'Jami foydalanuvchilar', value: stats.totalUsers.value, trend: stats.totalUsers.trend, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Jami buyurtmalar', value: stats.totalOrders.value, trend: stats.totalOrders.trend, icon: ShoppingCart, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Jami sayohatlar', value: stats.totalRides.value, trend: stats.totalRides.trend, icon: Car, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { title: 'Umumiy daromad', value: stats.totalRevenue.value, trend: stats.totalRevenue.trend, icon: DollarSign, color: 'text-[#FFC300]', bg: 'bg-[#FFC300]/10' },
    { title: 'Faol haydovchilar', value: stats.activeDrivers.value, trend: stats.activeDrivers.trend, icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Yangi buyurtmalar', value: stats.newOrders.value, trend: stats.newOrders.trend, icon: BellRing, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-[#1f2937] p-5 rounded-xl border border-[#374151] shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center text-sm font-medium ${stat.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {Math.abs(stat.trend)}%
              </div>
            </div>
            <div>
              <h3 className="text-[#9ca3af] text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Orders */}
        <div className="bg-[#1f2937] rounded-xl border border-[#374151] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#374151] flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Oxirgi buyurtmalar</h2>
            <button className="text-sm text-[#FFC300] hover:underline">Barchasini ko'rish</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#0d1b3e] text-xs uppercase text-gray-400 border-b border-[#374151]">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Foydalanuvchi</th>
                  <th className="px-5 py-3">Summa</th>
                  <th className="px-5 py-3">Holat</th>
                  <th className="px-5 py-3">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#374151]">
                {stats.recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-[#1a2744] transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{order.id}</td>
                    <td className="px-5 py-4">{order.user}</td>
                    <td className="px-5 py-4">{order.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#9ca3af]">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="bg-[#1f2937] rounded-xl border border-[#374151] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#374151] flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Oxirgi sayohatlar</h2>
            <button className="text-sm text-[#FFC300] hover:underline">Barchasini ko'rish</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#0d1b3e] text-xs uppercase text-gray-400 border-b border-[#374151]">
                <tr>
                  <th className="px-5 py-3">Haydovchi</th>
                  <th className="px-5 py-3">Narx</th>
                  <th className="px-5 py-3">Holat</th>
                  <th className="px-5 py-3">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#374151]">
                {stats.recentRides.map((ride, i) => (
                  <tr key={i} className="hover:bg-[#1a2744] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{ride.driver}</p>
                      <p className="text-xs text-[#9ca3af]">{ride.car}</p>
                    </td>
                    <td className="px-5 py-4">{ride.price}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ride.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {ride.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#9ca3af]">{ride.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
