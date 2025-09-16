// src/app/page.js

"use client";

import Link from 'next/link';
import { FaRoad, FaCubes, FaRulerCombined } from 'react-icons/fa';

export default function HomePage() {
  const services = [
    {
      icon: <FaRoad className="w-12 h-12 text-blue-600" />,
      title: "Yol & Otoyol İnşaatı",
      description: "Şehir içi yollardan otoyollara, kaliteli ve uzun ömürlü ulaşım ağları kuruyoruz."
    },
    {
      icon: <FaCubes className="w-12 h-12 text-blue-600" />,
      title: "Altyapı & Drenaj Çözümleri",
      description: "Yağmur suyu, kanalizasyon ve diğer altyapı sistemlerini modern standartlarda tasarlıyor ve uyguluyoruz."
    },
    {
      icon: <FaRulerCombined className="w-12 h-12 text-blue-600" />,
      title: "Proje Yönetimi & Danışmanlık",
      description: "Projenizin planlamasından teslimine kadar tüm süreçleri profesyonel ekibimizle yönetiyoruz."
    }
  ];

  return (
    <>
      {/* Hero Section - Mobil için Optimize Edilmiş Hali */}
      <section 
        className="relative h-[55vh] md:h-[75vh] bg-black overflow-hidden"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70"
        >
          <source src="/videos/banner-video.mp4" type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </section>

      {/* Hizmetler Bölümü */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Temel Yetkinliklerimiz</h2>
            <p className="mt-2 text-lg text-gray-600">Uzmanlık alanlarımızla projelerinize değer katıyoruz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {services.map((service, index) => (
              <div key={index} className="p-6">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/projeler" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
              Tüm Projelerimizi İnceleyin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}