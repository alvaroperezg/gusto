import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2AOIUD3sApSskzr4w4sbH_9alrCYIOsQ", // Clave de API web
    authDomain: "gusto-74b76.firebaseapp.com", // Construido con el ID del proyecto
    projectId: "gusto-74b76", // ID del proyecto
    storageBucket: "gusto-74b76.appspot.com", // Construido con el ID del proyecto
    messagingSenderId: "416259229521", // Número de proyecto
  };

const app = initializeApp(firebaseConfig);

// Inicializa y exporta Firestore
const db = getFirestore(app);
export { db };