import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonCard, IonCardContent, IonTitle } from '@ionic/react';
import { users } from '../data/data';
import '../styles/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (users.has(username) && users.get(username).password === password) {
      alert('Login successful!');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <IonPage>
      <IonContent className="background-container">
        <div className="container">
          <IonCard className="login-container">
            <IonCardContent>
              <IonTitle>Login</IonTitle>
              <IonInput placeholder="Username" onIonChange={(e) => setUsername(e.detail.value)} />
              <IonInput placeholder="Password" type="password" onIonChange={(e) => setPassword(e.detail.value)} />
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
