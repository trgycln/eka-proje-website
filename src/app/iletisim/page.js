"use client";

export default function IletisimPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("İletişim formu henüz aktif değil. Lütfen doğrudan e-posta veya telefon ile ulaşın.");
  };

  return (
    <>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">İletişim</h1>
          <p className="mt-2 text-lg text-gray-600">Proje ve işbirliği talepleriniz için bize ulaşın.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Adres</h3>
              <p className="text-gray-600 mt-1">
                Mustafa Kemal Mahallesi 2157 Sokak 4/12<br />
                Çankaya / Ankara, Türkiye
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">E-Posta</h3>
              <p className="text-gray-600 mt-1">
                <a href="mailto:ekaaltyapi@gmail.com" className="text-blue-600 hover:underline">
                  ekaaltyapi@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Telefon</h3>
              <p className="text-gray-600 mt-1">0312 235 10 05</p>
            </div>
            {/* Google Harita Entegrasyonu */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Konumumuz</h3>
              <div className="aspect-w-16 aspect-h-9">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.671049909244!2d32.77497267675711!3d39.88210158652613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347137f8f7579%3A0x425b2e3f5339f448!2sMustafa%20Kemal%2C%202157.%20Sk.%20No%3A4%2C%2006530%20%C3%87ankaya%2FAnkara!5e0!3m2!1str!2str!4v1726510000000!5m2!1str!2str" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Bize Mesaj Gönderin</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Adınız Soyadınız</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Posta Adresiniz</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
                <textarea id="message" name="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required></textarea>
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