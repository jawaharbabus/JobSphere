import { jobs, testimonials } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    populateJobListings();
    populateTestimonials();
});

function populateJobListings() {
    const jobListingsContainer = document.getElementById('jobListings');
    for (let i = 0; i < jobs.length; i += 2) {
        const jobElement = createJobElement(i);
        jobListingsContainer.appendChild(jobElement);
    }
}

function createJobElement(startIndex) {
    const jobElement = document.createElement('div');
    jobElement.className = `carousel-item ${startIndex === 0 ? 'active' : ''}`;

    let cardsHTML = '';
    for (let j = startIndex; j < Math.min(startIndex + 2, jobs.length); j++) {
        cardsHTML += createJobCard(jobs[j]);
    }

    jobElement.innerHTML = `<div class="row">${cardsHTML}</div>`;
    return jobElement;
}

function createJobCard(job) {
    return `
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
                    <p class="card-text">${job.location}</p>
                    <a href="login.html" class="btn btn-primary">Apply Now</a>
                </div>
            </div>
        </div>
    `;
}

function populateTestimonials() {
    const testimonialCarousel = document.querySelector('#testimonialCarousel .carousel-inner');
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = createTestimonialElement(testimonial, index);
        testimonialCarousel.appendChild(testimonialElement);
    });
}

function createTestimonialElement(testimonial, index) {
    const testimonialElement = document.createElement('div');
    testimonialElement.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    testimonialElement.innerHTML = `
        <p class="lead">"${testimonial.text}"</p>
        <p class="font-italic">- ${testimonial.author}</p>
    `;
    return testimonialElement;
}