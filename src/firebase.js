import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCY4NILMewaGZbKLrQUN_12Xp9GG0wXhf0",
  authDomain: "wechat-fee48.firebaseapp.com",
  projectId: "wechat-fee48",
  storageBucket: "wechat-fee48.appspot.com",
  messagingSenderId: "914990946476",
  appId: "1:914990946476:web:8b31a96402ef8a97796709"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();