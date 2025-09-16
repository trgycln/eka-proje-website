// src/app/projeler/page.js

"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// Gerekli tüm ikonları import ediyoruz
import { FaCity, FaBuilding, FaClipboardList, FaInfoCircle, FaHardHat, FaMapMarkedAlt, FaUserTie, FaFilePdf, FaRulerHorizontal, FaStore } from 'react-icons/fa';

// --- YARDIMCI BİLEŞENLER ---

// Proje Durumuna göre renkli etiket döndüren bileşen
const StatusBadge = ({ status }) => {
  const styles = {
    'Tamamlandı': 'bg-green-100 text-green-800',
    'Devam Ediyor': 'bg-yellow-100 text-yellow-800',
    'Planlanıyor': 'bg-blue-100 text-blue-800',
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

// Proje Detaylarını gösteren Gelişmiş Modal (Popup) Bileşeni
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  // Proje Künyesi için yardımcı bileşen
  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-6 text-center">
        {icon}
      </div>
      <div className="ml-4">
        <span className="text-sm text-slate-500 block">{label}</span>
        <p className="font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );

  // Proje link butonları için yardımcı bileşen
  const LinkButton = ({ href, icon, text }) => {
    const hasLink = href && href.trim() !== '';
    const Tag = hasLink ? 'a' : 'div';

    return (
      <Tag
        href={hasLink ? href : undefined}
        target={hasLink ? "_blank" : undefined}
        rel={hasLink ? "noopener noreferrer" : undefined}
        className={`flex items-center justify-center p-3 rounded-lg text-sm font-semibold transition-colors ${
          hasLink 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {icon}
        <span className="ml-2">{text}</span>
      </Tag>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl relative animate-fade-in-up transform transition-all duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-800 text-white p-6 rounded-t-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-sm text-slate-300 mt-1">{project.city}, {project.district}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-h-[80vh] overflow-y-auto">
          <div className="md:col-span-1 space-y-6 border-r pr-6">
            <h3 className="font-bold text-xl text-slate-700 border-b pb-2">Proje Künyesi</h3>
            <DetailItem icon={<FaUserTie className="text-slate-500" />} label="İşveren" value={project.isveren || 'Belirtilmemiş'} />
            <DetailItem icon={<FaMapMarkedAlt className="text-slate-500" />} label="Lokasyon" value={`${project.city}, ${project.district}`} />
            <DetailItem icon={<FaInfoCircle className="text-slate-500" />} label="Durum" value={project.status} />
            <DetailItem icon={<FaClipboardList className="text-slate-500" />} label="Kategoriler" value={project.categories?.join(', ')} />
            {project.konutSayisi > 0 && <DetailItem icon={<FaBuilding className="text-slate-500" />} label="Konut Sayısı" value={project.konutSayisi} />}
            {project.dukkanSayisi > 0 && <DetailItem icon={<FaStore className="text-slate-500" />} label="Dükkan Sayısı" value={project.dukkanSayisi} />}

            <h3 className="font-bold text-xl text-slate-700 border-b pb-2 pt-4">Proje Kaynakları</h3>
            <div className="space-y-3">
              <LinkButton href={project.googleMapsLink} icon={<FaMapMarkedAlt />} text="Haritada Görüntüle" />
              <LinkButton href={project.krokiLink} icon={<FaRulerHorizontal />} text="Krokiyi Görüntüle" />
              <LinkButton href={project.documentLink} icon={<FaFilePdf />} text="Proje Dokümanı" />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold text-xl text-slate-700 border-b pb-2 mb-4">Proje Özeti</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{project.summary || 'Bu proje için bir özet açıklama girilmemiştir.'}</p>
            
            <div className="mt-8">
              <h3 className="font-bold text-xl text-slate-700 border-b pb-2 mb-4">Görseller</h3>
              <div className="p-4 bg-slate-50 rounded-lg text-center">
                <FaHardHat className="mx-auto text-3xl text-slate-400 mb-2" />
                <p className="text-sm text-slate-500">Proje görselleri yakında eklenecektir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- ANA SAYFA ---
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, 'projeler'), orderBy('createdAt', 'desc'));
      const projectSnapshot = await getDocs(q);
      const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectList);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="text-center p-12">Projeler Yükleniyor...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Tamamlanan Projeler</h1>
          <p className="mt-2 text-lg text-gray-600">Uzmanlığımızı ve tecrübemizi yansıtan çalışmalarımız.</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 bg-gray-100 p-4 font-bold text-sm text-gray-600 border-b">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Proje Adı</div>
            <div className="col-span-3">Lokasyon</div>
            <div className="col-span-2">Kategoriler</div>
            <div className="col-span-2 text-center">Durum</div>
          </div>
          
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <div className="hidden md:flex md:items-center md:justify-center col-span-1 text-sm text-gray-500 font-medium">{index + 1}</div>
              
              <div className="col-span-12 md:col-span-4">
                <p className="font-semibold text-gray-800">{project.title}</p>
                <div className="flex items-center space-x-2 md:hidden mt-1 text-xs text-gray-500">
                  <span>#{index + 1}</span>
                  <span>&bull;</span>
                  <span>{project.city}</span>
                </div>
              </div>

              <div className="hidden md:flex md:items-center col-span-3 text-sm text-gray-700">{project.city}, {project.district}</div>
              <div className="hidden md:flex md:items-center col-span-2 text-sm text-gray-700">{project.categories?.join(', ')}</div>
              
              <div className="col-span-12 md:col-span-2 flex items-center justify-end md:justify-center">
                <StatusBadge status={project.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}