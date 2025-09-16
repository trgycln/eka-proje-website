// scripts/seed.js

const admin = require('firebase-admin');
const projectsData = require('./projects.json');

// Lütfen indirdiğiniz anahtar dosyasının adının doğru olduğundan emin olun
const serviceAccount = require('../eka-proje-website-firebase-adminsdk-fbsvc-249a4c4b3a');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const projectsCollection = db.collection('projeler');

async function seedDatabase() {
  console.log('Veri ekleme işlemi başlıyor...');
  
  for (const project of projectsData) {
    try {
      // JSON dosyasındaki tüm alanları doğrudan Firestore'a gönderiyoruz
      await projectsCollection.add({
        ...project,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`EKLENDİ: ${project.title}`);
    } catch (error) {
      console.error(`HATA: ${project.title} eklenirken sorun oluştu.`, error);
    }
  }
  
  console.log('Tüm veriler başarıyla eklendi! İşlem tamamlandı.');
}

seedDatabase();