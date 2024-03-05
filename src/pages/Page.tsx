// NotificationComponent.tsx
import React from 'react';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { getDeliveredNotifications, registerNotifications } from './Homepage';

const Page: React.FC = () => {
    const delivre = async () => {
        try {
            await getDeliveredNotifications();
        }catch(error){
            alert("=>"+error);
        }
        
    }
  const handleRegisterNotifications = async () => {
    try {
      const registrationToken = await registerNotifications();


     alert('Registration token=> ' + registrationToken);
      const notificationData = {
        to: registrationToken, // Remplacez par le FCM Token du périphérique cible
        title: 'Nouvelle Notification',
        message: 'Coucou Mirah',
      };



      const response = await fetch('https://webservice-production-4a2c.up.railway.app/notification/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });

    alert('Tonga eto '+JSON.stringify(notificationData));
    const responseData = await response.json();
    if (response.ok) {
        alert('Notification sent successfully');
      } else {
        alert('Error sending notification: ' + responseData);
      }
    alert('Server response:'  + responseData);
    } catch (error) {
      // Gérer les erreurs ici, par exemple, afficher une alerte
      alert('Error registering notifications: ' + JSON.stringify(error));
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton expand="full" onClick={handleRegisterNotifications}>
          Register Notifications
        </IonButton>
        <IonButton expand="full" onClick={delivre}>
          Delivered Notifications
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Page;
