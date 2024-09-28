document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('registrationForm');
    const dobInput = document.getElementById('dob');
    const entriesTableBody = document.getElementById('entriesTableBody');

    window.validateDOB = function() {
        dobInput.setCustomValidity(''); 

        const dob = dobInput.value;
        const dateOfBirth = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        const monthDifference = today.getMonth() - dateOfBirth.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
            age--;
        }

        if (age < 18) {
            const minValidDate = new Date(today);
            minValidDate.setFullYear(today.getFullYear() - 18);
            dobInput.setCustomValidity(`Your dob should be on or before ${minValidDate.toLocaleDateString()}.`);
            dobInput.reportValidity();
            return;
        }

        if (age > 55) {
            const maxValidDate = new Date(today);
            maxValidDate.setFullYear(today.getFullYear() - 55);
            dobInput.setCustomValidity(`Your dob should be on or after ${maxValidDate.toLocaleDateString()}.`);
            dobInput.reportValidity(); 
            return;
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const termsAccepted = document.getElementById('terms').checked;
        const dob = dobInput.value; 

        const entry = {
            name: name,
            email: email,
            password: password,
            dob: dob,
            termsAccepted: termsAccepted
        };

        // Save entry to localStorage
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));

        displayEntries(); 
        form.reset(); 
    });

    function displayEntries() {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entriesTableBody.innerHTML = ''; // Clear existing entries
        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.termsAccepted ? 'true' : 'false'}</td>
            `;
            entriesTableBody.appendChild(row); 
        });
    }

    // Display entries when the page loads
    displayEntries();
});
