// src/features/authentication/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginService, signupService } from "./services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService(email, password);
      setToken(data.access_token || null);
      setUser(data.user || null);
      localStorage.setItem("authToken", data.access_token || "");
      return { success: true };
    } catch (err) {
      const msg = err.message || "Login failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, role) => {
    setLoading(true);
    setError(null);
    try {
      await signupService(name, email, password, role);
      return { success: true };
    } catch (err) {
      const msg = err.message || "Signup failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const saved = localStorage.getItem("authToken");
    if (saved) {
      setToken(saved);
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
