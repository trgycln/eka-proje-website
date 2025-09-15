// src/app/layout.js

import './globals.css';
import { Inter } from 'next/font/google';

// Bileşenlerimizi import ediyoruz
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EKA Proje - Yol ve Altyapı Çözümleri',
  description: 'Yol, altyapı, drenaj ve proje yönetimi alanlarında uzman çözümler sunan lider mühendislik firması.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}