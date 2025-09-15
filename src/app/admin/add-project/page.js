// src/app/admin/add-project/page.js

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AddProjectPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!title || !summary || !category) {
      setMessage('Lütfen tüm alanları doldurun.');
      setIsLoading(false);
      return;
    }

    try {
      const newProject = {
        title,
        summary,
        category,
        createdAt: new Date(), // Projenin oluşturulma tarihini de ekleyelim
      };
      
      await addDoc(collection(db, 'projeler'), newProject);
      
      setMessage('Proje başarıyla eklendi! Yönlendiriliyorsunuz...');
      // Formu temizle
      setTitle('');
      setSummary('');
      setCategory('');

      // 2 saniye sonra dashboard'a yönlendir
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error("Proje eklenirken hata:", error);
      setMessage('Proje eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Yeni Proje Ekle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Örn: Yol Yapımı, Altyapı..." />
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
            {isLoading ? 'Kaydediliyor...' : 'Projeyi Kaydet'}
          </button>
        </div>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}