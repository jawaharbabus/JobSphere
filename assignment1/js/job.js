import {jobs} from "./data.js";


document.addEventListener('DOMContentLoaded', function() {
    // Get the query parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get the 'id' parameter and convert it to a number
    const jobId = parseInt(urlParams.get('id'), 10);

    if (!isNaN(jobId)) {
        console.log("Found the job id:", jobId);
        // Use the jobId to fetch job details or perform other actions
        var job = jobs.find(item => item.id === jobId);

        if (job) {
            const jobDetails = document.querySelector('#job-details');
            const jobCard = document.createElement('div');

            jobCard.innerHTML = `
            <h1 class="job-title">${job.title}</h1>
            <h2 class="company-name">${job.company}</h2>
            <p class="job-location">${job.location}</p>
            <p class="job-type">${job.type} • ${job.salary} • ${job.posted}</p>
            `;
            jobDetails.appendChild(jobCard);
        } else {
            console.log('Job not found');
            // Handle the case when the job is not found
        }
    } else {
        console.log('No valid job ID provided');
        // Handle the case when no valid ID is provided
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('applicationForm');
    const applicationModal = new bootstrap.Modal(document.getElementById('applicationModal'));

    applicationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Here you would typically send the form data to your server
        // For this example, we'll just show the modal
        applicationModal.show();
    });

    document.getElementById('applicationModal').addEventListener('hidden.bs.modal', function (event) {
        // Redirect to the landing page after the modal is closed
        window.location.href = 'jobseeker-home.html';
    });
});
