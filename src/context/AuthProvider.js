import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    
    const storedAuth = localStorage.getItem("auth"); // Get authentication data from localStorage
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    // Save authentication data to localStorage whenever it changes
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
