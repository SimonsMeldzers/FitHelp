// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCDssMotoAawwDQS-jdedsejccoB7aN_v8",
    authDomain: "fithelp-b1739.firebaseapp.com",
    projectId: "fithelp-b1739",
    storageBucket: "fithelp-b1739.appspot.com",
    messagingSenderId: "482640739623",
    appId: "1:482640739623:web:dbda2a66ef896c030d3d02",
    measurementId: "G-LD7K0WP83X"
};

// Palaiž Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth()
export const db = getFirestore()