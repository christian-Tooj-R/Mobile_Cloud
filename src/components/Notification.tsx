import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonButtons,
  IonList,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import '../assets/css/annonce.css';
import { useHistory } from 'react-router';
import CardList from './CardList';



interface Notif {
  id: number;
  iduser: number;
  message: string;
}



function Notification() {
  const token = localStorage.getItem("token");
  const [notification, setNotification] = useState<Notif[]>([]);
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const response = await fetch('https://webservice-production-4a2c.up.railway.app/notification/getNotif', {
          method: 'GET',
          headers: {
           'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
          },
        });
        const datas = await response.json();
        setNotification(datas.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    };

    fetchNotif();
  }, []);

  
  
  
  
  

  return (
    <>
    <IonHeader style={{ height: '60px', position: 'fixed' }}>
    <IonToolbar style={{ height: '60px' }}>
      <IonTitle>Toutes les Notifications</IonTitle>
    </IonToolbar>
    </IonHeader>
          <br/><br/><br/>

    <IonContent>
              {notification.map((option) => (
        <IonCard>
          <IonCardContent>{option.message}</IonCardContent>
        </IonCard>
            ))}
    </IonContent>
    </>
  );
}

export default Notification;
