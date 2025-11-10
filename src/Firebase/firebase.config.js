// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ98hi6b4ORVBpXoEHgfjPliR0V7Xnc18",
  authDomain: "urbancare-970e4.firebaseapp.com",
  projectId: "urbancare-970e4",
  storageBucket: "urbancare-970e4.firebasestorage.app",
  messagingSenderId: "933381314251",
  appId: "1:933381314251:web:03b616f418f81928b9ad4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);