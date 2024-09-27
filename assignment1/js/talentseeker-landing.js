import { jobs } from './data.js';

document.addEventListener('DOMContentLoaded', initializeTalentSeekerDashboard);

function initializeTalentSeekerDashboard() {
    const postJobBtn = document.getElementById('postJobBtn');
    const jobPostForm = document.getElementById('jobPostDiv');
    const submitBtn = document.getElementById('postSubmit');
    const postForm = document.getElementById('jobPostForm');

    postJobBtn.addEventListener('click', toggleJobPostForm);
    submitBtn.addEventListener("click", handleJobSubmission);

    populateJobListings();
}

function toggleJobPostForm() {
    const jobPostForm = document.getElementById('jobPostDiv');
    jobPostForm.classList.toggle('d-none');
}

function handleJobSubmission(e) {
    e.preventDefault();
    const postForm = document.getElementById('jobPostForm');
    const formData = getFormData(postForm);

    if (validateFormData(formData)) {
        addNewJob(formData);
        resetForm(postForm);
        toggleJobPostForm();
        populateJobListings();
    } else {
        alert("Please fill all fields");
    }
}

function getFormData(form) {
    return {
        title: form.querySelector('input[placeholder="Job Title"]').value,
        location: form.querySelector('input[placeholder="Location"]').value,
        description: form.querySelector('textarea[placeholder="Job Description"]').value,
        salary: form.querySelector('input[placeholder="Salary Range"]').value,
        type: form.querySelector('select').value
    };
}

function validateFormData(formData) {
    return Object.values(formData).every(value => value.trim() !== '');
}

function addNewJob(formData) {
    jobs.push({
        id: generateJobId(),
        title: formData.title,
        company: "TechCorp Inc.",
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        posted: "Just Now",
        description: formData.description
    });
    console.log(jobs);
}

function generateJobId() {
    return Math.max(...jobs.map(job => job.id), 0) + 1;
}

function resetForm(form) {
    form.reset();
}

function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.company} - ${job.location}</p>
        <p>${job.type} • ${job.salary} • Posted ${job.posted}</p>
        <a href="edit-job.html?id=${job.id}" class="btn btn-outline-primary me-2 edit-btn">Edit</a>
        <button class="btn btn-outline-danger me-2 delete-btn">Delete</button>
        <button class="btn btn-primary">View Applications</button>
    `;

    jobCard.querySelector('.delete-btn').addEventListener('click', () => deleteJob(job.id));

    return jobCard;
}

function populateJobListings() {
    const jobListingsContainer = document.getElementById('jobListings');
    jobListingsContainer.innerHTML = '';
    jobs.forEach(job => {
        jobListingsContainer.appendChild(createJobCard(job));
    });
}

function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job posting?')) {
        const index = jobs.findIndex(job => job.id === jobId);
        if (index !== -1) {
            jobs.splice(index, 1);
            populateJobListings();
        }
    }
}