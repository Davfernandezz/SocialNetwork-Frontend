import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  passport: null,
  setPassport: () => {},
});

export const AuthProvider = ({ content }) => {
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const passportString = localStorage.getItem("passport");
    if (passportString) {
      setPassport(JSON.parse(passportString));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (passport) {
      localStorage.setItem("passport", JSON.stringify(passport));
    } else {
      localStorage.removeItem("passport");
    }
  }, [passport]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ passport, setPassport }}>
      {content}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);