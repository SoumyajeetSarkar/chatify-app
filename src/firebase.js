
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// console.log(process.env.REACT_APP_API_KEY)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chatifyy-e84dd.firebaseapp.com",
  projectId: "chatifyy-e84dd",
  storageBucket: "chatifyy-e84dd.appspot.com",
  messagingSenderId: "454744559894",
  appId: "1:454744559894:web:19313c7c21c36c98ea4037"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();