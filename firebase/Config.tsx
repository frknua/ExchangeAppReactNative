// Import the functions you need from the SDKs you need
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {getFirestore, collection, doc, setDoc, db, getDoc, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy, onSnapshot}