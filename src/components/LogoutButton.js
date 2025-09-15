// src/components/LogoutButton.js

"use client";

import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login'); // Çıkış yaptıktan sonra login sayfasına yönlendir
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
      alert("Çıkış yapılamadı. Lütfen tekrar deneyin.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
    >
      Çıkış Yap
    </button>
  );
}