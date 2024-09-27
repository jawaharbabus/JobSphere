import { jobs } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filterToggle');
    const filterColumn = document.getElementById('filterColumn');
    const filterForm = document.getElementById('filterForm');
    const searchInput = document.getElementById('searchInput');
    const jobListingsContainer = document.querySelector('.job-listings');

    initializeEventListeners();
    displayJobs(jobs); // Initial display of all jobs

    function initializeEventListeners() {
        filterToggle.addEventListener('click', toggleFilterColumn);
        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('resize', handleWindowResize);
        filterForm.addEventListener('submit', handleFilterSubmit);
        searchInput.addEventListener('input', filterAndDisplayJobs);
    }

    function toggleFilterColumn() {
        filterColumn.classList.toggle('show');
    }

    function handleOutsideClick(event) {
        const isClickInsideFilter = filterColumn.contains(event.target);
        const isClickOnToggle = filterToggle.contains(event.target);

        if (!isClickInsideFilter && !isClickOnToggle && window.innerWidth <= 991) {
            filterColumn.classList.remove('show');
        }
    }

    function handleWindowResize() {
        if (window.innerWidth > 991) {
            filterColumn.classList.remove('show');
        }
    }

    function handleFilterSubmit(e) {
        e.preventDefault();
        filterAndDisplayJobs();
    }

    function filterAndDisplayJobs() {
        const jobType = document.getElementById('jobType').value;
        const location = document.getElementById('location').value.toLowerCase();
        const salary = document.getElementById('salary').value;
        const searchTerm = searchInput.value.toLowerCase();

        const filteredJobs = jobs.filter(job =>
            matchesJobType(job, jobType) &&
            matchesLocation(job, location) &&
            matchesSalary(job, salary) &&
            matchesSearch(job, searchTerm)
        );

        displayJobs(filteredJobs);
    }

    function matchesJobType(job, jobType) {
        return !jobType || job.type === jobType;
    }

    function matchesLocation(job, location) {
        return !location || job.location.toLowerCase().includes(location);
    }

    function matchesSalary(job, selectedRange) {
        if (!selectedRange) return true;

        const [min, max] = selectedRange.split('-').map(Number);
        const jobSalaryValue = parseInt(job.salary.replace(/\D/g, ''));

        if (selectedRange === '100000+') {
            return jobSalaryValue >= 100000;
        }

        return jobSalaryValue >= min && jobSalaryValue <= max;
    }

    function matchesSearch(job, searchTerm) {
        return job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm);
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
});