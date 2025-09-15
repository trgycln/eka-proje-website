// src/app/iletisim/page.js

export default function IletisimPage() {
  return (
    <>
      {/* Sayfa Başlığı Alanı */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">İletişim</h1>
          <p className="mt-2 text-lg text-gray-600">Proje ve işbirliği talepleriniz için bize ulaşın.</p>
        </div>
      </div>

      {/* İletişim Bilgileri ve Form Alanı */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Adres</h3>
              <p className="text-gray-600 mt-1">
                [Firma Adresi Buraya Gelecek], <br />
                [İlçe/Şehir], Türkiye
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">E-Posta</h3>
              <p className="text-gray-600 mt-1">
                <a href="mailto:info@ekaproje.com" className="text-blue-600 hover:underline">
                  info@ekaproje.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Telefon</h3>
              <p className="text-gray-600 mt-1">[+90 (XXX) XXX XX XX]</p>
            </div>
            {/* İleride buraya Google Haritalar eklenebilir */}
          </div>

          {/* İletişim Formu (Şimdilik görsel) */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Bize Mesaj Gönderin</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Adınız Soyadınız</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Posta Adresiniz</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
                <textarea id="message" name="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}