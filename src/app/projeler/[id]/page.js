// src/app/projeler/[id]/page.js

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

// URL'den gelen ID'ye göre tek bir proje çeken fonksiyon
async function fetchProjectById(id) {
  const docRef = doc(db, 'projeler', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // Belge bulunamadı!
    return null;
  }
}

export default async function ProjectDetailPage({ params }) {
  const project = await fetchProjectById(params.id);

  // Eğer proje bulunamazsa bir mesaj gösterelim
  if (!project) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold">Proje Bulunamadı</h1>
        <p className="mt-4">Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/projeler" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Tüm Projelere Geri Dön
        </Link>
      </div>
    );
  }

  // Proje bulunduysa detayları gösterelim
  return (
    <div className="container mx-auto p-8">
      <Link href="/projeler" className="text-blue-600 hover:underline mb-6 block">&larr; Tüm Projelere Geri Dön</Link>
      
      <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
        {project.category}
      </span>
      
      <h1 className="text-4xl font-bold my-4">{project.title}</h1>
      
      <p className="text-lg text-gray-600">
        {project.summary}
      </p>

      {/* İleride buraya proje fotoğrafları, teknik detaylar vb. gelecek */}
      <div className="mt-8 p-4 border-t">
        <h3 className="font-semibold">Proje Detayları</h3>
        <p>Bu alana daha fazla bilgi eklenecektir.</p>
      </div>
    </div>
  );
}