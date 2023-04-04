document.addEventListener('DOMContentLoaded', function() {
    const habitForm = document.getElementById('habit-form');
    const habitRecurrence = document.getElementById('habit-recurrence');
    const customRecurrenceContainer = document.getElementById('custom-recurrence-container');

    // Show or hide the custom recurrence input based on the selected recurrence option
    habitRecurrence.addEventListener('change', function() {
        if (habitRecurrence.value === 'custom') {
            customRecurrenceContainer.style.display = 'block';
        } else {
            customRecurrenceContainer.style.display = 'none';
        }
    });

    // Handle form submission
    habitForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const habitName = document.getElementById('habit-name').value;
        const habitDescription = document.getElementById('habit-description').value;
        const habitRecurrence = document.getElementById('habit-recurrence').value;
        const habitCustomRecurrence = document.getElementById('habit-custom-recurrence').value;
        const habitAttribute = document.getElementById('habit-attribute').value;
        const habitDifficulty = document.getElementById('habit-difficulty').value; // Add this line

        const habitData = {
            name: habitName,
            description: habitDescription,
            recurrence: habitRecurrence === 'custom' ? parseInt(habitCustomRecurrence, 10) : 'daily',
            attribute: habitAttribute,
            difficulty: habitDifficulty,
        };

        // Here, you can send the habitData object to your server-side logic for further processing and storage
        console.log(habitData);

        // Clear the form after successful submission
        habitForm.reset();

        // Optionally, show a success message or redirect the user to another page
        alert('Habit created successfully!');
    });
});
