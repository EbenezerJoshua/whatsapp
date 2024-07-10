// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu_i_gYUPFTyhOOo9xsTp771UQOnIDiIY",
  authDomain: "whatsapp-exp.firebaseapp.com",
  projectId: "whatsapp-exp",
  storageBucket: "whatsapp-exp.appspot.com",
  messagingSenderId: "954443155882",
  appId: "1:954443155882:web:a87e27506d003ca8e883d3",
  measurementId: "G-HHZEN46XZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, setDoc, getDoc };
