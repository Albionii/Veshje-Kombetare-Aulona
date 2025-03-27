import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false });

  // Check if user is logged in
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_BASE_URL + "/auth/check-auth", { withCredentials: true })
      .then(() => setAuth({ isAuthenticated: true }))
      .catch(() => setAuth({ isAuthenticated: false }));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
