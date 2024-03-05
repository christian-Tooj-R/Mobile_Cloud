import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonLabel, IonRouterLink } from '@ionic/react';
import '../assets/css/login.css';
import { useHistory } from 'react-router';
import { registerNotifications } from '../pages/Homepage';
import loading from '../assets/images/loading.gif';
function Login() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  console.log("token  "+ token)
  if(token != null){
    history.push('/accueil');
    window.location.reload();
  }

  const [erreur, setErreur] = useState("");
  const [mail, setEmail] = useState("christooj@gmail.com");
  const [password, setPassword] = useState("123");
  const [showGif, setShowGif] = useState(false);


  const handleLogin = async () => {

    const users = {
      email : mail,
      mdp : password
    }
    try {
      setShowGif(true);
      const response = await fetch('https://webservice-production-4a2c.up.railway.app/utilisateurs/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(users),
      });
      const datas = await response.json();
  
      console.log("data   "+JSON.stringify(datas));
      const token = datas.data;
      
      if(response.ok){
        const registration = await registerNotifications();
        const donnee = {
            token : registration
        }
        
        try {
        const reponse = await fetch('https://webservice-production-4a2c.up.railway.app/peripherique/create',{
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(donnee),
        });
          
        const dt = await reponse.json();
      } catch (error) {
        alert("misy erreur  "+error);
      }


        localStorage.setItem('token',token);
        localStorage.setItem('registre',JSON.stringify(registration).slice(1,-1));
         history.push('/accueil');
      }else{
         setErreur(datas.message); 
      }
    
      


    } catch (error) {
      console.error('Erreur ==>  ', error);
    }

  };
  

  return (
    <>
      <center>
          <IonLabel id='label' style={{color : 'white'}}>Login</IonLabel>
          <IonInput
          style={{color : 'white'}}
            id="mail"
            label="Email"
            type="email"
            labelPlacement="floating"
            fill="outline"
            value={mail}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
          <br />
          <IonInput
          style={{color : 'white'}}
            id='mdp'
            label="Password"
            type="password"
            labelPlacement="floating"
            fill="outline"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)} 
          >
            {showGif && (
            <img
              src={loading}
              style={{ width: '25px', height: '25px',marginTop:'5px' }}
            />
          )}

          </IonInput>
          <IonLabel color={'danger'}>{erreur}</IonLabel>
            
          <IonButton id='bouton1'color={'danger'} onClick={handleLogin}>Connexion</IonButton>
          <div>
            <IonRouterLink routerDirection="forward" href='/inscription'>
              <IonLabel id='label2'>S'inscrire ?</IonLabel>
            </IonRouterLink>
          </div>
      </center>
    </>
  );
}

export default Login;
