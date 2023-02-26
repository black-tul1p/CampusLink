import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
<<<<<<< HEAD
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_Firebase_apiKey,
=======

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
>>>>>>> b78e432 (implemented 'courses' backend - add, remove and get 'course' from firesbase db)
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
export const firestore = getFirestore(app);
<<<<<<< HEAD
export const auth = getAuth(app);
=======
export const auth = getAuth(app);
>>>>>>> b737697 (Implement backend for handling users)
=======
export const firestore = getFirestore(app);
>>>>>>> b78e432 (implemented 'courses' backend - add, remove and get 'course' from firesbase db)
