import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDLAj91oJ3U_24VU2RW9511RKqYuf-sviQ",
  authDomain: "web3-334501.firebaseapp.com",
  databaseURL: "https://web3-334501-default-rtdb.firebaseio.com",
  projectId: "web3-334501",
  storageBucket: "web3-334501.appspot.com",
  messagingSenderId: "645239520683",
  appId: "1:645239520683:web:3e90522f06ea69822ce6ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);
