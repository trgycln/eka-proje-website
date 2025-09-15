// src/app/page.js

import Link from 'next/link';

// İkonları temsil edecek basit bileşenler. 
// İleride gerçek ikon kütüphaneleri (react-icons gibi) kullanabiliriz.
const RoadIcon = () => (
  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
);
const InfrastructureIcon = () => (
  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 6h14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const ManagementIcon = () => (
  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);


export default function HomePage() {
  return (
    <>
      {/* Hero Section - Etkileyici Giriş Alanı */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto text-center py-24 md:py-32 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Geleceğin Altyapısını İnşa Ediyoruz
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
            EKA Proje olarak, yol ve altyapı projelerinizde modern mühendislik yaklaşımları ve yenilikçi çözümlerle yanınızdayız.
          </p>
          <div className="mt-8">
            <Link href="/projeler" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
              Projelerimizi İnceleyin
            </Link>
          </div>
        </div>
      </section>

      {/* Hizmetler Bölümü */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Temel Yetkinliklerimiz</h2>
            <p className="mt-2 text-lg text-gray-600">Uzmanlık alanlarımızla projelerinize değer katıyoruz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Hizmet Kartı 1 */}
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <RoadIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Yol & Otoyol İnşaatı</h3>
              <p className="text-gray-600">
                Şehir içi yollardan otoyollara, kaliteli ve uzun ömürlü ulaşım ağları kuruyoruz.
              </p>
            </div>
            
            {/* Hizmet Kartı 2 */}
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <InfrastructureIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Altyapı & Drenaj Çözümleri</h3>
              <p className="text-gray-600">
                Yağmur suyu, kanalizasyon ve diğer altyapı sistemlerini modern standartlarda tasarlıyor ve uyguluyoruz.
              </p>
            </div>
            
            {/* Hizmet Kartı 3 */}
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <ManagementIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proje Yönetimi & Danışmanlık</h3>
              <p className="text-gray-600">
                Projenizin planlamasından teslimine kadar tüm süreçleri profesyonel ekibimizle yönetiyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}