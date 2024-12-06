import React from 'react';
import { IonApp, IonReactRouter } from '@ionic/react';
import { Route, Redirect, IonRouterOutlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import TalentSeekerDashboard from './pages/TalentSeekerDashboard';
import JobDetailsPage from './pages/JobDetailsPage';
import EditJobPage from './pages/EditJobPage';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/signup" component={SignupPage} exact />
        <Route path="/home" component={HomePage} exact />
        <Route path="/jobseeker-dashboard" component={JobSeekerDashboard} exact />
        <Route path="/talentseeker-dashboard" component={TalentSeekerDashboard} exact />
        <Route path="/job-details/:id" component={JobDetailsPage} exact />
        <Route path="/edit-job" component={EditJobPage} exact />
        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
