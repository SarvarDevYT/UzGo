import '../index.css';
import Providers from './providers';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export const metadata = {
  title: "UzGo — Ko'p Xizmatli Platforma",
  description: "O'zbekiston uchun bitta platformada uchta xizmat: Taksi, Market va Yetkazib berish",
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className="bg-[#FAFAFC] dark:bg-[#0F1015] transition-colors">
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className="min-h-screen font-sans flex flex-col antialiased bg-[#FAFAFC] dark:bg-[#0F1015] text-[#111827] dark:text-[#F5F5F7] transition-colors">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}



