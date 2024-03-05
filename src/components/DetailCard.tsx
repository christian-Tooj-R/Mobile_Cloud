import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import '../assets/css/card.css';


interface Annonce {
  id: object;
  titre: string;
  description: string;
  image: string;
  categorie: string;
  marque: string;
  prix: number;
  dateAjout: string;
  status: string;
}


function DetailCard() {

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(true);
  function close(){
    setIsOpen(false);
    history.push("/Accueil");
    window.location.reload();
  }
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [annonce, setAnnonce] = useState<Annonce>({
    id: {},
    titre: '',
    description: '',
    image: '',
    categorie: '',
    marque: '',
    prix: 0,
    dateAjout: '',
    status: '',
  });


  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await fetch(`https://webservice-production-4a2c.up.railway.app/annonces/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });
        const datas = await response.json();
        setAnnonce(datas.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'annonce:', error);
      }
    };

    fetchAnnonce();
  }, [id, token]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const [updatedValues, setUpdatedValues] = useState<Record<string, string | number>>({});
  const renderLabel = (label: string, value: string | number | undefined) => {
    if (isEditMode) {
      return (
        <>
          <IonLabel>{label} : </IonLabel>
          <IonInput
            id={label}
            value={updatedValues[label] !== undefined ? updatedValues[label] : value || ''}
            onIonChange={(e) => handleInputChange(label, e.detail.value)}
          />
        </>
      );
    } else {
      return <IonLabel>{`${label} : ${value}`}</IonLabel>;
    }
  };

  const handleInputChange = (field: string, newValue: string | null) => {
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [field]: newValue || '',
    }));
  };

  const updating = async () => {
    const parsedNouvelleAnnonce = JSON.parse(JSON.stringify(updatedValues));


    const mergedAnnonce: Annonce = { ...annonce, ...parsedNouvelleAnnonce };

    

  //  alert("Body   "+JSON.stringify(mergedAnnonce));

    try {
      const response = await fetch('https://webservice-production-4a2c.up.railway.app/annonces/'+annonce?.id, {
        method: 'PUT',
        headers: {
         'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(mergedAnnonce),
      });
      const datas = await response.json();
    //  alert(JSON.stringify(datas));
    } catch (error) {
      console.error('Erreur :', error);
    }


  //  setIsEditMode(!isEditMode);
    
    close();
  };

  return (
    <>
    
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail</IonTitle>
          
            <IonButtons  onClick={() => close()}>Retour</IonButtons>
          
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <br/><br/><br/>

        {annonce ? (
          <IonCard>
            <img className="image" src={annonce.image} alt="photoici" />
            <IonCardHeader>
              <IonCardTitle>
                {renderLabel("titre", annonce.titre)}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {renderLabel("description", annonce.description)}
            </IonCardContent>
            <IonItem>
              {renderLabel("categorie", annonce.categorie)}
            </IonItem>
            <IonItem>
              {renderLabel("marque", annonce.marque)}
            </IonItem>
            <IonItem>
              {renderLabel("prix", annonce.prix)}
            </IonItem>
            <IonItem>
              {renderLabel("date d'ajout", annonce.dateAjout)}
            </IonItem>
            <IonItem>
              {renderLabel("status", annonce.status)}
            </IonItem>
            <IonItem>
              {isEditMode ? (
                <IonButtons onClick={updating}>Terminer la modification</IonButtons>
              ) : (
                <IonButtons onClick={toggleEditMode}>Modifier</IonButtons>
              )}
            </IonItem>
          </IonCard>
        ) : (
          <div>
            <br />
            Chargement...
            </div>
        )}
      </IonContent>
      
    </IonModal>
    </>
  );
}

export default DetailCard;