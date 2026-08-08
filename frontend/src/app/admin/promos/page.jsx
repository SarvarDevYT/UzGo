'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, Check, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminPromosPage() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [maxUses, setMaxUses] = useState(100);

  const fetchPromos = () => {
    setLoading(true);
    supabase.from('promo_codes').select('*').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setPromos(data);
        } else {
          setPromos([
            { id: 1, code: 'TERMIZ10', discount_percent: 10, max_uses: 500, used_count: 42 },
            { id: 2, code: 'UZGO2026', discount_percent: 15, max_uses: 1000, used_count: 128 },
          ]);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleCreatePromo = async (e) => {
    e.preventDefault();
    if (!newCode) return;

    try {
      await supabase.from('promo_codes').insert([
        { code: newCode.toUpperCase(), discount_percent: discountPercent, max_uses: maxUses }
      ]);
      fetchPromos();
      setShowAddModal(false);
      setNewCode('');
    } catch (err) {
      alert("Xatolik: Promo-kod yaratib bo'lmadi");
    }
  };

  const handleDeletePromo = async (id) => {
    if (!confirm("Ushbu promo-kodni o'chirmoqchimisiz?")) return;
    try {
      await supabase.from('promo_codes').delete().eq('id', id);
      fetchPromos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Tag className="text-[#F2A93B]" size={22} />
            Promo-kodlar Boshqaruvi
          </h1>
          <p className="text-xs text-gray-400">Termiz mijozlari uchun chegirma va aksiya promo-kodlari</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-[#16C2B2] text-[#0F1015] font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-[#16C2B2]/20"
        >
          <Plus size={16} /> Yangi Promo-kod
        </button>
      </div>

      {/* Promos Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-3.5">Promo-kod</th>
                <th className="px-5 py-3.5">Chegirma</th>
                <th className="px-5 py-3.5">Ishlatilish</th>
                <th className="px-5 py-3.5">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">Yuklanmoqda...</td>
                </tr>
              ) : promos.map((p) => (
                <tr key={p.id} className="hover:bg-[#22252E] transition-colors">
                  <td className="px-5 py-3.5 font-black text-[#F2A93B] font-mono text-sm">{p.code}</td>
                  <td className="px-5 py-3.5 font-bold text-white">-{p.discount_percent}%</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{p.used_count || 0} / {p.max_uses || 100} marta</td>
                  <td className="px-5 py-3.5">
                    <button 
                      onClick={() => handleDeletePromo(p.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/20"
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

      {/* Create Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-black text-white mb-4">Yangi Promo-kod Yaratish</h3>
            <form onSubmit={handleCreatePromo} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Promo-kod nomi</label>
                <input 
                  type="text" 
                  placeholder="Masalan: TERMIZ2026" 
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs uppercase font-bold outline-none focus:border-[#16C2B2]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Chegirma foizi (%)</label>
                <input 
                  type="number" 
                  value={discountPercent}
                  onChange={e => setDiscountPercent(Number(e.target.value))}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-white p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Maksimal ishlatilish soni</label>
                <input 
                  type="number" 
                  value={maxUses}
                  onChange={e => setMaxUses(Number(e.target.value))}
                  className="w-full bg-[#0F1015] border border-[#2C303E] text-[#16C2B2] p-3 rounded-xl text-xs outline-none focus:border-[#16C2B2]"
                />
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
    </div>
  );
}
