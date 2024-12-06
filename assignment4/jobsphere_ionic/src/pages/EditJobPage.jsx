import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/react';
import '../styles/edit-job.css';

const EditJobPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Job</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Job Title" />
        <IonInput placeholder="Company" />
        <IonInput placeholder="Location" />
        <IonInput placeholder="Salary Range" />
        <IonButton expand="block">Save Changes</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditJobPage;
