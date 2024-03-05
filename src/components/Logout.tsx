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
import loading from '../assets/images/load2.gif';
import loading2 from '../assets/images/loading.gif';
import { useHistory } from 'react-router';

function Logout() {
    
 const [showGif, setShowGif] = useState(false);
  const history = useHistory();

  
  useEffect(() => {
    // Mettez setShowGif(true) dans useEffect pour déclencher après le rendu initial
    setShowGif(true);
  const rep = async () => {
    try {
        
        setShowGif(true);
        const token = localStorage.getItem("token");
        const registre = localStorage.getItem('registre');
        

        const donnee = {
          token : registre,
        }
        const reponse = await fetch('https://webservice-production-4a2c.up.railway.app/peripherique/delete',{
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(donnee),
        });
  
        const rep = await reponse.json();
  
  
  
  
  
        const response = await fetch('https://webservice-production-4a2c.up.railway.app/utilisateurs/logout',{
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });
        
        const datas = await response.json();
        console.log("data   "+JSON.stringify(datas));
        localStorage.removeItem("token");
        history.push('/login');
        window.location.reload();
      } catch (error) {
        console.error('Erreur ==>  ', error);
      }
  

  
  
    };

    rep();
    
  }, []);

  //  setShowGif(false);
  
  

  return (
    <>
    <IonContent style={{justifyContent : "center"}}>
        <IonCard style={{marginTop : '50px' }}>
          <IonCardContent>
          <IonItem>
        <IonLabel>
            Deconnexion
        </IonLabel>
            </IonItem>
          <IonItem>
        <div>
            <img
              src={loading2}
              style={{ width: '25px', height: '25px',marginTop:'5px' }}
            />
        </div>
            </IonItem>
        </IonCardContent>
        
        </IonCard>
    </IonContent>
    </>
  );
}

export default Logout;
