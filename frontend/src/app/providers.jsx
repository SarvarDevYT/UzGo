'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { ToastProvider } from '../components/ToastProvider';

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </Provider>
  );
}
