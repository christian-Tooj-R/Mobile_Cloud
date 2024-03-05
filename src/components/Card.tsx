import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonRouterLink } from '@ionic/react';
import '../assets/css/card.css';
function Card({id,titre,description,imagename}) {
  return (
    <IonCard >
      <img className='image' src={imagename} alt='photoici'/>
      <IonCardHeader>
        <IonCardTitle>{titre}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{description}</IonCardContent>

      <IonRouterLink routerDirection="forward" href={`/Accueil/${id}`}>
          <IonButton>Detail</IonButton>
      </IonRouterLink>
    </IonCard>
  );
}
export default Card;