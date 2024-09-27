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

    // Job Seeker Form Submission
    const jobSeekerSubmitButton = jobseekerForm.querySelector('button');
    jobSeekerSubmitButton.addEventListener('click', function(e) {
        e.preventDefault();

        const fullName = jobseekerForm.querySelector('input[placeholder="Full Name"]').value.trim();
        const email = jobseekerForm.querySelector('input[type="email"]').value.trim();
        const password = jobseekerForm.querySelector('input[type="password"]').value;
        const currentJobTitle = jobseekerForm.querySelector('input[placeholder="Current Job Title"]').value.trim();
        const experienceLevel = jobseekerForm.querySelector('select').value;
        const skills = jobseekerForm.querySelector('input[placeholder="Skills (comma separated)"]').value.trim();

        if (!fullName || !email || !password || !currentJobTitle || !experienceLevel || !skills) {
            alert('Please fill in all fields.');
            return;
        }

        const newUser = {
            password: password,
            fullName: fullName,
            email: email,
            currentJobTitle: currentJobTitle,
            experienceLevel: experienceLevel,
            skills: skills.split(',').map(skill => skill.trim()),
            userType: 'jobseeker'
        };

        if (addUser(email, newUser)) {
            alert('Job Seeker account created successfully!');
            jobseekerForm.reset();
            console.log('Current users:', users);
        } else {
            alert('An account with this email already exists.');
        }
    });

    // Talent Seeker Form Submission
    const talentSeekerSubmitButton = talentseekerForm.querySelector('button');
    talentSeekerSubmitButton.addEventListener('click', function(e) {
        e.preventDefault();

        const companyName = talentseekerForm.querySelector('input[placeholder="Company Name"]').value.trim();
        const email = talentseekerForm.querySelector('input[type="email"]').value.trim();
        const password = talentseekerForm.querySelector('input[type="password"]').value;
        const industry = talentseekerForm.querySelector('input[placeholder="Industry"]').value.trim();
        const companySize = talentseekerForm.querySelector('input[placeholder="Company Size"]').value.trim();
        const companyDescription = talentseekerForm.querySelector('textarea').value.trim();

        if (!companyName || !email || !password || !industry || !companySize || !companyDescription) {
            alert('Please fill in all fields.');
            return;
        }

        const newUser = {
            password: password,
            companyName: companyName,
            email: email,
            industry: industry,
            companySize: companySize,
            companyDescription: companyDescription,
            userType: 'talentseeker'
        };

        if (addUser(email, newUser)) {
            alert('Talent Seeker account created successfully!');
            talentseekerForm.reset();
            console.log('Current users:', users);
        } else {
            alert('An account with this email already exists.');
        }
    });
});

function addUser(email, userData) {
    if (!users.has(email)) {
        users.set(email, userData);
        return true;
    }
    return false;
}