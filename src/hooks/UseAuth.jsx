import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";


const UseAuth = () => {
  const context = useContext(AuthContext); // ✅ inside a hook
  if (!context) throw new Error("Must be used within AuthProvider");
  return context;
};

export default UseAuth;
