'use client';

import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { store } from '../store';
import { ToastProvider } from '../components/ToastProvider';
import { LanguageProvider } from '../context/LanguageContext';
import { WalletProvider } from '../context/WalletContext';

function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state) => state.auth || { isAuthenticated: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated && pathname !== '/login' && !pathname?.startsWith('/admin')) {
      router.push('/login');
    }
  }, [isAuthenticated, pathname, mounted, router]);

  return <>{children}</>;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <WalletProvider>
          <ToastProvider>
            <AuthGuard>{children}</AuthGuard>
          </ToastProvider>
        </WalletProvider>
      </LanguageProvider>
    </Provider>
  );
}
