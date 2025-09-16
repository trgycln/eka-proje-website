// src/components/Footer.js

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-4 text-center text-sm">
        <p className="font-semibold">EKA ALTYAPI PROJE MÜŞAVİRLİK MÜHENDİSLİK TİC. LTD. ŞTİ.</p>
        <p className="mt-2 text-gray-400">
          Mustafa Kemal Mahallesi 2157 Sokak 4/12 Çankaya/Ankara
        </p>
        <p className="mt-4 text-xs text-gray-500">
          &copy; {currentYear} EKA Proje. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}