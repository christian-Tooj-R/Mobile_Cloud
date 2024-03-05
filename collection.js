// use vehicule

// Création de la collection "discussions" avec discussion_id comme clé primaire
db.createCollection("discussions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["participants"],
      properties: {
        participants: {
          bsonType: "array",
          items: {
            bsonType: "string",
            description: "Noms des participants"
          }
        },
        messages: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["emetteur", "contenu", "date"],
            properties: {
              emetteur: {
                bsonType: "string",
                description: "Nom de l'expéditeur du message"
              },
              contenu: {
                bsonType: "string",
                description: "Contenu du message"
              },
              date: {
                bsonType: "date",
                description: "Horodatage du message"
              }
            }
          }
        }
      }
    }
  }
})

db.createCollection("infoannonce", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["annonce_id", "auteur_id", "detailvoiture", "description"],
      properties: {
        annonce_id: {
          bsonType: "string",
          description: "id de l'annonce"
        },
        auteur_id: {
          bsonType: "string",
          description: "id de l'auteur"
        },
        auteur: {
          bsonType: "string",
          description: "auteur de l'annonce"
        },
        lieu: {
          bsonType: "string",
          description: "lieu de l'annonce"
        },
        prix_vente: {
          bsonType: "long",
          description: "prix de vente"
        },
        statut: {
          bsonType: "long",
          description: "statut de l'annonce"
        },
        date_annonce: {
          bsonType: "date",
          description: "date de l'annonce"
        },
        detailvoiture: {
          bsonType: "object",
          required: ["marque"],
          properties: {
            matricule: {
              bsonType: "string",
              description: "matricule"
            },
            kilometrage: {
              bsonType: "long",
              description: "kilometrage"
            },
            marque: {
              bsonType: "string",
              description: "marque"
            },
            categorie: {
              bsonType: "string",
              description: "categorie"
            },
            annee: {
              bsonType: "long",
              description: "annee"
            },
            carburant: {
              bsonType: "string",
              description: "carburant"
            }
          }
        },
        description: {
          bsonType: "string",
          description: "Description de l'annonce"
        },
        proprietes: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["titre", "description"],
            properties: {
              titre: {
                bsonType: "string",
                description: "propriete titre"
              },
              description: {
                bsonType: "string",
                description: "propriete description"
              }
            }
          }
        },
        favoris: {
          bsonType: "array",
          items: {
            bsonType: "string",
            description: "id_utilisateur"
          }
        },
        photos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["data", "contentType"],
            properties: {
              data: {
                bsonType: "string",
                description: "Données binaires de l'image encodées en base64"
              },
              contentType: {
                bsonType: "string",
                description: "Type MIME de l'image (par exemple, 'image/jpeg')"
              }
            }
          }
        }
      }
    }
  }
});


// Supprimer une collection
db.discussions.drop()
db.infoannonce.drop()


// Avoir tout les discussions
db.discussions.find().pretty()
db.infoannonce.find().pretty()

// Trier vers messages recentes
db.discussions.find().sort({ "messages.date": -1 }).pretty()


// Avoir les discussions de 'Alice' et 'Bob'
db.infoannonce.find({
  statut: 1
})

//  Insérer un document
db.discussions.insertOne({
  participants: ["1:Alice", "2:Bob"],
  messages: [
    {
      emetteur: "Alice",
      contenu: "Bonjour Bob",
      date: new Date()
    },
    {
      emetteur: "Bob",
      contenu: "salut! quoi de neuf?",
      date: new Date()
    }
  ]
})

db.discussions.insertOne({
  participants: ["1:Alice", "3:John"],
  messages: [
    {
      emetteur: "Alice",
      contenu: "Bonjour John",
      date: new Date()
    }
  ]
})

//  Ajouter un nouveau message à la discussion
db.discussions.update(
  { _id: ObjectId('659ec7fcad74f4230443381a') },
  {
    $push: {
      messages: {
        emetteur: "Alice",
        contenu: "Laisse moi!",
        date: new Date()
      }
    }
  }
)

db.infoannonce.update(
  { annonce_id: '1' },
  {
    $push: {
      favoris: {
        utilisateur_id: "1"
      }
    }
  }
)

// Supprimer une line avec son id
db.infoannonce.deleteOne({ _id: ObjectId("659bea6954293e766909db54") })
db.discussions.deleteOne({ _id: ObjectId("659a963769888c2e7f30c1b3") })


db.infoannonce.insertOne({
  "annonce_id": "1",
  "auteur_id": "1",
  "auteur": "John Doe",
  "prix_vente": NumberLong(120500000),
  "statut": NumberLong(1),
  "date_annonce": new Date(),
  "detailvoiture": 
    {
      "matricule": "ABC123",
      "kilometrage": NumberLong(20000),
      "marque": "Toyota",
      "categorie": "Sedan",
      "annee": NumberLong(2020),
      "carburant": "Essence"
    }
  ,
  "description": "Description de l'annonce 1",
  "proprietes": [
    {
      "titre": "Propriété 1",
      "description": "Description de la propriété 1"
    },
    {
      "titre": "Propriété 2",
      "description": "Description de la propriété 2"
    }
  ],
  "photos": [
    {
      "data": "base64_encoded_image_data_1",
      "contentType": "image/jpeg"
    },
    {
      "data": "base64_encoded_image_data_2",
      "contentType": "image/png"
    }
  ]
});

db.infoannonce.insertOne({
  "annonce_id": "2",
  "auteur_id": "1",
  "auteur": "Jane Doe",
  "prix_vente": NumberLong(250200000),
  "statut": NumberLong(1),
  "date_annonce": new Date(),
  "detailvoiture": 
    {
      "matricule": "XYZ789",
      "kilometrage": NumberLong(30000),
      "marque": "Honda",
      "categorie": "SUV",
      "annee": NumberLong(2019),
      "carburant": "Diesel"
    }
  ,
  "description": "Description de l'annonce 2",
  "proprietes": [
    {
      "titre": "Propriété 3",
      "description": "Description de la propriété 3"
    },
    {
      "titre": "Propriété 4",
      "description": "Description de la propriété 4"
    }
  ],
  "photos": [
    {
      "data": "base64_encoded_image_data_3",
      "contentType": "image/jpeg"
    },
    {
      "data": "base64_encoded_image_data_4",
      "contentType": "image/png"
    }
  ]
});

