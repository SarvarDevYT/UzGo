import React, { useState } from 'react';
import { Search, Star, Car, Ban, Unlock } from 'lucide-react';

const AdminDrivers = () => {
  const [drivers] = useState([
    { id: 1, name: 'Sirojiddin B.', car: 'Chevrolet Cobalt', plate: '01 A 777 AA', rating: 4.8, rides: 1240, status: 'online' },
    { id: 2, name: 'Otabek K.', car: 'Chevrolet Spark', plate: '10 B 123 CD', rating: 4.5, rides: 890, status: 'offline' },
    { id: 3, name: 'Javohir T.', car: 'Kia K5', plate: '01 Z 001 ZZ', rating: 4.9, rides: 2150, status: 'online' },
    { id: 4, name: 'Bobur Y.', car: 'Daewoo Nexia 3', plate: '01 C 456 DD', rating: 3.2, rides: 140, status: 'blocked' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Haydovchilar</h1>
      </div>

      <div className="bg-[#1f2937] p-4 rounded-xl border border-[#374151] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Ism yoki raqam bo'yicha qidirish..." 
            className="w-full bg-[#111827] border border-[#374151] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#FFC300]"
          />
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg font-medium text-sm">Online: 2</div>
           <div className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg font-medium text-sm">Bloklangan: 1</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {drivers.map(driver => (
          <div key={driver.id} className="bg-[#1f2937] border border-[#374151] rounded-xl p-5 hover:border-[#FFC300]/50 transition-colors relative">
            <div className="absolute top-4 right-4">
              {driver.status === 'online' && <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>}
              {driver.status === 'offline' && <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>}
              {driver.status === 'blocked' && <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>}
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#111827] rounded-full border-2 border-[#0d1b3e] flex items-center justify-center overflow-hidden">
                <span className="font-bold text-[#FFC300] text-xl">{driver.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{driver.name}</h3>
                <div className="flex items-center text-[#FFC300] text-sm font-medium">
                  <Star size={14} className="fill-current mr-1" />
                  {driver.rating}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-center text-gray-300 bg-[#111827] px-3 py-2 rounded-lg">
                <Car size={16} className="mr-3 text-gray-500" />
                <span className="flex-1">{driver.car}</span>
                <span className="font-mono bg-[#FFC300] text-black px-2 py-0.5 rounded text-xs font-bold">{driver.plate}</span>
              </div>
              <div className="flex justify-between px-1 text-gray-400 text-xs">
                <span>Jami sayohatlar:</span>
                <span className="font-medium text-white">{driver.rides}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#1a2744] hover:bg-[#0d1b3e] text-[#FFC300] border border-[#374151] py-2 rounded-lg text-sm font-medium transition-colors">
                Batafsil
              </button>
              {driver.status === 'blocked' ? (
                <button className="px-4 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg transition-colors flex items-center justify-center" title="Blokdan chiqarish">
                  <Unlock size={18} />
                </button>
              ) : (
                <button className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors flex items-center justify-center" title="Bloklash">
                  <Ban size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDrivers;
