// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database"; // Import get for fetching data

const firebaseConfig = {
  apiKey: "AIzaSyDPjjndHLSJX8LuvtOppkGuepPVXQtOgng",
  authDomain: "petfeast-a63bc.firebaseapp.com",
  projectId: "petfeast-a63bc",
  storageBucket: "petfeast-a63bc.firebasestorage.app",
  messagingSenderId: "707146170253",
  appId: "1:707146170253:web:ce13f0ab0be034071107c4",
  measurementId: "G-0NC9ZXJ3E1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get }; // Export get as well