// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Corrected here

const firebaseConfig = {
  apiKey: "AIzaSyD26FKs5qLWdSYaciTAIsgEG4l2HQfxxOI",
  authDomain: "candyleaf-6c4dd.firebaseapp.com",
  projectId: "candyleaf-6c4dd",
  storageBucket: "candyleaf-6c4dd.firebasestorage.app",
  messagingSenderId: "1066881961119",
  appId: "1:1066881961119:web:8044844a6912f3a482a6aa",
  measurementId: "G-BV7VHWKG36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Corrected here
