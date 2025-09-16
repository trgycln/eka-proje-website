// src/app/hakkimizda/page.js

import Image from 'next/image';

export default function HakkimizdaPage() {
  return (
    <div className="bg-white">
      {/* Sayfa Başlığı Alanı */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Hakkımızda</h1>
          <p className="mt-2 text-lg text-gray-600">EKA Proje&apos;nin Temelleri ve Gelecek Vizyonu</p>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Metin Bölümü */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kurucumuzun Tecrübesi, Projelerimizin Güvencesi</h2>
            <p className="text-gray-700 mb-4">
              EKA Proje, İnşaat Mühendisi Tolga CELEN tarafından, sektördeki yılların birikimi ve tecrübesiyle kurulmuştur. Her projeye, bir mühendisin titizliğini ve bir liderin vizyonunu yansıtarak, en yüksek kalite standartlarında işler teslim etmeyi misyon edindik.
            </p>
            <p className="text-gray-700">
              Vizyonumuz, sadece yapıları değil, aynı zamanda geleceği de inşa etmektir. Türkiye&apos;de ve ileride uluslararası arenada, altyapı ve yol yapımı denince akla gelen ilk, en güvenilir ve en yenilikçi firma olmayı hedefliyoruz.
            </p>
          </div>
          
          {/* Görsel Bölümü */}
          <div className="text-center">
            {/* Abinin veya temsili bir mühendis fotoğrafı buraya gelecek.
                Şimdilik bir placeholder kullanıyoruz.
                Fotoğrafı public klasörüne ekleyip yolunu değiştireceğiz.
            */}
            <div className="w-80 h-80 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500">Fotoğraf Alanı</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Tolga CELEN</h3>
            <p className="text-gray-600">Kurucu / İnşaat Mühendisi</p>
          </div>
        </div>
      </div>
    </div>
  );
}