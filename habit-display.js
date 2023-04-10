import { db } from './firebase-config.js';
import { getDocs, collection, onSnapshot, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

// Reference to the habits collection
const habitsRef = collection(db, "habits");

// Reference to the habits list container in the HTML
const habitsList = document.getElementById("habits-list");

// Function to render the habits list
const renderHabits = (querySnapshot) => {
  habitsList.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const habit = doc.data();
    habitsList.innerHTML += `
      <div id="${doc.id}" class="habit">
        <h2>${habit.name}</h2>
        <p>Description: ${habit.description}</p>
        <p>Recurrence: ${habit.recurrence}</p>
        <p>Attribute: ${habit.attribute}</p>
        <p>Difficulty: ${habit.difficulty}</p>
        <button class="complete">Complete</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
  });
};

// Listen for changes in the habits collection and update the list
onSnapshot(habitsRef, renderHabits);

// Add event listeners for edit, complete, and delete buttons
habitsList.addEventListener("click", async (e) => {
  const habitId = e.target.closest(".habit").id;
  const habitRef = doc(db, "habits", habitId);

  if (e.target.classList.contains("complete")) {
    // Mark the habit as completed
    await updateDoc(habitRef, { completed: true });
  } else if (e.target.classList.contains("edit")) {
    // Edit the habit (open a form or modal to edit the habit)
  } else if (e.target.classList.contains("delete")) {
    // Delete the habit
    await deleteDoc(habitRef);
  }
});
