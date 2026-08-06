'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit2, Trash2 } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Sardor Qodirov', phone: '+998901234567', role: 'customer', date: '2023-08-12', avatar: 'SQ' },
        { id: 2, name: 'Anvar Tursunov', phone: '+998912345678', role: 'driver', date: '2023-09-01', avatar: 'AT' },
        { id: 3, name: 'Dilnoza Karimova', phone: '+998934567890', role: 'courier', date: '2023-10-15', avatar: 'DK' },
        { id: 4, name: 'Jamshid Xoliqov', phone: '+998991112233', role: 'admin', date: '2022-01-10', avatar: 'JX' },
        { id: 5, name: 'Madina Umarova', phone: '+998978889900', role: 'customer', date: '2023-11-20', avatar: 'MU' },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const roles = [
    { value: 'all', label: 'Barchasi' },
    { value: 'customer', label: 'Mijoz' },
    { value: 'driver', label: 'Haydovchi' },
    { value: 'courier', label: 'Kuryer' },
    { value: 'admin', label: 'Admin' },
  ];

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-500/20 text-red-400';
      case 'driver': return 'bg-green-500/20 text-green-400';
      case 'courier': return 'bg-yellow-500/20 text-yellow-400';
      case 'customer': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredUsers = users.filter(u => 
    (filterRole === 'all' || u.role === filterRole) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Foydalanuvchilar</h1>
        <button className="bg-[#FFC300] hover:bg-yellow-500 text-[#0d1b3e] font-semibold py-2 px-4 rounded-lg transition-colors">
          + Yangi foydalanuvchi
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[#1f2937] p-4 rounded-xl border border-[#374151] flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Ism yoki telefon..." 
            className="w-full bg-[#111827] border border-[#374151] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#FFC300] transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="text-gray-400" size={18} />
          <select 
            className="bg-[#111827] border border-[#374151] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#FFC300] w-full sm:w-auto"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1f2937] rounded-xl border border-[#374151] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0d1b3e] text-xs uppercase text-gray-400 border-b border-[#374151]">
              <tr>
                <th className="px-5 py-4">Foydalanuvchi</th>
                <th className="px-5 py-4">Telefon</th>
                <th className="px-5 py-4">Rol</th>
                <th className="px-5 py-4">Ro'yxatdan o'tgan</th>
                <th className="px-5 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">Yuklanmoqda...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">Foydalanuvchilar topilmadi</td></tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-[#1a2744] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center font-bold text-[#FFC300] border border-[#374151]">
                          {user.avatar}
                        </div>
                        <span className="font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono">{user.phone}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide capitalize ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#9ca3af]">{user.date}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
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
