// scripts.js
import { db } from './firebase-config.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

function getFormData() {
    const habitName = document.getElementById('habit-name').value;
    const habitDescription = document.getElementById('habit-description').value;
    const habitRecurrence = document.getElementById('habit-recurrence').value;
    const habitCustomRecurrence = document.getElementById('habit-custom-recurrence').value;
    const habitAttribute = document.getElementById('habit-attribute').value;
    const habitDifficulty = document.getElementById('habit-difficulty').value;

    return {
        name: habitName,
        description: habitDescription,
        recurrence: habitRecurrence === 'custom' ? parseInt(habitCustomRecurrence, 10) : 'daily',
        attribute: habitAttribute,
        difficulty: habitDifficulty,
    };
}

function validateHabit(habit) {
    // Add validation logic for the habit object.
    // Return true if the habit is valid, false otherwise.
    // Example: Check if habit name is not empty
    return habit.name.trim() !== '';
}

async function saveHabit(habit) {
    try {
        const docRef = await addDoc(collection(db, 'habits'), habit);
        console.log('Document written with ID: ', docRef.id);
        return true;
    } catch (error) {
        console.error('Error adding document: ', error);
        return false;
    }
}

const habitForm = document.getElementById('habit-form');
habitForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const habitData = getFormData();

    if (!validateHabit(habitData)) {
        alert('Please provide valid input');
        return;
    }

    const success = await saveHabit(habitData);

    if (success) {
        habitForm.reset();
        alert('Habit created successfully!');
    } else {
        alert('An error occurred while saving the habit. Please try again.');
    }
});