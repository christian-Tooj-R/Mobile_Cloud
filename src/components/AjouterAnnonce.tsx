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
  IonCard,
  IonCardContent,
} from '@ionic/react';
import '../assets/css/annonce.css';
import { useHistory } from 'react-router';
import {storage} from '../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import '../assets/css/card.css';
import loading2 from '../assets/images/loading.gif';

interface Categorie {
  id: number;
  nom: string;
}


interface Marque {
  id: number;
  nom: string;
}

function AjouterAnnonce() {
  const [showGif, setShowGif] = useState(false);
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://webservice-production-4a2c.up.railway.app/categories/', {
          method: 'GET',
          headers: {
           'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
          },
        });
        const datas = await response.json();
        setCategories(datas.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  
  const [Marques, setMarques] = useState<Marque[]>([]);

  useEffect(() => {
    const fetchMarques = async () => {
      try {
        const response = await fetch('https://webservice-production-4a2c.up.railway.app/marques/', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
          },
        });
        const datas = await response.json();
        setMarques(datas.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Marques:', error);
      }
    };

    fetchMarques();
  }, []);
  


    const formData = new FormData();
  const [dateHeure, setDateHeure] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [titre, setTitre] = useState('');
  const [marque, setMarque] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
};
  
  
  const history = useHistory();
  
  const annonce = {
    "dateAjout" : dateHeure,
    "titre" : titre,
    "description" : description,
    "categorie": categorie,
    "marque" : marque,
    "prix" : prix
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const imageref = ref(storage,`images/${selectedFile.name}`);
      await uploadBytes(imageref, selectedFile);

      const url = await getDownloadURL(imageref);
      console.log(JSON.stringify(url));
      setImage(JSON.stringify(url));

      const annonce = {
        dateAjout: dateHeure,
        titre: titre,
        description: description,
        categorie: categorie,
        marque: marque,
        prix: prix,
        image: JSON.stringify(url).slice(1,-1), 
      };


      try {
        const response = await fetch('https://webservice-production-4a2c.up.railway.app/annonces/insert', {
          method: 'POST',
          body: JSON.stringify(annonce),
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });
    
        const datas = await response.json();
        console.log("Réponse :", JSON.stringify(datas));

        history.push('/Accueil');
        window.location.reload();
        
      } catch (error) {
        
        console.log("Error :", error);
      }
    }
  };

 
  const handleAjoutAnnonce = async () => {
    
    setShowGif(true);
    await handleUpload();
    
  };


  return (
    <>
      <IonHeader style={{ height: '60px', position: 'fixed' }}>
        <IonToolbar style={{ height: '60px' }}>
          <IonTitle>Ajouter une Annonce</IonTitle>
        </IonToolbar>
      </IonHeader>

      <br />
      <br /> <br />
      <IonContent className="annonce-content">
      <IonCard>
          <IonCardContent>
          {/* Champ Date et Heure */}
          <IonItem>
            <IonLabel>Date et Heure</IonLabel>
            <IonInput
              type="datetime-local"
              
            labelPlacement="floating"
            fill="outline"
              value={dateHeure}
              onIonChange={(e) => setDateHeure(e.detail.value!)}
            ></IonInput>
          </IonItem>

          
          {/* Champ Titre */}
          <IonItem>
            <IonLabel>Titre</IonLabel>
            <IonInput
              type="text"
              
              labelPlacement="floating"
              fill="outline"
              value={titre}
              onIonChange={(e) => setTitre(e.detail.value!)}
            ></IonInput>
          </IonItem>

          {/* Champ Description */}
          <IonItem>
            <IonLabel>Description</IonLabel>
            <IonTextarea

              rows={4}
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>

          {/* Champ Catégorie */}
          <IonItem>
            <IonLabel>Catégorie</IonLabel>
            <IonSelect
              value={categorie}
              placeholder="Choisir une Catégorie"
              onIonChange={(e) => setCategorie(e.detail.value)}
              interface='popover'
            >
              {categories.map((option) => (
                <IonSelectOption key={option.nom} value={option.nom}>
                  {option.nom}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          {/* Champ Marque */}
          <IonItem>
            <IonLabel>Marque</IonLabel>
            <IonSelect
              value={marque}
              placeholder="Choisir une Marque"
              onIonChange={(e) => setMarque(e.detail.value)}
              interface='popover'
            >
              {Marques.map((option) => (
                <IonSelectOption key={option.nom} value={option.nom}>
                  {option.nom}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          {/* Champ Prix */}
          <IonItem>
            <IonLabel>Prix</IonLabel>
            <IonInput
            
            labelPlacement="floating"
            fill="outline"
              type="text"
              value={prix}
              onIonChange={(e) => setPrix(e.detail.value!)}
            ></IonInput>
          </IonItem>

          {/* Champ Upload de Photo */}
          <IonItem>
            <IonLabel>Sélectionnez un fichier :</IonLabel>
            <input type="file" onChange={handleFileChange} />
          </IonItem>
          {/* <IonButton onClick={handleUpload}>Télécharger</IonButton> */}

          {/* Bouton Ajouter Annonce */}
          {showGif && (
            <img
              src={loading2}
              style={{ width: '25px', height: '25px',marginTop:'5px' }}
            />
          )}
          <IonButtons className="bouton-annonce" onClick={handleAjoutAnnonce}>
            Ajouter Annonce
          </IonButtons>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  );
}

export default AjouterAnnonce;
