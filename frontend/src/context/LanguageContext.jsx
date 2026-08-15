'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  uz: {
    welcome: "Xush kelibsiz",
    tagline: "Qayerga boramiz yoki nimani yetkazamiz?",
    taxi: "UzGo Taksi",
    mototaxi: "Mototaksi",
    market: "UzGo Market",
    delivery: "UzGo Delivery",
    pochta: "UzGo Pochta",
    whereTo: "Qayerga boramiz?",
    callTaxi: "Chaqirish",
    promoCode: "Promo-kod",
    cashback: "Bugungi keshbek",
    home: "Bosh sahifa",
    profile: "Profil",
    orders: "Buyurtmalar",
    admin: "Admin Panel",
    shareRide: "Safarni ulashish",
    chat: "Haydovchi bilan chat",
    cash: "Naqd pul",
    checkout: "Rasmiylashtirish",
    enterPromo: "Promo-kodni kiriting",
    apply: "Qo'llash",
    termiz: "Termiz shahri",
    balance: "Hamyon",
    driver: "Haydovchi",
    todayCashback: "BUGUNGI KESHBEK",
    cashbackText: "Har bir buyurtmangizdan 10% keshbek oling!",
    fastDelivery: "Tez yetkazish",
    safePayment: "Xavfsiz to‘lov",
    support24: "24/7 yordam",
    bonuses: "Bonuslar",
    quickServices: "Tezkor xizmatlar",
    allServices: "Barchasi",
    change: "O'zgartirish",
  },
  ru: {
    welcome: "Добро пожаловать",
    tagline: "Куда поедем или что доставим?",
    taxi: "UzGo Такси",
    mototaxi: "Мототакси",
    market: "UzGo Маркет",
    delivery: "UzGo Доставка",
    pochta: "UzGo Почта",
    whereTo: "Куда едем?",
    callTaxi: "Вызвать",
    promoCode: "Промокод",
    cashback: "Кэшбэк дня",
    home: "Главная",
    profile: "Профиль",
    orders: "Заказы",
    admin: "Админ Панель",
    shareRide: "Поделиться поездкой",
    chat: "Чат с водителем",
    cash: "Наличные",
    checkout: "Оформить заказ",
    enterPromo: "Введите промокод",
    apply: "Применить",
    termiz: "Город Термез",
    balance: "Кошелек",
    driver: "Водитель",
    todayCashback: "КЭШБЭК ДНЯ",
    cashbackText: "Получайте 10% кэшбэка с каждого заказа!",
    fastDelivery: "Быстрая доставка",
    safePayment: "Безопасная оплата",
    support24: "Поддержка 24/7",
    bonuses: "Бонусы",
    quickServices: "Быстрые услуги",
    allServices: "Все",
    change: "Изменить",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('uz');

  useEffect(() => {
    const saved = localStorage.getItem('uzgo_lang');
    if (saved && (saved === 'uz' || saved === 'ru')) {
      setLang(saved);
    }
  }, []);

  const toggleLanguage = (targetLang) => {
    const next = targetLang || (lang === 'uz' ? 'ru' : 'uz');
    setLang(next);
    localStorage.setItem('uzgo_lang', next);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations.uz[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      lang, 
      language: lang, 
      toggleLanguage, 
      changeLanguage: toggleLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext) || { 
    lang: 'uz', 
    language: 'uz', 
    toggleLanguage: () => {}, 
    changeLanguage: () => {}, 
    t: (k) => k 
  };
}

