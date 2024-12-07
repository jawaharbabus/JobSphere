import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import '../styles/homepage.css';

const HomePage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jobsphere</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="home-content">
        <div className="hero">
          <h1>Welcome to Jobsphere</h1>
          <p>Find your dream job with ease</p>
          <IonButton expand="block" href="/login">Search Jobs</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
