// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA9c_g6q40ayEZTzlfUjWzPoENVj2Z5OrA",

  authDomain: "ahp-topsis.firebaseapp.com",

  projectId: "ahp-topsis",

  storageBucket: "ahp-topsis.appspot.com",

  messagingSenderId: "220479210803",

  appId: "1:220479210803:web:ebaa6d554e3263f1e76a46",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
