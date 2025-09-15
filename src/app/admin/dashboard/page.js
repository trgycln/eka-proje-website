// src/app/admin/dashboard/page.js

"use client"; // Silme fonksiyonu için Client Component'e dönüştürüyoruz

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verileri client tarafında çekmek için useEffect kullanıyoruz
  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(db, 'projeler');
      const projectSnapshot = await getDocs(projectsCollection);
      const projectList = projectSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectList);
      setLoading(false);
    };

    fetchProjects();
  }, []); // Boş dependency array, sayfa yüklendiğinde bir kez çalışmasını sağlar

  const handleDelete = async (projectId) => {
    // KAZAYLA SİLMEYİ ÖNLEMEK İÇİN ONAY İSTEYELİM!
    if (window.confirm("Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      try {
        await deleteDoc(doc(db, "projeler", projectId));
        // Sayfayı yenilemeden listeden silmek için state'i güncelliyoruz
        setProjects(projects.filter(p => p.id !== projectId));
        alert("Proje başarıyla silindi.");
      } catch (error) {
        console.error("Proje silinirken hata:", error);
        alert("Proje silinirken bir hata oluştu.");
      }
    }
  };

  if (loading) return <div className="container mx-auto p-8 text-center">Projeler Yükleniyor...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Yönetici Paneli</h1>
          <p className="text-gray-600">Mevcut Projeler</p>
        </div>
      </div>

      <div className="mb-6">
        <Link href="/admin/add-project" className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
          + Yeni Proje Ekle
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <ul className="divide-y divide-gray-200">
          {projects.map(project => (
            <li key={project.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{project.title}</p>
                <p className="text-sm text-gray-500">{project.category}</p>
              </div>
              <div className="space-x-2">
                <Link href={`/admin/edit-project/${project.id}`} className="text-sm bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                  Düzenle
                </Link>
                <button onClick={() => handleDelete(project.id)} className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}