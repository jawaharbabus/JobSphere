import React, { useState, useEffect } from 'react';
import { fetchJobs, applyToJob } from '../services/api';
import { Modal, Button } from 'react-bootstrap';

function JobSeekerLanding() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    jobId: null,
    jobSeekerId: '',
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    applicationDate: new Date(),
  });

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (err) {
        setError('Unable to load jobs. Please try again later.');
      }
    };
    getJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      setFilteredJobs(
        jobs.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, jobs]);

  useEffect(() => {
    const jobSeekerId = localStorage.getItem('jobSeekerId');
    if (jobSeekerId) {
      setApplicationData((prev) => ({
        ...prev,
        jobSeekerId,
      }));
    }
  }, []);

  const handleApplyClick = (jobId) => {
    setApplicationData((prev) => ({
      ...prev,
      jobId,
      applicationDate: new Date(),
    }));
    setShowModal(true);
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplicationSubmit = async () => {
    try {
      console.log(applicationData);
      await applyToJob(applicationData);
      alert('Application submitted successfully!');
      setShowModal(false);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Job Seeker Dashboard</h1>
      <div className="row">
        <div className="col-md-3">
          <h3>Filters</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="col-md-9">
          <div className="job-listings">
            {filteredJobs.map((job) => (
              <div className="job-card mb-3 p-3 border rounded" key={job._id}>
                <h3>{job.title}</h3>
                <p>{job.company} - {job.location}</p>
                <p>{job.type} • {job.salary} • Posted {job.posted}</p>
                <Button variant="primary" onClick={() => handleApplyClick(job._id)}>
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-control"
                value={applicationData.fullName}
                onChange={handleApplicationChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={applicationData.email}
                onChange={handleApplicationChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="form-control"
                value={applicationData.phone}
                onChange={handleApplicationChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                className="form-control"
                rows="4"
                value={applicationData.coverLetter}
                onChange={handleApplicationChange}
                required
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApplicationSubmit}>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JobSeekerLanding;
