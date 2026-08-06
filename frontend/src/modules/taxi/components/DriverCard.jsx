import React from 'react';
import { Phone, Star, X } from 'lucide-react';

const DriverCard = ({ driver, onCancel }) => {
  if (!driver) return null;

  // Generate random avatar color
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
  const randomColor = colors[driver.name.length % colors.length];
  const initials = driver.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-dark-border pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${randomColor}`}>
            {initials}
          </div>
          <div>
            <h3 className="text-dark-text font-bold">{driver.name}</h3>
            <div className="flex items-center gap-1 text-sm text-accent">
              <Star size={14} fill="currentColor" />
              <span>{driver.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-dark-text bg-dark-bg px-2 py-1 rounded-md text-sm border border-dark-border">
            {driver.plateNumber}
          </div>
          <div className="text-xs text-dark-text/70 mt-1">{driver.carModel}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p className="text-dark-text/70">Kelish vaqti:</p>
          <p className="text-dark-text font-bold text-lg">~4 daqiqa</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-dark-bg border border-dark-border text-dark-text p-3 rounded-full hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-colors" onClick={onCancel}>
            <X size={20} />
          </button>
          <a href={`tel:${driver.phone}`} className="bg-primary-900 text-white p-3 rounded-full hover:bg-primary-800 transition-colors shadow-md shadow-primary-900/20">
            <Phone size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
