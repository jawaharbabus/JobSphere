import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonCard, IonCardContent, IonTitle } from '@ionic/react';
import { users } from '../data/data';
import '../styles/signup.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!users.has(username)) {
      users.set(username, { password });
      alert('Account created successfully!');
    } else {
      alert('User already exists');
    }
  };

  return (
    <IonPage>
      <IonContent className="background-container">
        <div className="container">
          <IonCard className="signup-container">
            <IonCardContent>
              <IonTitle>Sign Up</IonTitle>
              <IonInput placeholder="Username" onIonChange={(e) => setUsername(e.detail.value)} />
              <IonInput placeholder="Password" type="password" onIonChange={(e) => setPassword(e.detail.value)} />
              <IonButton expand="block" onClick={handleSignup}>Sign Up</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
