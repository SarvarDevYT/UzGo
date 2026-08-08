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
    home: "Bosh",
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

  const toggleLanguage = (newLang) => {
    const target = newLang || (lang === 'uz' ? 'ru' : 'uz');
    setLang(target);
    localStorage.setItem('uzgo_lang', target);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations.uz[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext) || { lang: 'uz', toggleLanguage: () => {}, t: (k) => k };
}
