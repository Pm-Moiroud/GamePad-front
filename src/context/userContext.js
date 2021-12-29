import { createContext, useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { providerGoogle } from "../firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const signInGoogle = () => signInWithPopup(auth, providerGoogle);

  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);

  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ signUp, currentUser, signIn, signInGoogle }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
