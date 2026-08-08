'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(150000); // 150,000 so'm default balance
  const [cashbackBalance, setCashbackBalance] = useState(25000); // 25,000 so'm cashback balance
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'cashback', title: "UzGo Taksi Keshbek (+10%)", amount: 2500, date: "Bugun, 14:15", status: "credited" },
    { id: 2, type: 'topup', title: "Click Up orqali to'ldirildi", amount: 100000, date: "Kechasi, 21:30", status: "completed" },
    { id: 3, type: 'payment', title: "UzGo Market xaridi", amount: -45000, date: "Kecha, 18:20", status: "completed" },
  ]);

  const addCashback = (amount) => {
    const earned = Math.round(amount * 0.10);
    setCashbackBalance((prev) => prev + earned);
    setTransactions((prev) => [
      { id: Date.now(), type: 'cashback', title: "Keshbek xariddan (+10%)", amount: earned, date: "Hozir", status: "credited" },
      ...prev
    ]);
  };

  const topUpWallet = (amount) => {
    setWalletBalance((prev) => prev + amount);
    setTransactions((prev) => [
      { id: Date.now(), type: 'topup', title: "Hamyon to'ldirildi", amount: amount, date: "Hozir", status: "completed" },
      ...prev
    ]);
  };

  const payWithWallet = (amount) => {
    if (walletBalance + cashbackBalance < amount) return false;
    
    let remaining = amount;
    if (cashbackBalance >= remaining) {
      setCashbackBalance((prev) => prev - remaining);
    } else {
      remaining -= cashbackBalance;
      setCashbackBalance(0);
      setWalletBalance((prev) => prev - remaining);
    }

    setTransactions((prev) => [
      { id: Date.now(), type: 'payment', title: "UzGo Hamyon to'lovi", amount: -amount, date: "Hozir", status: "completed" },
      ...prev
    ]);
    return true;
  };

  return (
    <WalletContext.Provider value={{ walletBalance, cashbackBalance, transactions, addCashback, topUpWallet, payWithWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
