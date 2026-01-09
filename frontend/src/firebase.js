import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔑 Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBsI3L6F8qylgyffCeZFj6sXMITwPWppb0",
  authDomain: "e-commerce-auth-c4e53.firebaseapp.com",
  projectId: "e-commerce-auth-c4e53",
  storageBucket: "e-commerce-auth-c4e53.firebasestorage.app",
  messagingSenderId: "799637646266",
  appId: "1:799637646266:web:0ba2478e33746650304b83",
  measurementId: "G-SVKP4PN6KT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ NAMED EXPORTS (THIS IS IMPORTANT)
export const auth = getAuth(app);
export const db = getFirestore(app);
