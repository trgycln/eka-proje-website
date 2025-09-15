// src/app/admin/login/page.js

"use client"; // Bu satır önemli! Form etkileşimleri için gerekli.

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '@/lib/firebase'; // Firebase app'i import ediyoruz
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Hata mesajını temizle

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Giriş başarılı! Yönetici paneline yönlendiriliyorsunuz...');
      router.push('/admin/dashboard'); // Giriş başarılıysa dashboard'a yönlendir
    } catch (error) {
      setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Yönetici Girişi</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Posta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}