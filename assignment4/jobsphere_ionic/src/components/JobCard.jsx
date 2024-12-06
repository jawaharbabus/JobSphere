import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/react';
import PropTypes from 'prop-types';
import '../styles/job-card.css';

const JobCard = ({ job }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{job.title}</IonCardTitle>
        <IonCardSubtitle>{job.company} - {job.location}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Posted:</strong> {job.posted}</p>
        <IonButton expand="block" color="primary" routerLink={`/job-details/${job.id}`}>
          View Details
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    posted: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;
