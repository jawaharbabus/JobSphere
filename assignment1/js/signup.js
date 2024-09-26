import {users} from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    const jobseekerTab = document.getElementById('jobseekerTab');
    const talentseekerTab = document.getElementById('talentseekerTab');
    const jobseekerForm = document.getElementById('jobseekerForm');
    const talentseekerForm = document.getElementById('talentseekerForm');

    function toggleForm(activeTab, activeForm, inactiveTab, inactiveForm) {
        activeTab.classList.toggle('active');
        if (activeForm.style.display === 'none' || activeForm.style.display === '') {
            activeForm.style.display = 'block';
            inactiveForm.style.display = 'none';
            inactiveTab.classList.remove('active');
        } else {
            activeForm.style.display = 'none';
        }
    }

    jobseekerTab.addEventListener('click', function() {
        toggleForm(jobseekerTab, jobseekerForm, talentseekerTab, talentseekerForm);
    });

    talentseekerTab.addEventListener('click', function() {
        toggleForm(talentseekerTab, talentseekerForm, jobseekerTab, jobseekerForm);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('jobseekerForm');

    signupForm.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Fetch all form data
        const fullName = this.querySelector('input[placeholder="Full Name"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const password = this.querySelector('input[type="password"]').value;
        const currentJobTitle = this.querySelector('input[placeholder="Current Job Title"]').value.trim();
        const experienceLevel = this.querySelector('select').value;
        const skills = this.querySelector('input[placeholder="Skills (comma separated)"]').value.trim();

        // Validate form data (basic validation)
        if (!fullName || !email || !password || !currentJobTitle || !experienceLevel || !skills) {
            alert('Please fill in all fields.');
            return;
        }

        // Create user object
        const newUser = {
            password: password,
            fullName: fullName,
            email: email,
            currentJobTitle: currentJobTitle,
            experienceLevel: experienceLevel,
            skills: skills.split(',').map(skill => skill.trim())
        };

        // Add user to the Map (using email as the key)
        if (addUser(email, newUser)) {
            alert('Account created successfully!');
            this.reset(); // Clear the form
            console.log('Current users:', users); // Log the current state of the Map
        } else {
            alert('An account with this email already exists.');
        }
    });
});

function addUser(email, userData) {
    if (!users.has(email)) {
        users.set(email, userData);
        return true; // User added successfully
    }
    return false; // Email already exists
}