import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs9H5_kau3m6jKVbWw9HfzoU_fcctA9BI",
  authDomain: "uploading-c8353.firebaseapp.com",
  projectId: "uploading-c8353",
  storageBucket: "uploading-c8353.appspot.com",
  messagingSenderId: "953028014588",
  appId: "1:953028014588:web:5707208c0a8c98db41c279"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);