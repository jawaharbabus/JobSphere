import React, { useState, useEffect } from 'react';
import { fetchJobs, fetchApplications, postJob } from '../services/api';
import { Modal, Button } from 'react-bootstrap';

function TalentSeekerLanding() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState([]);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    company: '',
  });

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (err) {
        setError('Unable to load jobs. Please try again later.');
      }
    };
    getJobs();
  }, []);

  const handleViewApplications = async (jobId) => {
    try {
      const applicationsData = await fetchApplications(jobId);
      setApplications(applicationsData);
      setCurrentJobId(jobId);
      setShowApplicationsModal(true);
    } catch (err) {
      setError('Unable to load applications. Please try again later.');
    }
  };

  const handlePostJob = async () => {
    try {
      await postJob({ ...formData, talentSeekerId: localStorage.getItem('talentSeekerId') });
      alert('Job posted successfully!');
      setShowPostJobModal(false);
      setFormData({ title: '', location: '', type: '', salary: '', description: '', company: '' });
      const jobsData = await fetchJobs(); // Refresh job list
      setJobs(jobsData);
    } catch (err) {
      setError('Failed to post job. Please try again.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h1>Talent Seeker Dashboard</h1>
      <Button className="mb-3" variant="primary" onClick={() => setShowPostJobModal(true)}>
        Post a New Job
      </Button>
      <div className="job-listings">
        {jobs.map((job) => (
          <div className="job-card mb-3 p-3 border rounded" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <p>{job.type} • {job.salary} • Posted {job.posted}</p>
            <Button variant="secondary" onClick={() => handleViewApplications(job._id)}>
              View Applications
            </Button>
          </div>
        ))}
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Applications Modal */}
      <Modal show={showApplicationsModal} onHide={() => setShowApplicationsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Applications for Job ID: {currentJobId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {applications.length > 0 ? (
            <ul className="list-group">
              {applications.map((app) => (
                <li className="list-group-item" key={app.id}>
                  <p><strong>Name:</strong> {app.fullName}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Phone:</strong> {app.phone}</p>
                  <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                  <p><strong>Application Date:</strong> {new Date(app.applicationDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications found for this job.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplicationsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post Job Modal */}
      <Modal show={showPostJobModal} onHide={() => setShowPostJobModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Post a New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                className="form-control"
                value={formData.company}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Job Type</label>
              <select
                id="type"
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="form-control"
                value={formData.salary}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPostJobModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePostJob}>
            Post Job
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TalentSeekerLanding;
