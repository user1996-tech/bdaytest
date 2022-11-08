// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpXnDwZ9NeL5vudBzOTXEqQhMlJhYtqqU",
  authDomain: "testbdad-bcb6e.firebaseapp.com",
  projectId: "testbdad-bcb6e",
  storageBucket: "testbdad-bcb6e.appspot.com",
  messagingSenderId: "104271438837",
  appId: "1:104271438837:web:0fbb4559edb0f4731136bc",
  measurementId: "G-JBG7B2EE4X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { app, db };
