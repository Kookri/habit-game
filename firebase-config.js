// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';


export const firebaseConfig = {
    apiKey: "AIzaSyD4izXhmrP-vXKK3zuOzm6VjP2tUEk_jVI",
    authDomain: "habit-hero-a0e46.firebaseapp.com",
    projectId: "habit-hero-a0e46",
    storageBucket: "habit-hero-a0e46.appspot.com",
    messagingSenderId: "752138074660",
    appId: "1:752138074660:web:509709cd48f55833eaf6b1",
    measurementId: "G-6NKB0FQMCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };