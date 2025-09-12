import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase (copie do seu console)
const firebaseConfig = {
  apiKey: "AIzaSyBCbkn62UvT9Zs9T7hA0qEIgEQO4Jk4TyI",
  authDomain: "sportsconnect-c2fe4.firebaseapp.com",
  projectId: "sportsconnect-c2fe4",
  storageBucket: "sportsconnect-c2fe4.appspot.com",
  messagingSenderId: "1095499496218",
  appId: "1:1095499496218:web:a9fa6543256ca747b60aa3",
  measurementId: "G-TT032HZP51"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços que vamos usar
export const db = getFirestore(app); // Firestore (banco de dados)
export const auth = getAuth(app);    // Autenticação
