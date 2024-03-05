import React, { useEffect, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router';
import { home, notifications, book, power, personCircle, homeSharp, notificationsSharp, bookSharp, personCircleSharp, powerSharp} from 'ionicons/icons';

import Login from '../components/Login';
import CardList from '../components/CardList';
import DetailCard from '../components/DetailCard';
import AjouterAnnonce from '../components/AjouterAnnonce';

import '../assets/css/variables.css';
import Notification from '../components/Notification';
import Profil from '../components/Profil';

interface Marque {
  id: number;
  nom: string;
}


interface Annonce {
  id: number;
  titre: string;
  description: string;
  image: string;
}





function Accueil() { 

  const token = localStorage.getItem("token");
  const [annonce, setAnnonce] = useState<Annonce[]>([]);
  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await fetch('https://webservice-production-4a2c.up.railway.app/annonces/proprietaire', {
          method: 'GET',
          headers: {
           'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
          },
        });
        const datas = await response.json();
        setAnnonce(datas.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchAnnonce();
  }, []);

  const history = useHistory();
  const logout = async () => {
    try {
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
      alert(JSON.stringify(donnee)+"    data1   "+JSON.stringify(rep));





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
  }
  function rediriger(){
    history.push('/logout');
    window.location.reload();
  }

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/Accueil" to="/h" />
          <Redirect exact path="/login" to="/" />
          <Route path="/h" render={() => (
            <IonContent >
              <CardList  data={annonce} />
            </IonContent>
          )} exact={true} />
          <Route path="/library" render={() => <Login />} exact={true} />
          <Route path="/ajoutannonce" render={() => <AjouterAnnonce />} exact={true} />
          <Route path="/notification" render={() => <Notification />} exact={true} />
          <Route path="/profil" render={() => <Profil />} exact={true} />
          <Route path="/Detail/:id" render={() => <DetailCard/>} exact={true} />
          <Redirect exact from="/Accueil/:id" to="/Detail/:id" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" id='barmenu'>
          <IonTabButton tab="home" href="/h">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="annonce" href="/ajoutannonce">
            <IonIcon icon={bookSharp} />
            <IonLabel>Annonce</IonLabel>
          </IonTabButton>

          <IonTabButton tab="notification" href="/notification">
            <IonIcon icon={notificationsSharp} />
            <IonLabel>Notification</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profil" href="/profil">
            <IonIcon icon={personCircleSharp} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>

        <IonTabButton tab="logout" onClick={rediriger}>
          <IonIcon icon={powerSharp} />
          <IonLabel>Logout</IonLabel>
        </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

export default Accueil;
