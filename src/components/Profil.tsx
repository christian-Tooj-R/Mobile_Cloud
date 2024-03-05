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
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
} from '@ionic/react';
import '../assets/css/annonce.css';
import '../assets/css/card.css';

import { personCircleSharp } from 'ionicons/icons';



interface User {
  id: number;
  nom: string;
  dateNaissance:string;
  email:string;
  mdp:string;
  typeUtilisateur:number;
}



function Profil() {
  const token = localStorage.getItem("token");
  const [profil, setProfil] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://webservice-production-4a2c.up.railway.app/utilisateurs/getUser', {
          method: 'GET',
          headers: {
           'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
          },
        });
        const datas = await response.json();
        setProfil(datas.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Profils:', error);
      }
    };

    fetchUser();
  }, []);

  
  
  
  
  

  return (
    <>
    <IonHeader style={{ height: '60px', position: 'fixed' }}>
    <IonToolbar style={{ height: '60px' }}>
      <IonTitle>Votre Profil</IonTitle>
    </IonToolbar>
    </IonHeader>
          <br/><br/><br/>

    <IonContent>
        <IonCard>
            
      <IonCardHeader>
        <IonCardSubtitle>
            <IonIcon icon={personCircleSharp} className='image'/>
        </IonCardSubtitle>
      </IonCardHeader>
          <IonCardContent>
            <IonItem>
                <IonLabel>
                    {"Nom : "+profil?.nom}
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>
                    {"Date de Naissance : "+profil?.dateNaissance}
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>
                    {"Email : "+profil?.email}
                </IonLabel>
            </IonItem>
            </IonCardContent>
        </IonCard>
    </IonContent>
    
    </>
  );
}

export default Profil;
