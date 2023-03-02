import React, { useEffect, useState } from "react";
import app from "../Backend/firebase";
import { loginUser } from "../Backend/user";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function handleLogin(user) {
    if (user) setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  // useEffect(() => {
  //   app.auth().onAuthStateChanged(setUser);
  //   console.log("JWT LOGIN!");
  // }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
