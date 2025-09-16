"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

// Duruma göre renk döndüren yardımcı fonksiyon
const getStatusColor = (status) => {
  switch (status) {
    case 'Tamamlandı': return 'bg-green-100 text-green-800';
    case 'Devam Ediyor': return 'bg-yellow-100 text-yellow-800';
    case 'Planlanıyor': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      // Projeleri en yeni eklenene göre sıralayalım
      const q = query(collection(db, 'projeler'), orderBy('createdAt', 'desc'));
      const projectSnapshot = await getDocs(q);
      const projectList = projectSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectList);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    if (window.confirm("Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      try {
        await deleteDoc(doc(db, "projeler", projectId));
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
      <h1 className="text-3xl font-bold">Mevcut Projeler</h1>
      <p className="text-gray-600 mb-8">Toplam {projects.length} proje listeleniyor.</p>

      <div className="bg-white shadow-md rounded-lg">
        <ul className="divide-y divide-gray-200">
          {projects.map(project => (
            <li key={project.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div>
                  <p className="font-semibold text-lg text-gray-900">{project.title}</p>
                  <p className="text-sm text-gray-500">{project.city} - {project.categories?.join(', ')}</p>
                </div>
              </div>
              <div className="space-x-2">
                <Link href={`/admin/edit-project/${project.id}`} className="text-sm bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Düzenle</Link>
                <button onClick={() => handleDelete(project.id)} className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Sil</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}