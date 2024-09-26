import {jobs, testimonials} from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    // Sample job listings


    // Populate job listings
    const jobListingsContainer = document.getElementById('jobListings');
    for (let i = 0; i < jobs.length; i += 2) {
        const jobElement = document.createElement('div');
        jobElement.className = `carousel-item ${i === 0 ? 'active' : ''}`;

        let cardsHTML = '';
        for (let j = i; j < Math.min(i + 2, jobs.length); j++) {
            const job = jobs[j];
            cardsHTML += `
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

        jobElement.innerHTML = `
        <div class="row">
            ${cardsHTML}
        </div>
    `;
        jobListingsContainer.appendChild(jobElement);
    }

    // Populate testimonials
    const testimonialCarousel = document.querySelector('#testimonialCarousel .carousel-inner');
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        testimonialElement.innerHTML = `
            <p class="lead">"${testimonial.text}"</p>
            <p class="font-italic">- ${testimonial.author}</p>
        `;
        testimonialCarousel.appendChild(testimonialElement);
    });
});