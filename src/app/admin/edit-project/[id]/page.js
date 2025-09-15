// src/app/admin/edit-project/[id]/page.js

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EditProjectPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Sayfa yüklenirken true
  const [message, setMessage] = useState('');
  const router = useRouter();
  const params = useParams(); // URL'den ID'yi almak için
  const { id } = params;

  // 1. Sayfa yüklendiğinde mevcut proje verisini çek
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      const docRef = doc(db, 'projeler', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const projectData = docSnap.data();
        setTitle(projectData.title);
        setSummary(projectData.summary);
        setCategory(projectData.category);
      } else {
        setMessage('Proje bulunamadı.');
      }
      setIsLoading(false);
    };

    fetchProject();
  }, [id]);

  // 2. Form gönderildiğinde veriyi güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const docRef = doc(db, 'projeler', id);
      await updateDoc(docRef, {
        title,
        summary,
        category,
      });

      setMessage('Proje başarıyla güncellendi! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error("Proje güncellenirken hata:", error);
      setMessage('Proje güncellenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) return <div className="container mx-auto p-8 text-center">Yükleniyor...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Proje Düzenle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        {/* Form içeriği 'Yeni Proje Ekle' ile aynı */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Proje Başlığı</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Kısa Açıklama (Özet)</label>
            <textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
            {isLoading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}