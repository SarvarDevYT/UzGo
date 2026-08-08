'use client';

import React, { useState, useEffect } from 'react';
import { Check, Clock, Bike, CheckCircle, Phone } from 'lucide-react';

export default function OrderTracker({ orderId, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 0, label: "Qabul qilindi", icon: Check },
    { id: 1, label: "Tayyorlanmoqda", icon: Clock },
    { id: 2, label: "Yo'lda", icon: Bike },
    { id: 3, label: "Yetkazildi", icon: CheckCircle },
  ];

  useEffect(() => {
    if (currentStep < 3) {
      const timer = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const getTimeRemaining = () => {
    switch (currentStep) {
      case 0: return "~40 daqiqa qoldi";
      case 1: return "~25 daqiqa qoldi";
      case 2: return "~10 daqiqa qoldi";
      case 3: return "Yetkazib berildi";
      default: return "";
    }
  };

  return (
    <div className="bg-[#181A20] border border-[#2C303E] rounded-3xl p-6 shadow-2xl max-w-md w-full mx-auto text-[#F5F5F7]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-extrabold text-lg">Buyurtma #{orderId || '10234'}</h3>
          <p className="text-gray-400 text-xs font-semibold">{getTimeRemaining()}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-xs bg-[#22252E] px-3 py-1.5 rounded-xl border border-[#2C303E]">
            Yopish
          </button>
        )}
      </div>

      {/* Progress Tracker */}
      <div className="relative mb-8 pt-4">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#2C303E]"></div>
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative flex items-center gap-4 z-10">
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-[#181A20] transition-colors duration-500 font-bold ${
                    isCompleted ? 'bg-[#22C55E] text-white' 
                    : isCurrent ? 'bg-[#16C2B2] text-[#0F1015]' 
                    : 'bg-[#0F1015] text-gray-500 border-[#2C303E]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500'}`}>
                    {step.label}
                  </h4>
                  {isCurrent && index === 2 && (
                    <p className="text-xs text-[#16C2B2] font-semibold animate-pulse">Kuryer yaqinlashmoqda...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Courier Info */}
      {currentStep >= 2 && (
        <div className="bg-[#0F1015] p-4 rounded-2xl flex items-center justify-between border border-[#2C303E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#16C2B2] to-[#FFE066] rounded-xl flex items-center justify-center text-[#0F1015] font-extrabold text-sm">
              A
            </div>
            <div>
              <p className="font-bold text-sm text-white">Azizbek (Kuryer)</p>
              <p className="text-xs text-gray-400">Cobalt • 01 A 123 AA</p>
            </div>
          </div>
          <a href="tel:+998901234567" className="bg-[#22C55E]/20 text-[#22C55E] p-2.5 rounded-xl hover:bg-[#22C55E]/30 transition-colors">
            <Phone className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
}
