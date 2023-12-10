// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCPus0d3wnO-oqlEMbjira7Xi9p0eW5wbU",
  authDomain: "jasibe-store.firebaseapp.com",
  projectId: "jasibe-store",
  storageBucket: "jasibe-store.appspot.com",
  messagingSenderId: "1045363476858",
  appId: "1:1045363476858:web:0e9cb44258caad676b2ec3"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp)
const FirebaseFirestore = getFirestore(FirebaseApp)

export { FirebaseApp, FirebaseAuth, FirebaseFirestore }
