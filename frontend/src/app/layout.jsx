import '../index.css';
import Providers from './providers';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export const metadata = {
  title: "UzGo — Ko'p Xizmatli Platforma (Super-App)",
  description: "O'zbekiston uchun bitta platformada uchta xizmat: Taksi, Market va Yetkazib berish",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="min-h-screen font-sans flex flex-col antialiased" style={{ background: '#0a0f1e', color: '#f9fafb' }}>
        <Providers>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
