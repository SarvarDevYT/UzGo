'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Banknote, CreditCard, ShieldCheck } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');

  const fetchOrders = () => {
    setLoading(true);
    supabase.from('orders').select('*').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setOrders(data);
        } else {
          setOrders([
            { id: '1042', user_name: 'Sarvarbek', phone: '+998901234567', total_price: 340000, payment_method: 'cash', address: 'Termiz shahar, Al-Hakim at-Tirmiziy ko\'chasi, 14-uy', status: 'pending' },
            { id: '1041', user_name: 'Jamshidbek', phone: '+998912345678', total_price: 890000, payment_method: 'click', address: 'Termiz, Indorama MFY', status: 'processing' },
            { id: '1039', user_name: 'Dilnoza', phone: '+998935554433', total_price: 560000, payment_method: 'payme', address: 'Termiz, TerDU Talabalar shaharchasi', status: 'delivered' },
          ]);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      fetchOrders();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const filtered = orders.filter(o => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    if (filterPayment !== 'all' && o.payment_method !== filterPayment) return false;
    return true;
  });

  const cashTotal = orders.filter(o => o.payment_method === 'cash').reduce((sum, o) => sum + (o.total_price || 0), 0);
  const onlineTotal = orders.filter(o => o.payment_method === 'click' || o.payment_method === 'payme').reduce((sum, o) => sum + (o.total_price || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <ShoppingCart className="text-[#16C2B2]" size={22} />
            Buyurtmalar Boshqaruvi va To'lovlar (Termiz)
          </h1>
          <p className="text-xs text-gray-400">Naqd va onlayn (Click / Payme) buyurtmalar statistikasi</p>
        </div>
      </div>

      {/* Cash vs Online Totals Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-bold block mb-1">💵 Naqd Pul Hisobi</span>
            <span className="text-xl font-black text-[#F2A93B]">{cashTotal.toLocaleString('ru-RU')} so'm</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/10 border border-[#F2A93B]/30 flex items-center justify-center text-[#F2A93B]">
            <Banknote size={20} />
          </div>
        </div>

        <div className="bg-[#181A20] border border-[#2C303E] rounded-2xl p-5 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-bold block mb-1">💳 Onlayn (Click/Payme)</span>
            <span className="text-xl font-black text-[#16C2B2]">{onlineTotal.toLocaleString('ru-RU')} so'm</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#16C2B2]/10 border border-[#16C2B2]/30 flex items-center justify-center text-[#16C2B2]">
            <CreditCard size={20} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <select 
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-[#181A20] border border-[#2C303E] text-white text-xs font-bold p-3 rounded-xl outline-none"
        >
          <option value="all">Barcha Holatlar</option>
          <option value="pending">Kutilmoqda</option>
          <option value="processing">Jarayonda</option>
          <option value="delivered">Yetkazildi</option>
        </select>

        <select 
          value={filterPayment}
          onChange={e => setFilterPayment(e.target.value)}
          className="bg-[#181A20] border border-[#2C303E] text-white text-xs font-bold p-3 rounded-xl outline-none"
        >
          <option value="all">Barcha To'lovlar</option>
          <option value="cash">Naqd pul</option>
          <option value="click">Click</option>
          <option value="payme">Payme</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-3.5">ID</th>
                <th className="px-5 py-3.5">Mijoz</th>
                <th className="px-5 py-3.5">Manzil</th>
                <th className="px-5 py-3.5">Summa</th>
                <th className="px-5 py-3.5">To'lov Usuli</th>
                <th className="px-5 py-3.5">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">Yuklanmoqda...</td>
                </tr>
              ) : filtered.map((o) => (
                <tr key={o.id} className="hover:bg-[#22252E] transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-white">#{o.id.toString().slice(0, 8)}</td>
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-white text-xs">{o.user_name}</div>
                    <div className="text-[10px] text-gray-400">{o.phone}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400 max-w-xs truncate">{o.address}</td>
                  <td className="px-5 py-3.5 font-black text-[#16C2B2]">{(o.total_price || 0).toLocaleString('ru-RU')} so'm</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                      o.payment_method === 'cash' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {o.payment_method || 'cash'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={o.status || 'pending'}
                      onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                      className="bg-[#0F1015] border border-[#2C303E] text-xs font-bold text-white p-2 rounded-xl outline-none"
                    >
                      <option value="pending">Kutilmoqda</option>
                      <option value="processing">Jarayonda</option>
                      <option value="delivered">Yetkazildi</option>
                    </select>
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
