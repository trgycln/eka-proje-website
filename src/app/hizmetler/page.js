// src/app/hizmetler/page.js

import Link from 'next/link';

// Anasayfadaki ikonları tutarlılık için burada da kullanalım.
const RoadIcon = () => (
  <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
);
const InfrastructureIcon = () => (
  <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 6h14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const ManagementIcon = () => (
  <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);

export default function HizmetlerPage() {
  const services = [
    {
      icon: <RoadIcon />,
      title: 'Yol & Otoyol İnşaatı',
      description: 'Modern ekipmanlarımız ve tecrübeli ekibimizle, uluslararası standartlarda şehir içi yollar, çevre yolları ve otoyol projeleri hayata geçiriyoruz. Zemin etütlerinden asfaltlama ve yol çizgilerine kadar anahtar teslim çözümler sunuyoruz.',
      link: '/projeler?kategori=yol' // İleride projeleri filtrelemek için
    },
    {
      icon: <InfrastructureIcon />,
      title: 'Altyapı & Drenaj Çözümleri',
      description: 'Sürdürülebilir şehirlerin temeli olan altyapı projelerinde uzmanız. Yağmur suyu toplama ve drenaj hatları, kanalizasyon ve içme suyu şebekeleri gibi kritik altyapı ihtiyaçlarına kalıcı ve verimli çözümler üretiyoruz.',
      link: '/projeler?kategori=altyapi'
    },
    {
      icon: <ManagementIcon />,
      title: 'Proje Yönetimi & Danışmanlık',
      description: 'İnşaat projelerinizin her aşamasında profesyonel yönetim ve danışmanlık hizmeti sunuyoruz. Bütçe planlaması, zaman yönetimi, kalite kontrol ve risk yönetimi gibi konularda projenizin başarıyla tamamlanmasını sağlıyoruz.',
      link: '/projeler?kategori=danismanlik'
    }
  ];

  return (
    <>
      {/* Sayfa Başlığı Alanı */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Hizmetlerimiz</h1>
          <p className="mt-2 text-lg text-gray-600">Mühendislik ve İnşaat Alanındaki Uzmanlıklarımız</p>
        </div>
      </div>

      {/* Hizmetler Listesi */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8 p-6 border rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  {service.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h2>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <Link href="/projeler" className="font-semibold text-blue-600 hover:underline">
                    İlgili Projeleri Gör &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}