// src/components/Header.js

"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const menuLinks = [
    { href: "/", label: "Anasayfa" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/hizmetler", label: "Hizmetler" },
    { href: "/projeler", label: "Projeler" },
    { href: "/iletisim", label: "İletişim" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo ve Firma İsmi Alanı */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/images/logo.png" 
            alt="EKA Proje Logo" 
            width={120}
            height={35} 
            priority 
          />
          <span className="font-semibold text-gray-700 hidden lg:block">
            EKA ALTYAPI PROJE MÜŞAVİRLİK MÜHENDİSLİK
          </span>
        </Link>

        {/* Masaüstü Navigasyon Menüsü */}
        <nav className="hidden md:flex space-x-6">
          {menuLinks.map(link => (
            <Link key={link.href} href={link.href} className={`text-gray-600 hover:text-blue-600 font-semibold transition-colors ${pathname === link.href ? 'text-blue-600' : ''}`}>
              {link.label}
            </Link>
          ))}
        </nav> {/* <-- DÜZELTME BURADA: Eksik olan '>' işaretini ekledim. */}

        {/* Mobil Menü Butonu */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menüyü aç">
            <FaBars className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Açılır Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center animate-fade-in-down">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6" aria-label="Menüyü kapat">
            <FaTimes className="h-8 w-8 text-gray-700" />
          </button>
          <nav className="flex flex-col items-center space-y-8">
            {menuLinks.map(link => (
              <Link key={link.href} href={link.href} className={`text-2xl font-semibold text-gray-800 hover:text-blue-600 ${pathname === link.href ? 'text-blue-600' : ''}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}