/**
 * Firebase config provided by Firebase Web App configuration
 */

/* Import the functions you need from the SDKs you need */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/* Your web app's Firebase configuration */
const firebaseConfig = {
  apiKey: "AIzaSyC6Q_vlUn5Jpl3aWtDLcLRIOuXYqB-edhc",
  authDomain: "tick-it-e176f.firebaseapp.com",
  projectId: "tick-it-e176f",
  storageBucket: "tick-it-e176f.firebasestorage.app",
  messagingSenderId: "614709134901",
  appId: "1:614709134901:web:0f644ae4bd75ae4a43937c",
};

/* Initialize Firebase */
const FIREBASE_APP = initializeApp(firebaseConfig);
/* Firestore database  */
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
/* Firebase Storage */
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
/* Firebase Authentication */
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
