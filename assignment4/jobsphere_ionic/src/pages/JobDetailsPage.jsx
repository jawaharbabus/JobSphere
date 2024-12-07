import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton } from '@ionic/react';
import { jobs } from '../data/data';
import { useParams } from 'react-router-dom';
import '../styles/job.css';

const JobDetailsPage = () => {
  const { id } = useParams();
  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{job.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <h2>{job.company}</h2>
            <p>{job.location}</p>
            <p>{job.type} - {job.salary}</p>
            <p>{job.description}</p>
            <IonButton expand="block">Apply Now</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default JobDetailsPage;
