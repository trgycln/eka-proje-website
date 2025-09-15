// src/components/Header.js

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Firma Adı */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          EKA Proje
        </Link>

        {/* Navigasyon Menüsü */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-semibold">
            Anasayfa
          </Link>
          <Link href="/hakkimizda" className="text-gray-600 hover:text-blue-600 font-semibold">
            Hakkımızda
          </Link>
          <Link href="/hizmetler" className="text-gray-600 hover:text-blue-600 font-semibold">
            Hizmetler
          </Link>
          <Link href="/projeler" className="text-gray-600 hover:text-blue-600 font-semibold">
            Projeler
          </Link>
          <Link href="/iletisim" className="text-gray-600 hover:text-blue-600 font-semibold">
            İletişim
          </Link>
        </nav>
      </div>
    </header>
  );
}