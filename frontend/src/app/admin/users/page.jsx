'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, DollarSign, Shield, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminUsersPage() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Balance Modal
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState(50000);
  const [actionType, setActionType] = useState('deposit');

  const fetchRealUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setUsersList(data);
      } else {
        setUsersList([]);
      }
    } catch (err) {
      console.error('Fetch real users error:', err);
      setUsersList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    } catch (err) {}
    fetchRealUsers();
    alert(`Foydalanuvchi roli '${newRole.toUpperCase()}'ga o'zgartirildi!`);
  };

  const handleBalanceAction = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const diff = actionType === 'deposit' ? amount : -amount;
    const newBal = Math.max(0, (selectedUser.balance || 0) + diff);

    try {
      await supabase.from('profiles').update({ balance: newBal }).eq('id', selectedUser.id);
    } catch (err) {}

    fetchRealUsers();
    setShowBalanceModal(false);
    alert(`Foydalanuvchi hamyoni balansi ${actionType === 'deposit' ? '+' : '-'}${amount.toLocaleString('ru-RU')} so'mga o'zgardi!`);
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Foydalanuvchini bazadan o'chirishga ishonchingiz komilmi?")) return;
    try {
      await supabase.from('profiles').delete().eq('id', id);
    } catch (err) {}
    fetchRealUsers();
  };

  const filtered = usersList.filter(u => 
    (u.name || '').toLowerCase().includes(search.toLowerCase()) || 
    (u.phone || '').includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="text-[#16C2B2]" size={24} />
            Foydalanuvchilar va Rollar Boshqaruvi (Real Baza)
          </h1>
          <p className="text-xs text-gray-400">Rollar o'zgartirish (Foydalanuvchi, Haydovchi, Admin) hamda Hamyon balansi</p>
        </div>
        <button 
          onClick={fetchRealUsers}
          className="flex items-center gap-1.5 bg-[#181A20] border border-[#2C303E] hover:border-[#16C2B2] text-[#16C2B2] font-bold py-2 px-3 rounded-xl text-xs"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Real Yangilash
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Foydalanuvchi ismi yoki telefon raqami..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#181A20] border border-[#2C303E] text-white text-xs font-medium outline-none focus:border-[#16C2B2]"
        />
      </div>

      {/* Users Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-3.5">Foydalanuvchi</th>
                <th className="px-5 py-3.5">Telefon</th>
                <th className="px-5 py-3.5">Rol (Ruxsat)</th>
                <th className="px-5 py-3.5">UzGo Hamyon Balansi</th>
                <th className="px-5 py-3.5">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">Yuklanmoqda...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 font-medium">
                    Hozircha bazada ro'yxatdan o'tgan foydalanuvchilar mavjud emas (0 ta)
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-[#22252E] transition-colors">
                    <td className="px-5 py-3.5 font-extrabold text-white">{u.name || u.phone || 'Foydalanuvchi'}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{u.phone}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={u.role || 'user'}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className={`text-xs font-black p-2 rounded-xl border outline-none cursor-pointer ${
                          u.role === 'admin' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                          u.role === 'driver' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                          'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        }`}
                      >
                        <option value="user" className="bg-[#181A20] text-white">Foydalanuvchi</option>
                        <option value="driver" className="bg-[#181A20] text-white">Haydovchi (Flot)</option>
                        <option value="admin" className="bg-[#181A20] text-white">Super Admin</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5 font-black text-[#16C2B2]">
                      {(u.balance || 0).toLocaleString('ru-RU')} so'm
                    </td>
                    <td className="px-5 py-3.5 flex items-center gap-2">
                      <button 
                        onClick={() => { setSelectedUser(u); setShowBalanceModal(true); }}
                        className="bg-[#16C2B2]/10 border border-[#16C2B2]/30 text-[#16C2B2] hover:bg-[#16C2B2]/20 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
                      >
                        <DollarSign size={14} /> Balans
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Balance Deposit / Withdraw Modal */}
      {showBalanceModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white">Mijoz Hamyoni Balansi</h3>
            <p className="text-xs text-gray-400">Mijoz: <b className="text-white">{selectedUser.name}</b></p>
            
            <form onSubmit={handleBalanceAction} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActionType('deposit')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all ${
                    actionType === 'deposit' ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                  }`}
                >
                  + Pul O'tkazish
                </button>
                <button
                  type="button"
                  onClick={() => setActionType('withdraw')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all ${
                    actionType === 'withdraw' ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                  }`}
                >
                  - Pul Yechish
                </button>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Summa (so'm)</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-[#16C2B2] font-black p-3 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowBalanceModal(false)}
                  className="flex-1 bg-[#0F1015] border border-[#2C303E] text-gray-400 font-bold py-3 rounded-xl text-xs"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-[#16C2B2] text-[#0F1015] font-black py-3 rounded-xl text-xs shadow-lg shadow-[#16C2B2]/20"
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
