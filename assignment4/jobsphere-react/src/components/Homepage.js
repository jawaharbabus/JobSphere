// src/components/Homepage.js
import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const handleApplyRedirect = () => {
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Jobsphere</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#job-search">Jobs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
            <a href="/login" className="btn btn-primary ms-3">Login</a>
          </div>
        </div>
      </nav>
      <header className="hero" style={{ background: 'url(img/background.jpg) no-repeat center center / cover', color: 'white', padding: '5rem 0' }}>
        <div className="container text-center">
          <h1>Welcome to Jobsphere</h1>
          <p>Your gateway to amazing opportunities</p>
          <a href="/login" className="btn btn-primary">Search Jobs</a>
        </div>
      </header>

      <section id="job-search" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Available Jobs</h2>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-4 mb-3" key={job._id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">{job.company} - {job.location}</p>
                    <p className="card-text"><small className="text-muted">{job.type} • {job.salary}</small></p>
                    <button className="btn btn-primary" onClick={handleApplyRedirect}>Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
