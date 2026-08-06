import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Fast Food', emoji: '🍔', count: 45 },
    { id: 2, name: 'Ichimliklar', emoji: '🥤', count: 120 },
    { id: 3, name: 'Shirinliklar', emoji: '🍰', count: 32 },
    { id: 4, name: 'Milliy Taomlar', emoji: '🍲', count: 18 },
    { id: 5, name: 'Salatlar', emoji: '🥗', count: 25 },
    { id: 6, name: 'Go\'sht mahsulotlari', emoji: '🥩', count: 50 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Kategoriyalar</h1>
        <button className="flex items-center gap-2 bg-[#FFC300] hover:bg-yellow-500 text-[#0d1b3e] font-semibold py-2 px-4 rounded-lg transition-colors">
          <Plus size={20} /> Yangi qo'shish
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#1f2937] p-5 rounded-xl border border-[#374151] hover:border-[#FFC300] transition-colors group relative flex items-center gap-4">
            <button className="text-gray-500 cursor-grab hover:text-white">
              <GripVertical size={20} />
            </button>
            <div className="text-4xl">{cat.emoji}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{cat.name}</h3>
              <p className="text-sm text-gray-400">{cat.count} ta mahsulot</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all absolute right-4">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        
        {/* Add New Card Placeholder */}
        <button className="bg-[#111827] border-2 border-dashed border-[#374151] rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-[#FFC300] hover:border-[#FFC300] transition-colors min-h-[120px]">
          <Plus size={32} className="mb-2" />
          <span className="font-medium">Kategoriya qo'shish</span>
        </button>
      </div>
    </div>
  );
};

export default AdminCategories;
