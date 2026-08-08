'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Package, X, Check, RefreshCw } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    old_price: '',
    category_id: 'cat1',
    stock: 10,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('market_products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      old_price: '',
      category_id: 'cat1',
      stock: 10,
      rating: 4.8,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      name: p.name || '',
      description: p.description || '',
      price: p.price || '',
      old_price: p.old_price || '',
      category_id: p.category_id || 'cat1',
      stock: p.stock || 10,
      rating: p.rating || 4.8,
      image_url: p.image_url || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Haqiqatdan ham bu mahsulotni o'chirmoqchimisiz?")) return;
    await supabase.from('market_products').delete().eq('id', id);
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price) || 0,
      old_price: formData.old_price ? parseInt(formData.old_price) : null,
      category_id: formData.category_id,
      stock: parseInt(formData.stock) || 10,
      rating: parseFloat(formData.rating) || 4.8,
      image_url: formData.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
    };

    if (editingId) {
      await supabase.from('market_products').update(payload).eq('id', editingId);
    } else {
      await supabase.from('market_products').insert([payload]);
    }

    setShowModal(false);
    fetchProducts();
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Mahsulotlar Boshqaruvi</h1>
          <p className="text-xs text-gray-400">Supabase PostgreSQL ma'lumotlar bazasi tahriri</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={fetchProducts} 
            className="bg-[#181A20] text-gray-300 hover:text-[#FFCC00] p-2.5 rounded-xl border border-[#2C303E] transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>

          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-[#FFCC00] hover:bg-yellow-400 text-[#0F1015] font-black py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-[#FFCC00]/20 text-sm"
          >
            <Plus size={18} /> Yangi mahsulot
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#181A20] p-4 rounded-2xl border border-[#2C303E] flex justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Nomi bo'yicha qidiruv..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F1015] border border-[#2C303E] text-white rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFCC00]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#181A20] rounded-2xl border border-[#2C303E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F1015] text-xs uppercase text-gray-400 border-b border-[#2C303E]">
              <tr>
                <th className="px-5 py-4">Rasm</th>
                <th className="px-5 py-4">Mahsulot nomi</th>
                <th className="px-5 py-4">Narxi</th>
                <th className="px-5 py-4">Zaxira (Stock)</th>
                <th className="px-5 py-4">Kategoriya</th>
                <th className="px-5 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C303E]">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Yuklanmoqda...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Mahsulotlar yo'q</td></tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#22252E] transition-colors">
                    <td className="px-5 py-3">
                      <img src={p.image_url} alt="" className="w-10 h-10 object-cover rounded-lg border border-[#2C303E]" />
                    </td>
                    <td className="px-5 py-3 font-bold text-white">{p.name}</td>
                    <td className="px-5 py-3 text-[#FFCC00] font-black">{p.price?.toLocaleString('ru-RU')} so'm</td>
                    <td className="px-5 py-3 font-semibold">{p.stock} ta</td>
                    <td className="px-5 py-3 text-xs uppercase text-gray-400">{p.category_id}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 text-gray-300 hover:text-[#FFCC00] bg-[#0F1015] hover:bg-[#22252E] rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
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

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2C303E] w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-black text-white">
                {editingId ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Nomi</label>
                <input 
                  type="text" 
                  required
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFCC00]" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Narxi (so'm)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFCC00]" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Eski Narx (ixcham)</label>
                  <input 
                    type="number" 
                    value={formData.old_price} 
                    onChange={e => setFormData({...formData, old_price: e.target.value})}
                    className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFCC00]" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Rasm URL adresi</label>
                <input 
                  type="text" 
                  value={formData.image_url} 
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  className="w-full bg-[#0F1015] border border-[#2C303E] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFCC00]" 
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-[#0F1015] border border-[#2C303E] text-gray-400 font-bold rounded-xl hover:text-white"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-[#FFCC00] text-[#0F1015] font-black rounded-xl hover:bg-yellow-400 shadow-lg shadow-[#FFCC00]/20"
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
