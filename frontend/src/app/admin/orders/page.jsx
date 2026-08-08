'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Search, RefreshCw, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setOrders(data);
    } else {
      // Mock Fallback
      setOrders([
        { id: '1', user_name: 'Aziz Rahimov', phone: '+998901234567', order_type: 'market', total_price: 145000, address: 'Chilonzor 8-kv', status: 'pending', created_at: '14:30' },
        { id: '2', user_name: 'Malika V.', phone: '+998912345678', order_type: 'delivery', total_price: 210000, address: 'Yunusobod 12', status: 'processing', created_at: '14:15' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.user_name?.toLowerCase().includes(search.toLowerCase()) || o.id?.toString().includes(search);
    const matchTab = activeTab === 'all' || o.order_type === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Buyurtmalar Boshqaruvi</h1>
          <p className="text-xs text-gray-400">Supabase PostgreSQL real-vaqt buyurtmalari</p>
        </div>

        <button 
          onClick={fetchOrders}
          className="p-2.5 bg-[#181A20] text-gray-300 hover:text-[#FFCC00] border border-[#2C303E] rounded-xl transition-colors"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#2C303E]">
          <button 
            className={`flex-1 py-3 text-center font-bold text-xs uppercase tracking-wider transition-colors ${activeTab === 'all' ? 'bg-[#FFCC00]/10 text-[#FFCC00] border-b-2 border-[#FFCC00]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('all')}
          >
            Barchasi
          </button>
          <button 
            className={`flex-1 py-3 text-center font-bold text-xs uppercase tracking-wider transition-colors ${activeTab === 'market' ? 'bg-[#FFCC00]/10 text-[#FFCC00] border-b-2 border-[#FFCC00]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('market')}
          >
            Market
          </button>
          <button 
            className={`flex-1 py-3 text-center font-bold text-xs uppercase tracking-wider transition-colors ${activeTab === 'delivery' ? 'bg-[#FFCC00]/10 text-[#FFCC00] border-b-2 border-[#FFCC00]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('delivery')}
          >
            Yetkazib berish
          </button>
        </div>

        <div className="p-4 border-b border-[#2C303E] flex justify-between items-center bg-[#0F1015]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Mijoz nomi yoki buyurtma..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#181A20] border border-[#2C303E] text-white rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFCC00]" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Mijoz</th>
                <th className="px-5 py-4">Turi</th>
                <th className="px-5 py-4">Jami Narx</th>
                <th className="px-5 py-4">Manzil</th>
                <th className="px-5 py-4">Holat (Tahrir)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Yuklanmoqda...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Buyurtmalar yo'q</td></tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#22252E] transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-white">#{o.id.toString().slice(0, 8)}</td>
                    <td className="px-5 py-4 font-semibold text-white">
                      <div>{o.user_name}</div>
                      <div className="text-xs text-gray-500 font-normal">{o.phone}</div>
                    </td>
                    <td className="px-5 py-4 text-xs font-bold uppercase">{o.order_type}</td>
                    <td className="px-5 py-4 font-black text-[#FFCC00]">{o.total_price?.toLocaleString('ru-RU')} so'm</td>
                    <td className="px-5 py-4 text-gray-400 text-xs truncate max-w-[150px]">{o.address}</td>
                    <td className="px-5 py-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase border outline-none cursor-pointer bg-[#0F1015] ${getStatusBadge(o.status)}`}
                      >
                        <option value="pending">Kutilmoqda</option>
                        <option value="processing">Jarayonda</option>
                        <option value="delivered">Yetkazildi</option>
                        <option value="cancelled">Bekor qilindi</option>
                      </select>
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
