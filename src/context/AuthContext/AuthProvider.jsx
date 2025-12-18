import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import api from "../../services/api";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const signOutUser = () => {
    setLoading(true);
    return auth.signOut();
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // observe auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);

        // 1️⃣ send email to backend to get JWT
        try {
          const res = await api.post("/auth/jwt", {
            email: currentUser.email,
          });
          localStorage.setItem("access-token", res.data.token);
        } catch (err) {
          console.error("Failed to get JWT from backend", err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const authInfo = {
    registerUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    user,
    loading,
    setLoading,
    setUser,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
