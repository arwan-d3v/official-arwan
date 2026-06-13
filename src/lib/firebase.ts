import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";

// Use strict environment variable template
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase gracefully to prevent build errors on Vercel
let app;
let db: any;

try {
  if (firebaseConfig.projectId && firebaseConfig.databaseURL) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getDatabase(app);
  } else {
    console.warn("Firebase config missing projectId or databaseURL. Using mock app for build.");
    // Mock for build time
    app = !getApps().length ? initializeApp({ projectId: "mock-project", databaseURL: "https://mock.firebaseio.com" }) : getApp();
    db = getDatabase(app);
  }
} catch (error) {
  console.error("Firebase init error during build:", error);
}

// Use emulator for offline debugging in development
if (process.env.NODE_ENV === 'development') {
  const { connectDatabaseEmulator } = require('firebase/database');
  connectDatabaseEmulator(db, '127.0.0.1', 9000);
}

/**
 * Stub function to listen to KiroiX Telemetry payloads via Firebase Real-time Database
 * @param callback - Function to handle incoming EA payload
 * @param path - Optional path in DB, defaults to 'kiroix/telemetry'
 */
export const listenToKiroixTelemetry = (
  callback: (data: unknown) => void,
  path: string = 'kiroix/telemetry'
) => {
  const telemetryRef = ref(db, path);

  // Attach an asynchronous callback to read the data
  onValue(telemetryRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    }
  }, (errorObject) => {
    console.error("The read failed: " + errorObject.name);
  });

  // Return unsubscribe function
  return () => off(telemetryRef);
};

export { app, db };
