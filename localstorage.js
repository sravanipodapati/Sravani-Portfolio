document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userInfoForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const savedInfoContainer = document.getElementById('savedInfo');

    // Function to display all saved data
    function displaySavedData() {
        // Get saved information from localStorage (parse JSON string back to array)
        const savedData = JSON.parse(localStorage.getItem('userInfo')) || [];

        // If there are saved data, display them
        if (savedData.length > 0) {
            let html = '';
            savedData.forEach((entry, index) => {
                html += `
                    <p><strong>Entry ${index + 1}:</strong></p>
                    <p><strong>Name:</strong> ${entry.name}</p>
                    <p><strong>Email:</strong> ${entry.email}</p>
                    <hr>
                `;
            });
            savedInfoContainer.innerHTML = html;
        } else {
            savedInfoContainer.innerHTML = "<p>No information saved yet.</p>";
        }
    }

    // Display saved data when the page loads
    displaySavedData();

    // Handle form submission to save data in localStorage
    form.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent form from reloading the page

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name && email) {
            // Get the existing saved data (or an empty array if nothing exists yet)
            const savedData = JSON.parse(localStorage.getItem('userInfo')) || [];

            // Create a new entry object
            const newEntry = { name, email };

            // Add the new entry to the saved data array
            savedData.push(newEntry);

            // Save the updated data array back to localStorage
            localStorage.setItem('userInfo', JSON.stringify(savedData));

            // Clear the form fields after saving
            nameInput.value = '';
            emailInput.value = '';

            // Re-display saved information
            displaySavedData();
        } else {
            alert('Both name and email are required!');
        }
    });
});
