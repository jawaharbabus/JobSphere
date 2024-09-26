import {jobs, testimonials} from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    // Sample job listings


    // Populate job listings
    const jobListingsContainer = document.getElementById('jobListings');
    jobs.forEach((job, index) => {
        const jobElement = document.createElement('div');
        jobElement.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        jobElement.innerHTML = `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${job.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
                            <p class="card-text">${job.location}</p>
                            <a href="login.html" class="btn btn-primary">Apply Now</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        jobListingsContainer.appendChild(jobElement);
    });

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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('successAlert');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Here you would typically send the form data to your server
        // For this example, we'll just show the alert
        successAlert.style.display = 'block';

        // Optional: Reset the form
        form.reset();
    });
});