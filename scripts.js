// scripts.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
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

// Handle form submission
const habitForm = document.getElementById('habit-form');
habitForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get form data
    const habitName = document.getElementById('habit-name').value;
    const habitDescription = document.getElementById('habit-description').value;
    const habitRecurrence = document.getElementById('habit-recurrence').value;
    const habitCustomRecurrence = document.getElementById('habit-custom-recurrence').value;
    const habitAttribute = document.getElementById('habit-attribute').value;
    const habitDifficulty = document.getElementById('habit-difficulty').value;

    // Create habit data object
    const habitData = {
        name: habitName,
        description: habitDescription,
        recurrence: habitRecurrence === 'custom' ? parseInt(habitCustomRecurrence, 10) : 'daily',
        attribute: habitAttribute,
        difficulty: habitDifficulty,
    };

    // Save the habit data to Firestore
    try {
        const docRef = await addDoc(collection(db, 'habits'), habitData);
        console.log('Document written with ID: ', docRef.id);
        // Clear the form after successful submission
        habitForm.reset();
        // Show success message to the user
        alert('Habit created successfully!');
    } catch (error) {
        console.error('Error adding document: ', error);
    }
});