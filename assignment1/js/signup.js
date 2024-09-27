import { users } from "./data.js";

document.addEventListener('DOMContentLoaded', initializeSignupPage);

function initializeSignupPage() {
    const jobseekerTab = document.getElementById('jobseekerTab');
    const talentseekerTab = document.getElementById('talentseekerTab');
    const jobseekerForm = document.getElementById('jobseekerForm');
    const talentseekerForm = document.getElementById('talentseekerForm');

    jobseekerTab.addEventListener('click', () => toggleForm(jobseekerTab, jobseekerForm, talentseekerTab, talentseekerForm));
    talentseekerTab.addEventListener('click', () => toggleForm(talentseekerTab, talentseekerForm, jobseekerTab, jobseekerForm));

    setupFormSubmission(jobseekerForm, createJobSeekerUser);
    setupFormSubmission(talentseekerForm, createTalentSeekerUser);
}

function toggleForm(activeTab, activeForm, inactiveTab, inactiveForm) {
    activeTab.classList.toggle('active');
    activeForm.style.display = activeForm.style.display === 'none' || activeForm.style.display === '' ? 'block' : 'none';
    inactiveForm.style.display = 'none';
    inactiveTab.classList.remove('active');
}

function setupFormSubmission(form, createUserFunction) {
    const submitButton = form.querySelector('button');
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        const formData = getFormData(form);
        if (validateFormData(formData)) {
            const newUser = createUserFunction(formData);
            if (addUser(formData.email, newUser)) {
                alert(`${newUser.userType === 'jobseeker' ? 'Job Seeker' : 'Talent Seeker'} account created successfully!`);
                form.reset();
                console.log('Current users:', users);
            } else {
                alert('An account with this email already exists.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    });
}

function getFormData(form) {
    const formData = {};
    form.querySelectorAll('input, select, textarea').forEach(element => {
        formData[element.name] = element.value.trim();
    });
    return formData;
}

function validateFormData(formData) {
    return Object.values(formData).every(value => value !== '');
}

function createJobSeekerUser(formData) {
    return {
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email,
        currentJobTitle: formData.currentJobTitle,
        experienceLevel: formData.experienceLevel,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        userType: 'jobseeker'
    };
}

function createTalentSeekerUser(formData) {
    return {
        password: formData.password,
        companyName: formData.companyName,
        email: formData.email,
        industry: formData.industry,
        companySize: formData.companySize,
        companyDescription: formData.companyDescription,
        userType: 'talentseeker'
    };
}

function addUser(email, userData) {
    if (!users.has(email)) {
        users.set(email, userData);
        return true;
    }
    return false;
}