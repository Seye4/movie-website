// Import the functions you need from the SDKs you need
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDthCRZOzpCrYGJyIOxsDuT9RHYQp0xMA4",
  authDomain: "netflix-clone-bca44.firebaseapp.com",
  projectId: "netflix-clone-bca44",
  storageBucket: "netflix-clone-bca44.firebasestorage.app",
  messagingSenderId: "706928177549",
  appId: "1:706928177549:web:c1a58788f9ed8dc65ccdc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  if (!email || !password || !name) return;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error, error.message);
    toast.error(error.code);
  }
};

const login = async (email, password) => {
  if (!email || !password) return;
  try {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      toast.info("error");
    });
  } catch (error) {
    console.log("error, error.message");
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, logout, signup };
