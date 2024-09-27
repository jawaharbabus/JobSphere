import { users } from "./data.js";

document.addEventListener('DOMContentLoaded', initializeLoginPage);

function initializeLoginPage() {
    const jobseekerTab = document.getElementById('jobseekerTab');
    const talentseekerTab = document.getElementById('talentseekerTab');
    const jobseekerForm = document.getElementById('jobseekerForm');
    const talentseekerForm = document.getElementById('talentseekerForm');

    jobseekerTab.addEventListener('click', () => toggleForm(jobseekerTab, jobseekerForm, talentseekerTab, talentseekerForm));
    talentseekerTab.addEventListener('click', () => toggleForm(talentseekerTab, talentseekerForm, jobseekerTab, jobseekerForm));

    setupLoginForm(jobseekerForm, 'jobseeker', 'jobseeker-landing.html');
    setupLoginForm(talentseekerForm, 'talentseeker', 'talentseeker-landing.html');
}

function toggleForm(activeTab, activeForm, inactiveTab, inactiveForm) {
    activeTab.classList.toggle('active');
    activeForm.style.display = activeForm.style.display === 'none' || activeForm.style.display === '' ? 'block' : 'none';
    inactiveForm.style.display = 'none';
    inactiveTab.classList.remove('active');
}

function setupLoginForm(form, userType, redirectUrl) {
    const loginButton = form.querySelector('.btn-primary');
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const authResult = authenticateUser(username, password, userType);
        handleAuthResult(authResult, redirectUrl);
    });
}

function authenticateUser(username, password, userType) {
    if (users.has(username)) {
        const userData = users.get(username);
        if (userData.password === password) {
            return { success: true, userData: { ...userData, username } };
        }
    }
    return { success: false };
}

function handleAuthResult(authResult, redirectUrl) {
    if (authResult.success) {
        window.location.href = redirectUrl;
    } else {
        showErrorModal();
    }
}

function showErrorModal() {
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

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.appendChild(modalBackdrop);

    const closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
    closeButtons.forEach(button => button.addEventListener('click', closeModal));

    modalBackdrop.addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.getElementById('errorModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (modal) modal.remove();
    if (modalBackdrop) modalBackdrop.remove();
}