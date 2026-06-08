
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxFRNSY-L78QESvgzY1l618siZHsDTagI",
  authDomain: "emza-watch.firebaseapp.com",
  projectId: "emza-watch",
  storageBucket: "emza-watch.firebasestorage.app",
  messagingSenderId: "3159480303",
  appId: "1:3159480303:web:acc5c6ed312962af06081a",
  measurementId: "G-7YDDLNX51T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
