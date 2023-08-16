import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCB13ZtGS2OjYv8zCzJr5f3lQ9xrZk-HSk",
  authDomain: "monkey-blogging-501e2.firebaseapp.com",
  projectId: "monkey-blogging-501e2",
  storageBucket: "monkey-blogging-501e2.appspot.com",
  messagingSenderId: "428349988196",
  appId: "1:428349988196:web:56839d4b02ae00edc4ae71",
  measurementId: "G-4WXKEBQ3BT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
