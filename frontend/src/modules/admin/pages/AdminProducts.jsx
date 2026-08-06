import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, ImageIcon } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Barchasi');

  const categories = ['Barchasi', 'Fast Food', 'Ichimliklar', 'Shirinliklar', 'Milliy Taomlar'];

  useEffect(() => {
    // Mock Data
    setTimeout(() => {
      const mockProds = Array.from({ length: 14 }).map((_, i) => ({
        id: i + 1,
        name: `Mahsulot ${i + 1}`,
        price: `${(i + 1) * 15000} UZS`,
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
        stock: Math.floor(Math.random() * 50),
        status: Math.random() > 0.2 ? 'active' : 'inactive',
      }));
      setProducts(mockProds);
      setLoading(false);
    }, 600);
  }, []);

  const filtered = products.filter(p => activeCategory === 'Barchasi' || p.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Mahsulotlar</h1>
        <button className="flex items-center gap-2 bg-[#FFC300] hover:bg-yellow-500 text-[#0d1b3e] font-semibold py-2 px-4 rounded-lg transition-colors">
          <Plus size={20} /> Yangi mahsulot
        </button>
      </div>

      <div className="bg-[#1f2937] p-4 rounded-xl border border-[#374151]">
        {/* Categories Tab */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-[#1a2744] text-[#FFC300] border border-[#FFC300]/30' 
                  : 'bg-[#111827] text-gray-400 border border-[#374151] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-1/3 mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Mahsulot qidirish..." 
            className="w-full bg-[#111827] border border-[#374151] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#FFC300]"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#374151]">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0d1b3e] text-xs uppercase text-gray-400 border-b border-[#374151]">
              <tr>
                <th className="px-5 py-4">Rasm</th>
                <th className="px-5 py-4">Nomi</th>
                <th className="px-5 py-4">Kategoriya</th>
                <th className="px-5 py-4">Narxi</th>
                <th className="px-5 py-4">Zaxira</th>
                <th className="px-5 py-4">Holat</th>
                <th className="px-5 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]">
              {loading ? (
                <tr><td colSpan="7" className="text-center py-8">Yuklanmoqda...</td></tr>
              ) : (
                filtered.map(product => (
                  <tr key={product.id} className="hover:bg-[#1a2744] transition-colors">
                    <td className="px-5 py-3">
                      <div className="w-12 h-12 bg-[#111827] rounded border border-[#374151] flex items-center justify-center text-gray-500">
                        <ImageIcon size={20} />
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium text-white">{product.name}</td>
                    <td className="px-5 py-3">{product.category}</td>
                    <td className="px-5 py-3 font-mono text-[#FFC300]">{product.price}</td>
                    <td className="px-5 py-3">{product.stock} dona</td>
                    <td className="px-5 py-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={product.status === 'active'} />
                        <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit2 size={18} /></button>
                        <button className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
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
};

export default AdminProducts;
