// config/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCbkn62UvT9Zs9T7hA0qEIgEQO4Jk4TyI",
  authDomain: "sportsconnect-c2fe4.firebaseapp.com",
  projectId: "sportsconnect-c2fe4",
  storageBucket: "sportsconnect-c2fe4.firebasestorage.app",
  messagingSenderId: "1095499496218",
  appId: "1:1095499496218:web:a9fa6543256ca747b60aa3",
  measurementId: "G-TT032HZP51"
};

// Evita inicializar o Firebase mais de uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta o Firestore
export const db = getFirestore(app);
