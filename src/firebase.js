import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC_7zIB-6hY1cn46z6VXVcrPDMeqUOZOa4",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "school-management-60b2f.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "school-management-60b2f",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "school-management-60b2f.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "37453972719",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:37453972719:web:82f9386a9e5c8bd320871a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-8GT5H0P97P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
