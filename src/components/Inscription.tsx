// Import des composants et styles nécessaires
import React, { useState } from 'react';
import { IonButton, IonInput, IonLabel, IonRouterLink, IonContent } from '@ionic/react';
import '../assets/css/inscription.css'; // Assurez-vous d'avoir le fichier CSS approprié
import { colorFill } from 'ionicons/icons';
import { useHistory } from 'react-router';

function Inscription() {
  // États pour stocker les valeurs des champs du formulaire
  const [nom, setNom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const history = useHistory();
  // Fonction de gestion du formulaire d'inscription
  const handleInscription = async () => {
    const users = {
      nom : nom,
      dateNaissance : dateNaissance,
      email : email,
      mdp : motDePasse
    }
    try {
      const response = await fetch('https://webservice-production-4a2c.up.railway.app/utilisateurs/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(users),
      });
      const datas = await response.json();
  
      
    history.push('/login');
    window.location.reload();
    }catch(error){
      alert(error);
    }
  };

  return (
    <IonContent>
      <center>
        <div className='conteneur-inscription'>
          <IonLabel id='label-inscription'>Inscription</IonLabel>



          {/* Champ Nom */}
          <IonInput
          style={{color : 'white'}}
            id="nom"
            label="Nom"
            type="text"
            labelPlacement="floating"
            fill="outline"
            value={nom}
            onIonChange={(e) => setNom(e.detail.value!)}
          ></IonInput>
          
          {/* Champ Nom */}
          <IonInput
          style={{color : 'white'}}
            id="dtn"
            label="Date de naissance"
            type="datetime-local"
            labelPlacement="floating"
            fill="outline"
            value={dateNaissance}
            onIonChange={(e) => setDateNaissance(e.detail.value!)}
          ></IonInput>

          {/* Champ Email */}
          <IonInput
          style={{color : 'white'}}
            id="email"
            label="Email"
            type="email"
            labelPlacement="floating"
            fill="outline"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>

          {/* Champ Mot de passe */}
          <IonInput
          style={{color : 'white'}}
            id='mdp-inscription'
            label="Mot de passe"
            type="password"
            labelPlacement="floating"
            fill="outline"
            value={motDePasse}
            onIonChange={(e) => setMotDePasse(e.detail.value!)}
          ></IonInput>

          {/* Bouton Inscription */}
          <IonButton color={'danger'} id='bouton-inscription' onClick={handleInscription}>S'inscrire</IonButton>

          {/* Lien vers la page de connexion */}
          <div>
            <IonRouterLink routerDirection="forward" href="/login">
              <IonLabel  id='label2-inscription'>Déjà un compte ? Se connecter</IonLabel>
            </IonRouterLink>
          </div>
        </div>
      </center>
    </IonContent>
  );
}

export default Inscription;
