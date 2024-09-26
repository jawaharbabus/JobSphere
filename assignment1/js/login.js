import {users} from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    const jobseekerTab = document.getElementById('jobseekerTab');
    const talentseekerTab = document.getElementById('talentseekerTab');
    const jobseekerForm = document.getElementById('jobseekerForm');
    const talentseekerForm = document.getElementById('talentseekerForm');

    function toggleForm(activeTab, activeForm, inactiveTab, inactiveForm) {
        activeTab.classList.toggle('active');
        if (activeForm.style.display === 'none' || activeForm.style.display === '') {
            activeForm.style.display = 'block';
            inactiveForm.style.display = 'none';
            inactiveTab.classList.remove('active');
        } else {
            activeForm.style.display = 'none';
        }
    }

    jobseekerTab.addEventListener('click', function() {
        toggleForm(jobseekerTab, jobseekerForm, talentseekerTab, talentseekerForm);
    });

    talentseekerTab.addEventListener('click', function() {
        toggleForm(talentseekerTab, talentseekerForm, jobseekerTab, jobseekerForm);
    });
});

//authentication
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('jobseekerForm');
    const loginButton = loginForm.querySelector('.btn-primary');

    loginButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior

        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        const authResult = authenticateUser(username, password);
        if (authResult.success) {
            // Successful login
            window.location.href = 'jobseeker-landing.html';
        } else {
            // Failed login
            showErrorModal();
        }
    });
});


function authenticateUser(username, password) {
    if (users.has(username)) {
        const userData = users.get(username);
        if (userData.password === password) {
            return { success: true, userData: { ...userData, username } };
        }
    }
    return { success: false };
}


function showErrorModal() {
    // Create modal elements
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop fade show';

    const modalHTML = `
    <div class="modal fade show" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Authentication Failed</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Invalid username or password. Please try again.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

    // Add modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.appendChild(modalBackdrop);

    // Add event listener to close button
    const closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside
    modalBackdrop.addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.getElementById('errorModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (modal) {
        modal.remove();
    }
    if (modalBackdrop) {
        modalBackdrop.remove();
    }
}