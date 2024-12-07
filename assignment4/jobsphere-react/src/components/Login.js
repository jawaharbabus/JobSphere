import React, { useState } from 'react';
import { loginUser } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('jobseeker'); // Toggle between 'jobseeker' and 'talentseeker'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password);
      console.log('Login successful:', userData);

      // Store the token in localStorage
      localStorage.setItem('token', userData.access_token);

      // Store additional details based on the role
      if (activeTab === 'jobseeker') {
        localStorage.setItem('jobSeekerId', userData.user_id);
        window.location.href = '/jobseeker-landing';
      } else if (activeTab === 'talentseeker') {
        localStorage.setItem('talentSeekerId', userData.user_id);
        window.location.href = '/talentseeker-landing';
      }
    } catch (err) {
      setError('Invalid username or password');
      console.log(err);
    }
  };

  return (
    <div style={{
      background: 'url(img/background.jpg) no-repeat center center / cover',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="container mt-5" style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '8px' }}>
        <h1 className="text-center mb-4">Welcome to Jobsphere</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="d-flex justify-content-center mb-4">
              <button
                className={`btn btn-outline-primary ${activeTab === 'jobseeker' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobseeker')}
              >
                Jobseeker Login
              </button>
              <button
                className={`btn btn-outline-primary ms-2 ${activeTab === 'talentseeker' ? 'active' : ''}`}
                onClick={() => setActiveTab('talentseeker')}
              >
                Talentseeker Login
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary btn-block">
                {activeTab === 'jobseeker' ? 'Login as Jobseeker' : 'Login as Talentseeker'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;