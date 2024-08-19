// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFirebase } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIWB3uhRY6Yugxwo6GhdGeHXI5v0bfGw4",
  authDomain: "flashcard-3b156.firebaseapp.com",
  projectId: "flashcard-3b156",
  storageBucket: "flashcard-3b156.appspot.com",
  messagingSenderId: "943368257680",
  appId: "1:943368257680:web:d748bf615d438a08031815",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
