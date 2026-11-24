/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import { loginUser as apiLogin, registerUser as apiRegister } from "../services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = async (userData) => {
    const data = await apiLogin(userData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const register = async (userData) => {
    const data = await apiRegister(userData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}