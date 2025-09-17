"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const projectCategories = ["Toplu Konut", "Sanayi Sitesi", "Altyapı", "Hastane", "Spor Kompleksi", "Ticari", "Sosyal Tesis"];

export default function AddProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    status: 'Devam Ediyor',
    categories: [],
    city: '',
    district: '',
    isveren: '',
    konutSayisi: 0,
    dukkanSayisi: 0,
    googleMapsLink: '',
    krokiLink: '',
    documentLink: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, categories: [...prev.categories, value] };
      } else {
        return { ...prev, categories: prev.categories.filter(c => c !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!formData.title || !formData.city) {
      setMessage('Lütfen Proje Başlığı ve Şehir alanlarını doldurun.');
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'projeler'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      
      setMessage('Proje başarıyla eklendi! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error("Proje eklenirken hata:", error);
      setMessage('Proje eklenirken bir hata oluştu.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Yeni Proje Ekle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700">Proje Başlığı</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="block text-sm font-bold text-gray-700">Proje Durumu</label>
            <select name="status" value={formData.status} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option>Devam Ediyor</option>
              <option>Tamamlandı</option>
              <option>Planlanıyor</option>
            </select>
          </div>
          <div>
            <label htmlFor="isveren" className="block text-sm font-bold text-gray-700">İşveren</label>
            <input type="text" name="isveren" value={formData.isveren} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="örn: TOKİ" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700">Kategoriler</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {projectCategories.map(category => (
              <label key={category} className="flex items-center space-x-2">
                <input type="checkbox" value={category} onChange={handleCategoryChange} className="rounded" />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-bold text-gray-700">Şehir</label>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-bold text-gray-700">İlçe / Mevki</label>
            <input type="text" name="district" value={formData.district} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="konutSayisi" className="block text-sm font-bold text-gray-700">Konut Sayısı</label>
                <input type="number" name="konutSayisi" value={formData.konutSayisi} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label htmlFor="dukkanSayisi" className="block text-sm font-bold text-gray-700">Dükkan / Ticari Alan Sayısı</label>
                <input type="number" name="dukkanSayisi" value={formData.dukkanSayisi} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-bold text-gray-700">Özet Açıklama</label>
          <textarea name="summary" value={formData.summary} onChange={handleInputChange} rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        
        <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Proje Linkleri (Opsiyonel)</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="googleMapsLink" className="block text-sm font-medium text-gray-700">Google Haritalar Linki</label>
                    <input type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="https://google.com/maps..." />
                </div>
                <div>
                    <label htmlFor="krokiLink" className="block text-sm font-medium text-gray-700">Kroki / Plan Linki</label>
                    <input type="url" name="krokiLink" value={formData.krokiLink} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="PDF, resim veya dosya linki" />
                </div>
                <div>
                    <label htmlFor="documentLink" className="block text-sm font-medium text-gray-700">Proje Dokümanı Linki</label>
                    <input type="url" name="documentLink" value={formData.documentLink} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Sunum, rapor veya dosya linki" />
                </div>
            </div>
        </div>

        <div className="mt-6">
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-bold">
            {isLoading ? 'Kaydediliyor...' : 'Yeni Projeyi Kaydet'}
          </button>
        </div>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}