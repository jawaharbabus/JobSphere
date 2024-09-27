import { jobs } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filterToggle');
    const filterColumn = document.getElementById('filterColumn');
    const filterForm = document.getElementById('filterForm');
    const searchInput = document.getElementById('searchInput');
    const jobListingsContainer = document.querySelector('.job-listings');

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

    // Filter and search functionality
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        filterAndDisplayJobs();
    });

    searchInput.addEventListener('input', filterAndDisplayJobs);

    function filterAndDisplayJobs() {
        const jobType = document.getElementById('jobType').value;
        const location = document.getElementById('location').value.toLowerCase();
        const salary = document.getElementById('salary').value;
        const searchTerm = searchInput.value.toLowerCase();

        const filteredJobs = jobs.filter(job => {
            const matchesJobType = !jobType || job.type === jobType;
            const matchesLocation = !location || job.location.toLowerCase().includes(location);
            const matchesSalary = matchesSalaryRange(job.salary, salary);
            const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.location.toLowerCase().includes(searchTerm);

            return matchesJobType && matchesLocation && matchesSalary && matchesSearch;
        });

        displayJobs(filteredJobs);
    }

    function matchesSalaryRange(jobSalary, selectedRange) {
        if (!selectedRange) return true;

        const [min, max] = selectedRange.split('-').map(Number);
        const jobSalaryValue = parseInt(jobSalary.replace(/\D/g, ''));

        if (selectedRange === '100000+') {
            return jobSalaryValue >= 100000;
        }

        return jobSalaryValue >= min && jobSalaryValue <= max;
    }

    function displayJobs(jobsToDisplay) {
        jobListingsContainer.innerHTML = '';
        jobsToDisplay.forEach(job => {
            const jobCard = createJobCard(job);
            jobListingsContainer.appendChild(jobCard);
        });
    }

    function createJobCard(job) {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} - ${job.location}</p>
            <p>${job.type} • ${job.salary} • Posted ${job.posted}</p>
            <a href="job.html?id=${job.id}" class="btn btn-outline-primary">Apply Now</a>
        `;
        return jobCard;
    }

    // Initial display of all jobs
    displayJobs(jobs);
});