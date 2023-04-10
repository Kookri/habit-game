import { db } from './firebase-config.js';
import { getDocs, collection, onSnapshot, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';

const habitsList = document.getElementById("habits-list");

// Get the habits from the database and render them
const renderHabits = async () => {
  const habits = await getDocs(collection(db, "habits"));
  habitsList.innerHTML = habits.docs.map(renderHabit).join("");
};

// Render a single habit item
const renderHabit = (doc) => {
  const habit = doc.data();
  return `
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
};

// Update the habit's completed status in the database
const completeHabit = async (habitId) => {
  const habitRef = doc(db, "habits", habitId);
  await updateDoc(habitRef, { completed: true });
};

// Delete the habit from the database
const deleteHabit = async (habitId) => {
  const habitRef = doc(db, "habits", habitId);
  await deleteDoc(habitRef);
};

// Listen for changes in the habits collection and update the list
onSnapshot(collection(db, "habits"), renderHabits);

// Add event listeners for edit, complete, and delete buttons
habitsList.addEventListener("click", (e) => {
  const habitId = e.target.closest(".habit").id;

  if (e.target.classList.contains("complete")) {
    completeHabit(habitId);
  } else if (e.target.classList.contains("edit")) {
    // Edit the habit (open a form or modal to edit the habit)
  } else if (e.target.classList.contains("delete")) {
    deleteHabit(habitId);
  }
});

// Initialize the app
renderHabits();
