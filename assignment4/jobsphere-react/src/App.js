import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import JobSeekerLanding from './components/JobSeekerLanding';
import TalentSeekerLanding from './components/TalentSeekerLanding';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobseeker-landing" element={
          <PrivateRoute>
            <JobSeekerLanding />
          </PrivateRoute>
        } />
        <Route path="/talentseeker-landing" element={
          <PrivateRoute>
            <TalentSeekerLanding />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
