import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList } from '@ionic/react';
import { jobs } from '../data/data';
import JobCard from '../components/JobCard';

const JobSeekerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Job Seeker Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar placeholder="Search for jobs..." onIonInput={(e) => setSearchTerm(e.detail.value)} />
        <IonList>
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default JobSeekerDashboard;
