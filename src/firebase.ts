// src/firebase.ts

// Import only the Firebase SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Ensure required Firebase configuration values are present
const requiredFields = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId,
};

const missingFields = Object.entries(requiredFields)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingFields.length) {
  throw new Error(`Missing Firebase configuration values: ${missingFields.join(", ")}`);
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
if (firebaseConfig.measurementId) {
  isSupported().then(supported => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

// Initialize Authentication and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// You can export the app if you need it elsewhere
export default app;
