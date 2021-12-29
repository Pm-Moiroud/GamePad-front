import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAs5mJKhg5tOHXeDeDOEEqvjeuY-H0Nfyc",
  authDomain: "rawg-mirror.firebaseapp.com",
  projectId: "rawg-mirror",
  storageBucket: "rawg-mirror.appspot.com",
  messagingSenderId: "60452281051",
  appId: "1:60452281051:web:be583abda8e9de14c08afe",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
