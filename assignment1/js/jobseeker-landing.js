import {jobs} from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filterToggle');
    const filterColumn = document.getElementById('filterColumn');

    filterToggle.addEventListener('click', function() {
        filterColumn.classList.toggle('show');
    });

    // Close filter column when clicking outside of it on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideFilter = filterColumn.contains(event.target);
        const isClickOnToggle = filterToggle.contains(event.target);

        if (!isClickInsideFilter && !isClickOnToggle && window.innerWidth <= 991) {
            filterColumn.classList.remove('show');
        }
    });

    // Adjust layout on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            filterColumn.classList.remove('show');
        }
    });
});

function createJobCard(job) {
    var url = "job.html?id="+job.id;
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';

    jobCard.innerHTML = `
    <h3>${job.title}</h3>
    <p>${job.company} - ${job.location}</p>
    <p>${job.type} • ${job.salary} • Posted ${job.posted}</p>
    <a href=${url} class="btn btn-outline-primary">Apply Now</a>
  `;

    return jobCard;
}

function populateJobListings() {
    const jobListingsContainer = document.querySelector('.job-listings');
    jobListingsContainer.innerHTML = ''; // Clear existing content

    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobListingsContainer.appendChild(jobCard);
    });
}

document.addEventListener('DOMContentLoaded', populateJobListings);