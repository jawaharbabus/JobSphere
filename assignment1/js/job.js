import { jobs } from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    loadJobDetails();
    setupApplicationForm();
});

function loadJobDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'), 10);

    if (isNaN(jobId)) {
        console.error('No valid job ID provided');
        displayErrorMessage('Invalid job ID');
        return;
    }

    const job = jobs.find(item => item.id === jobId);

    if (!job) {
        console.error('Job not found for ID:', jobId);
        displayErrorMessage('Job not found');
        return;
    }

    displayJobDetails(job);
}

function displayJobDetails(job) {
    const jobDetails = document.querySelector('#job-details');
    jobDetails.innerHTML = `
        <h1 class="job-title">${job.title}</h1>
        <h2 class="company-name">${job.company}</h2>
        <p class="job-location">${job.location}</p>
        <p class="job-type">${job.type} • ${job.salary} • ${job.posted}</p>
    `;
}

function displayErrorMessage(message) {
    const jobDetails = document.querySelector('#job-details');
    jobDetails.innerHTML = `<p class="error-message">${message}</p>`;
}

function setupApplicationForm() {
    const applicationForm = document.getElementById('applicationForm');
    const applicationModal = new bootstrap.Modal(document.getElementById('applicationModal'));

    applicationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        applicationModal.show();
    });

    document.getElementById('applicationModal').addEventListener('hidden.bs.modal', function (event) {
        window.location.href = 'jobseeker-landing.html';
    });
}