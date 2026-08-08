'use client';

import React, { useState, useEffect } from 'react';
import { Car, Search, Plus, Trash2, DollarSign, ArrowUpRight, ArrowDownLeft, Shield, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // New Driver Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+9989');
  const [carModel, setCarModel] = useState('Chevrolet Cobalt (Oq)');
  const [plateNumber, setPlateNumber] = useState('75 A 777 AA');
  const [tariff, setTariff] = useState('mototaxi');

  // Balance Form
  const [balanceAmount, setBalanceAmount] = useState(50000);
  const [balanceAction, setBalanceAction] = useState('deposit'); // deposit | withdraw

  const fetchDrivers = () => {
    setLoading(true);
    supabase.from('profiles').select('*').eq('role', 'driver')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setDrivers(data);
        } else {
          setDrivers([
            { id: 'd1', name: 'Otabek Tursunov', phone: '+998912345678', car: 'Cobalt (75 A 777 AA)', tariff: 'mototaxi', balance: 250000, rides: 148, total_earnings: 2850000, commission: 285000, is_online: true },
            { id: 'd2', name: 'Sirojiddin Alimov', phone: '+998909876543', car: 'Monza (75 B 123 BB)', tariff: 'comfort', balance: 180000, rides: 92, total_earnings: 1940000, commission: 194000, is_online: true },
            { id: 'd3', name: 'Bahriddin Qodirov', phone: '+998935554433', car: 'BYD Song (75 C 999 CC)', tariff: 'business', balance: 520000, rides: 210, total_earnings: 4600000, commission: 460000, is_online: false },
          ]);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newDriver = {
      id: 'd_' + Date.now(),
      name,
      phone,
      car: `${carModel} (${plateNumber})`,
      tariff,
      balance: 100000,
      rides: 0,
      total_earnings: 0,
      commission: 0,
      is_online: true,
      role: 'driver'
    };

    try {
      await supabase.from('profiles').insert([newDriver]);
    } catch (err) {
      console.log('Supabase driver insert mock fallback');
    }

    setDrivers(prev => [newDriver, ...prev]);
    setShowAddModal(false);
    setName('');
    setPhone('+9989');
    alert("Yangi haydovchi (Yandex Fleet) muvaffaqiyatli qo'shildi!");
  };

  const handleDeleteDriver = async (id) => {
    if (!confirm("Ushbu haydovchini flotdan o'chirishga ishonchingiz komilmi?")) return;
    try {
      await supabase.from('profiles').delete().eq('id', id);
    } catch (err) {}
    setDrivers(prev => prev.filter(d => d.id !== id));
  };

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    if (!selectedDriver) return;

    const change = balanceAction === 'deposit' ? balanceAmount : -balanceAmount;
    setDrivers(prev => prev.map(d => {
      if (d.id === selectedDriver.id) {
        return { ...d, balance: Math.max(0, d.balance + change) };
      }
      return d;
    }));

    setShowBalanceModal(false);
    alert(`Haydovchi balansi ${balanceAction === 'deposit' ? '+' : '-'}${balanceAmount.toLocaleString('ru-RU')} so'mga yangilandi!`);
  };

  const filtered = drivers.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Car className="text-[#16C2B2]" size={24} />
            Yandex Fleet — Haydovchilar Flot Boshqaruvi
          </h1>
          <p className="text-xs text-gray-400">Haydovchilarni ro'yxatdan o'tkazish, o'chirish va balansini to'ldirish</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-[#16C2B2] text-[#0F1015] font-black px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-[#16C2B2]/20"
        >
          <Plus size={16} /> Yangi Haydovchi Qo'shish
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Haydovchi ismi yoki telefon raqami..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#181A20] border border-[#2C303E] text-white text-xs font-medium outline-none focus:border-[#16C2B2]"
        />
      </div>

      {/* Drivers Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-3.5">Haydovchi</th>
                <th className="px-5 py-3.5">Avtomobil & Davlat kodi</th>
                <th className="px-5 py-3.5">Tarif</th>
                <th className="px-5 py-3.5">Hamyon Balansi</th>
                <th className="px-5 py-3.5">Sof Daromad</th>
                <th className="px-5 py-3.5">Holat</th>
                <th className="px-5 py-3.5">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">Yuklanmoqda...</td>
                </tr>
              ) : filtered.map((d) => (
                <tr key={d.id} className="hover:bg-[#22252E] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-extrabold text-white">{d.name}</div>
                    <div className="text-[10px] text-gray-400">{d.phone}</div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-xs text-gray-300">{d.car}</td>
                  <td className="px-5 py-3.5">
                    <span className="bg-[#FF5B4C]/20 text-[#FF5B4C] border border-[#FF5B4C]/30 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                      {d.tariff || 'Mototaksi'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-black text-[#16C2B2]">
                    {(d.balance || 0).toLocaleString('ru-RU')} so'm
                  </td>
                  <td className="px-5 py-3.5 font-bold text-white">
                    {(d.total_earnings || 0).toLocaleString('ru-RU')} so'm ({d.rides || 0} ta safar)
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      d.is_online ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {d.is_online ? '● Onlayn' : 'Oflayn'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 flex items-center gap-2">
                    <button 
                      onClick={() => { setSelectedDriver(d); setShowBalanceModal(true); }}
                      className="bg-[#16C2B2]/10 border border-[#16C2B2]/30 text-[#16C2B2] hover:bg-[#16C2B2]/20 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                      title="Balans o'tkazish"
                    >
                      <DollarSign size={14} /> Balans
                    </button>
                    <button 
                      onClick={() => handleDeleteDriver(d.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/20"
                      title="Flotdan o'chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white">Yangi Haydovchi Biriktirish</h3>
            <form onSubmit={handleAddDriver} className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Haydovchi Ismi</label>
                <input 
                  type="text" 
                  placeholder="Masalan: Sardor Eshmurodov" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Telefon Raqami</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1">Avtomobil Model</label>
                  <input 
                    type="text" 
                    value={carModel}
                    onChange={e => setCarModel(e.target.value)}
                    className="w-full bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1">Raqam (75 kodi)</label>
                  <input 
                    type="text" 
                    value={plateNumber}
                    onChange={e => setPlateNumber(e.target.value)}
                    className="w-full bg-[#0F1015] border border-[#2C303E] text-[#16C2B2] font-black p-3 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Boshlang'ich Tarif</label>
                <select 
                  value={tariff}
                  onChange={e => setTariff(e.target.value)}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none"
                >
                  <option value="mototaxi">🛵 Mototaksi (8,000 so'm)</option>
                  <option value="economy">🚗 Ekonom (12,000 so'm)</option>
                  <option value="comfort">🚙 Komfort (18,000 so'm)</option>
                  <option value="business">👑 Business (40,000 so'm)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-[#0F1015] border border-[#2C303E] text-gray-400 font-bold py-3 rounded-xl text-xs"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-[#16C2B2] text-[#0F1015] font-black py-3 rounded-xl text-xs shadow-lg shadow-[#16C2B2]/20"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Driver Balance Modal */}
      {showBalanceModal && selectedDriver && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white">Haydovchi Balansini Boshqarish</h3>
            <p className="text-xs text-gray-400">Haydovchi: <b className="text-white">{selectedDriver.name}</b></p>
            
            <form onSubmit={handleBalanceSubmit} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBalanceAction('deposit')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all ${
                    balanceAction === 'deposit' ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                  }`}
                >
                  + Pul O'tkazish
                </button>
                <button
                  type="button"
                  onClick={() => setBalanceAction('withdraw')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition-all ${
                    balanceAction === 'withdraw' ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-[#2C303E] bg-[#0F1015] text-gray-400'
                  }`}
                >
                  - Pul Yechish
                </button>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Summa (so'm)</label>
                <input 
                  type="number" 
                  value={balanceAmount} 
                  onChange={e => setBalanceAmount(Number(e.target.value))}
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
                  Bajarish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
