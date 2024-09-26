import { jobs } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const postJobBtn = document.getElementById('postJobBtn');
    const jobPostForm = document.getElementById('jobPostDiv');
    const submitBtn = document.getElementById('postSubmit');
    const postForm = document.getElementById('jobPostForm');

    postJobBtn.addEventListener('click', function() {
        jobPostForm.classList.toggle('d-none');
    });

    submitBtn.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent form submission

        const title = postForm.querySelector('input[placeholder="Job Title"]').value;
        const location = postForm.querySelector('input[placeholder="Location"]').value;
        const description = postForm.querySelector('textarea[placeholder="Job Description"]').value;
        const range = postForm.querySelector('input[placeholder="Salary Range"]').value;
        const type = postForm.querySelector('select').value;

        if (title && location && description && range && type) {
            jobs.push({
                id: jobs.length + 1,
                title: title,
                company: "TechCorp Inc.",
                location: location,
                type: type,
                salary: range,
                posted: "Just Now",
                description: description
            });
            console.log(jobs);
            populateJobListings();
            // Clear the form
            postForm.reset();
            jobPostForm.classList.add('d-none'); // Hide the form after submission
        } else {
            alert("Please fill all fields");
        }
    });

    populateJobListings();
});

function createJobCard(job) {
    const jobCard = document.createElement('div');
    var url = "edit-job.html?id="+job.id;
    jobCard.className = 'job-card';

    jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.company} - ${job.location}</p>
        <p>${job.type} • ${job.salary} • Posted ${job.posted}</p>
        <a href=${url} class="btn btn-outline-primary me-2 edit-btn" data-id="${job.id}">Edit</a>
        <button class="btn btn-outline-danger me-2 delete-btn" data-id="${job.id}">Delete</button>
        <button class="btn btn-primary">View Applications</button>
    `;

    // Add event listeners for edit and delete buttons
    jobCard.querySelector('.edit-btn').addEventListener('click', function() {
        editJob(job.id);
    });

    jobCard.querySelector('.delete-btn').addEventListener('click', function() {
        deleteJob(job.id);
    });

    return jobCard;
}

function populateJobListings() {
    const jobListingsContainer = document.getElementById('jobListings');
    jobListingsContainer.innerHTML = ''; // Clear existing content

    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobListingsContainer.appendChild(jobCard);
    });
}

function editJob(jobId) {
    // Implement edit functionality
    console.log(`Editing job with id: ${jobId}`);
    // You could redirect to an edit page or show an edit form
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