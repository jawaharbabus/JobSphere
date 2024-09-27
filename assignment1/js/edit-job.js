// job-editor.js

import { jobs } from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    const editJobForm = document.getElementById('editJobForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'), 10); // Get job ID from URL and convert to number

    console.log("Job ID:", jobId);
    loadJobData(jobId);

    // Event listener for form submission
    editJobForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        saveJobData(jobId); // Save job data
    });

    // Event listener for cancel button
    cancelBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            window.location.href = 'talentseeker-landing.html'; // Redirect to landing page
        }
    });

    // Load job data based on job ID
    function loadJobData(jobId) {
        const jobData = jobs.find(item => item.id === jobId); // Find the job by ID

        if (jobData) {
            // Populate the form fields with the job data
            document.getElementById('jobTitle').value = jobData.title;
            document.getElementById('company').value = jobData.company;
            document.getElementById('location').value = jobData.location;
            document.getElementById('jobType').value = jobData.type;
            document.getElementById('salary').value = jobData.salary;
        } else {
            console.error("Job not found for ID:", jobId); // Log error if job not found
        }
    }

    // Save updated job data
    function saveJobData(jobId) {
        const updatedJobData = {
            id: jobId,
            title: document.getElementById('jobTitle').value,
            company: document.getElementById('company').value,
            location: document.getElementById('location').value,
            type: document.getElementById('jobType').value,
            salary: document.getElementById('salary').value,
            posted: 'just now',
        };

        // Update the jobs array (this example just pushes the updated data)
        const jobIndex = jobs.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
            jobs[jobIndex] = updatedJobData; // Update existing job
        } else {
            jobs.push(updatedJobData); // Add new job if not found
        }

        console.log('Updated job data:', updatedJobData);
        alert('Job details saved successfully!');

        window.location.href = 'talentseeker-landing.html'; // Redirect after saving
    }
});