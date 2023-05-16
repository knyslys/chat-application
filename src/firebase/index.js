// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAL-n2MaA1vDuXii5uS20YB12yzQWDIlEs",

  authDomain: "chat-f2257.firebaseapp.com",

  databaseURL:
    "https://chat-f2257-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "chat-f2257",

  storageBucket: "chat-f2257.appspot.com",

  messagingSenderId: "205769011137",

  appId: "1:205769011137:web:37b1c44b9c6d1143328940",

  measurementId: "G-FC9R3F875Q",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auths = getAuth(app);
export { db, auths };
const analytics = getAnalytics(app);
