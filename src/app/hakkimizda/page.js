// src/app/hakkimizda/page.js

"use client";

import Image from 'next/image';

export default function HakkimizdaPage() {
  return (
    <div className="bg-slate-50">
      <div className="bg-white py-12 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Hakkımızda</h1>
          <p className="mt-2 text-lg text-gray-600">EKA Proje'nin Vizyonu ve Tecrübesi</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Metin Alanı */}
          <div className="md:pl-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Mühendislik ve Müşavirlikte Güvenilir Çözüm Ortağınız</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              EKA ALTYAPI PROJE MÜŞAVİRLİK MÜHENDİSLİK MİMARLIK İNŞAAT SANAYİ TİCARET LİMİTED ŞİRKETİ, sektördeki derin tecrübesiyle yol ve altyapı projelerinde mühendislik ve müşavirlik hizmetleri sunmaktadır.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Vizyonumuz, en güncel teknolojiyi ve en iyi mühendislik pratiklerini kullanarak, projeleri zamanında, bütçesinde ve en yüksek kalite standartlarında tamamlamaktır. Güvenilirliğimiz, tamamladığımız işlerin kalitesinde yatmaktadır.
            </p>
          </div>
          
          {/* Logo ve Başlık Alanı */}
          <div className="flex flex-col items-center justify-center p-4">
            {/* 3D Logo Çerçevesi */}
            <div 
              className="
                relative mx-auto w-80 h-80 md:w-96 md:h-96 
                rounded-full 
                bg-white 
                flex items-center justify-center 
                ring-1 ring-slate-200 
                transition-all duration-300
                shadow-[12px_12px_40px_rgba(0,0,0,0.15),_-12px_-12px_40px_rgba(255,255,255,1)]
              "
            >
              <Image 
                src="/images/eka_3d_logo.png"
                alt="EKA Proje 3D Logo"
                width={280} 
                height={280}
                className="rounded-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            {/* --- YENİDEN EKLENEN KISIM --- */}
            <div className="text-center mt-8">
              <h3 className="text-2xl font-bold text-slate-800">EKA Proje Yönetimi</h3>
              <p className="text-md text-slate-500 mt-1">Kurucu Vizyonu ve Mühendislik Anlayışı</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}