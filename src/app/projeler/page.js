// src/app/projeler/page.js

import Link from 'next/link'; // Link bileşenini import etmeyi unutma
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function fetchProjects() {
  const projectsCollection = collection(db, 'projeler');
  const projectSnapshot = await getDocs(projectsCollection);
  const projectList = projectSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return projectList;
}

export default async function ProjelerPage() {
  const projects = await fetchProjects();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Projelerimiz</h1>
      
      {projects.length === 0 ? (
        <p>Gösterilecek proje bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            // BURAYI GÜNCELLEDİK: div'i Link ile sardık
            <Link key={project.id} href={`/projeler/${project.id}`} className="block border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.summary}</p>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                {project.category}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}