import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import "firebase/auth";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDLAj91oJ3U_24VU2RW9511RKqYuf-sviQ",
  authDomain: "web3-334501.firebaseapp.com",
  databaseURL: "https://web3-334501-default-rtdb.firebaseio.com",
  projectId: "web3-334501",
  storageBucket: "web3-334501.appspot.com",
  messagingSenderId: "645239520683",
  appId: "1:645239520683:web:3e90522f06ea69822ce6ee",
});

export const db = getFirestore(app);
