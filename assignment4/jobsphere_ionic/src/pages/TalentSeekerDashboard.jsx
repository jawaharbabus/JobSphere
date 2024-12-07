import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import '../styles/talentseeker-landing.css';

const TalentSeekerDashboard = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Talent Seeker Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" routerLink="/edit-job">Post a New Job</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TalentSeekerDashboard;
