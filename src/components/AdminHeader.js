// src/components/AdminHeader.js
"use client";

import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function AdminHeader() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">EKA Proje - Yönetim Paneli</h1>
        <nav className="flex items-center space-x-4">
          <Link href="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link href="/admin/tools" className="hover:text-gray-300">Hesap Araçları</Link>
          <Link href="/admin/add-project" className="hover:text-gray-300">Yeni Proje Ekle</Link>
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}