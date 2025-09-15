// src/components/Footer.js

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Otomatik olarak güncel yılı alır

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="font-semibold">EKA Proje</p>
        <p className="mt-2 text-sm text-gray-400">
          Yol ve Altyapı Çözümlerinde Güvenilir Ortağınız
        </p>
        <p className="mt-4 text-xs text-gray-500">
          &copy; {currentYear} EKA Proje. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}