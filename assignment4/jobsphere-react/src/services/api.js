// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/', // Replace with your backend base URL
});


// Attach the token to every request that requires authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example: User login API
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Example: Fetch jobs (Requires Bearer token)
export const fetchJobs = async () => {
  try {
    const response = await api.get('api/jobseeker/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};


// Example: Post a new job (Requires Bearer token)
export const postJob = async (jobData) => {
  try {
    const response = await api.post('api/talentseeker/postjob', jobData);
    return response.data;
  } catch (error) {
    console.error('Error posting job:', error);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Update an existing job
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await api.put(`api/talentseeker/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// apply for jobs
export const applyToJob = async (jobApplicationData) => {
  try {
    const response = await api.post('api/jobseeker/apply', jobApplicationData);
    return response.data;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Fetch job applications for a specific job ID
export const fetchApplications = async (jobId) => {
  try {
    const response = await api.get(`/api/talentseeker/applications/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};