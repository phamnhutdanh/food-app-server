// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxUkE-z9jGUjRqRQFwl49oQngeSIMOy6c",
  authDomain: "foodapp-4f6a3.firebaseapp.com",
  projectId: "foodapp-4f6a3",
  storageBucket: "foodapp-4f6a3.appspot.com",
  messagingSenderId: "513849025251",
  appId: "1:513849025251:web:afd3d9f3594b193b045bd6",
  measurementId: "G-DN5TRZLDVV",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
