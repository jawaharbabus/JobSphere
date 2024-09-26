import {jobs} from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    const editJobForm = document.getElementById('editJobForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');
    // Load initial job data
    loadJobData(jobId);

    editJobForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveJobData(jobId);
    });

    cancelBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            window.location.href = 'talent-seeker-landing.html'; // Redirect to landing page
        }
    });

    function loadJobData(jobId) {
        // Get the job ID from the URL


        // Here you would typically fetch the job data from your backend using the jobId
        // For this example, we'll use dummy data
        var jobData = jobs.find(item => item.id === jobId);

        // Populate the form fields with the job data
        document.getElementById('jobTitle').value = jobData.title;
        document.getElementById('company').value = jobData.company;
        document.getElementById('location').value = jobData.location;
        document.getElementById('jobType').value = jobData.type;
        document.getElementById('salary').value = jobData.salary;
        // document.getElementById('jobDescription').value = jobData.description;
        // document.getElementById('requirements').value = jobData.requirements;
        // document.getElementById('benefits').value = jobData.benefits;
    }

    function saveJobData(jobId) {
        // Here you would typically send the updated data to your backend
        // For this example, we'll just log it to the console and show an alert
        const updatedJobData = {
            id: jobId,
            title: document.getElementById('jobTitle').value,
            company: document.getElementById('company').value,
            location: document.getElementById('location').value,
            type: document.getElementById('jobType').value,
            salary: document.getElementById('salary').value,
            posted: 'just now',
            // description: document.getElementById('jobDescription').value,
            // requirements: document.getElementById('requirements').value,
            // benefits: document.getElementById('benefits').value
        };
        jobs.push(updatedJobData);
        console.log('Updated job data:', updatedJobData);
        alert('Job details saved successfully!');
        // Redirect to the talent seeker landing page after saving
        window.location.href = 'talent-seeker-landing.html';
    }
});