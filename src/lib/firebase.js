// src/lib/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Senin Firebase proje yapılandırma bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyC_54lqjMnEtLTAiqSzlEOE54BsfZrFHHA",
  authDomain: "eka-proje-website.firebaseapp.com",
  projectId: "eka-proje-website",
  storageBucket: "eka-proje-website.firebasestorage.app",
  messagingSenderId: "621390424757",
  appId: "1:621390424757:web:d8c84019d0ba2e9631acfc"
};


// Firebase uygulamasını başlat
// Sunucu tarafında render olurken uygulamanın tekrar tekrar başlatılmasını önlemek için kontrol ekliyoruz.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore veritabanı örneğini dışa aktar
const db = getFirestore(app);
// Initialize Firebase

export { db, app };
