// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFYEG7xefwv091UDa0YlLQKIi4kx-ImTs",
  authDomain: "netflix-clone-2b78d.firebaseapp.com",
  projectId: "netflix-clone-2b78d",
  storageBucket: "netflix-clone-2b78d.appspot.com",
  messagingSenderId: "545187163697",
  appId: "1:545187163697:web:5921cb54585ca58eaf6f10",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
