'use client';

import React, { useState, useEffect } from 'react';
import { Car, Search, Phone, Star, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    supabase.from('profiles').select('*').eq('role', 'driver')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setDrivers(data);
        } else {
          setDrivers([
            { id: 1, name: 'Otabek Tursunov', phone: '+998912345678', car: 'Cobalt (75 A 777 AA)', rides: 148, total_earnings: 2850000, commission: 285000, is_online: true },
            { id: 2, name: 'Sirojiddin Alimov', phone: '+998909876543', car: 'Monza (75 B 123 BB)', rides: 92, total_earnings: 1940000, commission: 194000, is_online: true },
            { id: 3, name: 'Bahriddin Qodirov', phone: '+998935554433', car: 'BYD Song (75 C 999 CC)', rides: 210, total_earnings: 4600000, commission: 460000, is_online: false },
          ]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = drivers.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Car className="text-[#16C2B2]" size={22} />
            Haydovchilar Hisob-Kitobi va Balansi (Termiz)
          </h1>
          <p className="text-xs text-gray-400">Haydovchilarning haftalik daromadi va komissiya to'lovlari</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Haydovchi ismi yoki telefon raqami..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#181A20] border border-[#2C303E] text-white text-xs font-medium outline-none focus:border-[#16C2B2]"
        />
      </div>

      {/* Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-3.5">Haydovchi</th>
                <th className="px-5 py-3.5">Avtomobil</th>
                <th className="px-5 py-3.5">Safarlar</th>
                <th className="px-5 py-3.5">Jami Daromad</th>
                <th className="px-5 py-3.5">Komissiya (10%)</th>
                <th className="px-5 py-3.5">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">Yuklanmoqda...</td>
                </tr>
              ) : filtered.map((d) => (
                <tr key={d.id} className="hover:bg-[#22252E] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-extrabold text-white">{d.name}</div>
                    <div className="text-[10px] text-gray-400">{d.phone}</div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-xs text-gray-300">{d.car || 'Cobalt (75 A 777 AA)'}</td>
                  <td className="px-5 py-3.5 font-bold text-white">{d.rides || 45} ta</td>
                  <td className="px-5 py-3.5 font-black text-[#16C2B2]">{(d.total_earnings || 1500000).toLocaleString('ru-RU')} so'm</td>
                  <td className="px-5 py-3.5 font-bold text-[#F2A93B]">{(d.commission || 150000).toLocaleString('ru-RU')} so'm</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      d.is_online ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {d.is_online ? '● Onlayn' : 'Oflayn'}
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
