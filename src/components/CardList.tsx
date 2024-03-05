import React from 'react';
import Card from './Card';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';

function CardList({ data }) {
  return (
    <>
      {data ? (
        <>
          <IonHeader style={{ height: '60px', position: 'fixed' }}>
            <IonToolbar style={{ height: '60px' }}>
              <IonTitle>Liste de vos Annonces</IonTitle>
            </IonToolbar>
          </IonHeader>
          <br/><br/><br/>
          <div>
            {data.map(({ id, titre, description, image }) => (
              <Card  key={id} id={id} titre={titre} description={description} imagename={image} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <br />
          Chargement...
        </div>
      )}
    </>
  );
}

export default CardList;
