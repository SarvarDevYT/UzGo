import React from 'react';

const TariffCard = ({ tariff, price, duration, isSelected, onSelect }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'economy': return '🚗';
      case 'comfort': return '🚙';
      case 'premium': return '🏎️';
      default: return '🚕';
    }
  };

  const getName = (type) => {
    switch (type) {
      case 'economy': return 'Ekonom';
      case 'comfort': return 'Komfort';
      case 'premium': return 'Premium';
      default: return 'Standart';
    }
  };

  return (
    <div
      onClick={() => onSelect(tariff)}
      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-accent bg-dark-card/50 shadow-[0_0_10px_rgba(255,193,7,0.3)]'
          : 'border-dark-border bg-dark-card hover:border-dark-border/80'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{getIcon(tariff)}</span>
        <span className="text-xs text-dark-text/70">{duration}</span>
      </div>
      <div className="font-semibold text-dark-text">{getName(tariff)}</div>
      <div className="text-sm text-dark-text/80">{price} so'm</div>
    </div>
  );
};

export default TariffCard;
