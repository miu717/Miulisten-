// ✅ Firebase SDK v9+ Modular Style

// 📦 Import Required Firebase Functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// 🔐 Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOIuh81q2Vq1p73FjAeD4Smnt1y1RN7w4",
  authDomain: "miulisten.firebaseapp.com",
  databaseURL: "https://miulisten-default-rtdb.firebaseio.com",
  projectId: "miulisten",
  storageBucket: "miulisten.appspot.com",
  messagingSenderId: "546317241103",
  appId: "1:546317241103:web:7f74161f032edd64f5cc7a",
  measurementId: "G-NFKR2TPJKP"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 📡 Firebase Services
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
