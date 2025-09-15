// src/lib/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Senin Firebase proje yapılandırma bilgilerin
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


// Firebase uygulamasını başlat
// Sunucu tarafında render olurken uygulamanın tekrar tekrar başlatılmasını önlemek için kontrol ekliyoruz.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore veritabanı örneğini dışa aktar
const db = getFirestore(app);
// Initialize Firebase

export { db, app };
