import React, { useState } from 'react';
import { Eye, Clock, CheckCircle, Truck, XCircle, Search } from 'lucide-react';

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState('market');

  const orders = [
    { id: '#ORD-1001', type: 'market', user: 'Aziz Rahimov', items: 3, total: '145,000 UZS', address: 'Chilonzor 8-kv', status: 'pending', date: '14:30, 12 Sen' },
    { id: '#ORD-1002', type: 'market', user: 'Malika V.', items: 1, total: '45,000 UZS', address: 'Yunusobod 12-kv', status: 'processing', date: '14:15, 12 Sen' },
    { id: '#ORD-1003', type: 'delivery', user: 'Umid S.', items: 2, total: '210,000 UZS', address: 'M.Ulugbek dist.', status: 'delivered', date: '13:00, 12 Sen' },
    { id: '#ORD-1004', type: 'market', user: 'Shahnoza Q.', items: 5, total: '450,000 UZS', address: 'Sergeli 4', status: 'cancelled', date: '12:45, 12 Sen' },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="mr-1" />;
      case 'processing': return <Truck size={16} className="mr-1" />;
      case 'delivered': return <CheckCircle size={16} className="mr-1" />;
      case 'cancelled': return <XCircle size={16} className="mr-1" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredOrders = orders.filter(o => o.type === activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Buyurtmalar</h1>

      <div className="bg-[#1f2937] rounded-xl border border-[#374151] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#374151]">
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'market' ? 'bg-[#1a2744] text-[#FFC300] border-b-2 border-[#FFC300]' : 'text-gray-400 hover:text-white hover:bg-[#111827]'}`}
            onClick={() => setActiveTab('market')}
          >
            Market buyurtmalari
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'delivery' ? 'bg-[#1a2744] text-[#FFC300] border-b-2 border-[#FFC300]' : 'text-gray-400 hover:text-white hover:bg-[#111827]'}`}
            onClick={() => setActiveTab('delivery')}
          >
            Yetkazib berish
          </button>
        </div>

        <div className="p-4 border-b border-[#374151] flex justify-between items-center bg-[#111827]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Buyurtma ID orqali..." className="w-full bg-[#1f2937] border border-[#374151] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#FFC300]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0d1b3e] text-xs uppercase text-gray-400 border-b border-[#374151]">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Foydalanuvchi</th>
                <th className="px-5 py-4">Mahsulotlar</th>
                <th className="px-5 py-4">Jami narx</th>
                <th className="px-5 py-4">Manzil</th>
                <th className="px-5 py-4">Holat</th>
                <th className="px-5 py-4">Sana</th>
                <th className="px-5 py-4 text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]">
              {filteredOrders.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-8 text-gray-500">Buyurtmalar yo'q</td></tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#1a2744] transition-colors">
                    <td className="px-5 py-4 font-mono font-medium text-white">{order.id}</td>
                    <td className="px-5 py-4">{order.user}</td>
                    <td className="px-5 py-4">{order.items} ta</td>
                    <td className="px-5 py-4 font-bold text-white">{order.total}</td>
                    <td className="px-5 py-4 truncate max-w-[150px]" title={order.address}>{order.address}</td>
                    <td className="px-5 py-4">
                      <select 
                        className={`px-2 py-1.5 rounded-lg text-xs font-semibold uppercase outline-none cursor-pointer border border-transparent appearance-none ${getStatusColor(order.status)}`}
                        defaultValue={order.status}
                      >
                        <option value="pending">Kutilmoqda</option>
                        <option value="processing">Jarayonda</option>
                        <option value="delivered">Yetkazildi</option>
                        <option value="cancelled">Bekor qilindi</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-[#9ca3af]">{order.date}</td>
                    <td className="px-5 py-4 text-right">
                      <button className="p-2 bg-[#111827] text-gray-300 hover:text-[#FFC300] hover:bg-[#0d1b3e] border border-[#374151] rounded-lg transition-colors flex items-center justify-center ml-auto">
                        <Eye size={18} />
                      </button>
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
};

export default AdminOrders;
