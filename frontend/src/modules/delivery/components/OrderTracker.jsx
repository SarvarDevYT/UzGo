import React, { useState, useEffect } from 'react';
import { Check, Clock, Bike, CheckCircle, Phone } from 'lucide-react';

export default function OrderTracker({ orderId, onClose }) {
  // Steps: 0: Received, 1: Preparing, 2: On the way, 3: Delivered
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 0, label: "Qabul qilindi", icon: Check },
    { id: 1, label: "Tayyorlanmoqda", icon: Clock },
    { id: 2, label: "Yo'lda", icon: Bike },
    { id: 3, label: "Yetkazildi", icon: CheckCircle },
  ];

  // Mock auto-progress
  useEffect(() => {
    if (currentStep < 3) {
      const timer = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 5000); // Progress every 5 seconds for mock
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
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 shadow-lg max-w-md w-full mx-auto text-dark-text">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg">Buyurtma #{orderId || '10234'}</h3>
          <p className="text-dark-muted text-sm">{getTimeRemaining()}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-dark-muted hover:text-dark-text">
            Yopish
          </button>
        )}
      </div>

      {/* Progress Tracker */}
      <div className="relative mb-8 pt-4">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-dark-border"></div>
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative flex items-center gap-4 z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-dark-card transition-colors duration-500 ${
                    isCompleted ? 'bg-green-500 text-white' 
                    : isCurrent ? 'bg-[#ffc107] text-dark-bg' 
                    : 'bg-dark-bg text-dark-muted border-dark-border'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-semibold ${isCompleted || isCurrent ? 'text-dark-text' : 'text-dark-muted'}`}>
                    {step.label}
                  </h4>
                  {isCurrent && index === 2 && (
                    <p className="text-xs text-[#ffc107] animate-pulse">Kuryer yaqinlashmoqda...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Courier Info - show when on the way or delivered */}
      {currentStep >= 2 && (
        <div className="bg-dark-bg p-4 rounded-xl flex items-center justify-between border border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a237e] rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="font-medium">Azizbek (Kuryer)</p>
              <p className="text-xs text-dark-muted">Malibu • 01 A 123 AA</p>
            </div>
          </div>
          <button className="bg-green-500/20 text-green-500 p-2 rounded-full hover:bg-green-500/30 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
