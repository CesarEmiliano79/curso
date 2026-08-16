import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const useData = (path, transform) => {
  const [snapshot, loading, error] = useObject(ref(database, path));
  let data;
  if (snapshot) {
    const value = snapshot.val();
    data = !loading && !error && transform ? transform(value) : value;
  }
  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);