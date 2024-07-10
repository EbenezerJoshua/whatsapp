// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
const { getFirestore, doc, setDoc, getDoc } = require ("firebase/firestore");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);

module.exports = { db, doc, setDoc, getDoc };