// src/app/admin/layout.js

"use client";

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';

export default function AdminLayout({ children }) {
  // 1. ADIM: TÜM HOOK'LARI KOŞULSUZ OLARAK EN BAŞA ALIYORUZ
  // Bu sayede React'in "yoklama listesi" her render'da aynı kalır.
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  // 2. ADIM: YÖNLENDİRME MANTIĞINI useEffect'in İÇİNDE KOŞULA BAĞLIYORUZ
  // Hook her zaman çağrılır, ama içindeki kod sadece gerektiğinde çalışır.
  useEffect(() => {
    // Yükleme bittiyse, kullanıcı yoksa VE şu anki sayfa login sayfası DEĞİLSE yönlendir.
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  // Yükleme sırasında bir arayüz gösterelim.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Yönetici Paneli Yükleniyor...</p>
      </div>
    );
  }

  // 3. ADIM: GÖSTERİLECEK İÇERİĞE TÜM HOOK'LARDAN SONRA KARAR VERİYORUZ
  // Eğer login sayfasındaysak, içeriği direkt göster.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Eğer kullanıcı giriş yapmışsa, AdminHeader ile birlikte içeriği göster.
  if (user) {
    return (
      <>
        <AdminHeader />
        <main>{children}</main>
      </>
    );
  }

  // Kullanıcı yoksa ve henüz yönlendirme tamamlanmadıysa (veya login'de değilse) 
  // bir şey gösterme ki korumalı sayfa içeriği sızmasın.
  return null;
}