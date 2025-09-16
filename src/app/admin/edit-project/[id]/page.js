// src/app/admin/edit-project/[id]/page.js'in TAM KODU

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const projectCategories = ["Toplu Konut", "Sanayi Sitesi", "Altyapı", "Hastane", "Spor Kompleksi", "Ticari", "Sosyal Tesis"];

export default function EditProjectPage() {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = useParams();

  // useEffect ve handleInputChange/handleCategoryChange fonksiyonları aynı kalıyor...
   useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      const docRef = doc(db, 'projeler', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setMessage('Proje bulunamadı.');
      }
      setIsLoading(false);
    };
    fetchProject();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value, }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentCategories = prev.categories || [];
      if (checked) { return { ...prev, categories: [...currentCategories, value] }; } 
      else { return { ...prev, categories: currentCategories.filter(c => c !== value) };}
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const docRef = doc(db, 'projeler', id);
      const { id: docId, createdAt, ...updateData } = formData;
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });
      setMessage('Proje başarıyla güncellendi! Yönlendiriliyorsunuz...');
      setTimeout(() => { router.push('/admin/dashboard'); }, 2000);
    } catch (error) {
      console.error("Proje güncellenirken hata:", error);
      setMessage('Proje güncellenirken bir hata oluştu.');
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="container mx-auto p-8 text-center">Proje Bilgileri Yükleniyor...</div>;
  if (!formData) return <div className="container mx-auto p-8 text-center">{message}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Proje Düzenle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* ... (Önceki tüm form alanları aynı kalıyor) ... */}

        {/* YENİ EKLENEN BÖLÜM */}
        <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Proje Linkleri (Opsiyonel)</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="googleMapsLink" className="block text-sm font-medium text-gray-700">Google Haritalar Linki</label>
                    <input type="url" name="googleMapsLink" value={formData.googleMapsLink || ''} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="https://maps.app.goo.gl/..." />
                </div>
                <div>
                    <label htmlFor="krokiLink" className="block text-sm font-medium text-gray-700">Kroki / Plan Linki</label>
                    <input type="url" name="krokiLink" value={formData.krokiLink || ''} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="PDF, resim veya dosya linki" />
                </div>
                <div>
                    <label htmlFor="documentLink" className="block text-sm font-medium text-gray-700">Proje Dokümanı Linki</label>
                    <input type="url" name="documentLink" value={formData.documentLink || ''} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Sunum, rapor veya dosya linki" />
                </div>
            </div>
        </div>

        <div className="mt-6">
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-bold">
                {isLoading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
            </button>
        </div>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}