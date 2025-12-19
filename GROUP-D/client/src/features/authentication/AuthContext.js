// src/features/authentication/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginService,
  signupService,
} from "./services/authService";

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
      // backend returns: { access_token, token_type }
      setToken(data.access_token);
      setUser({ email });
      localStorage.setItem("authToken", data.access_token);
      return { success: true };
    } catch (err) {
      setError("Login failed");
      return { success: false, message: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signupService(name, email, password);
      setToken(data.access_token);
      setUser({ name, email });
      localStorage.setItem("authToken", data.access_token);
      return { success: true };
    } catch (err) {
      setError("Signup failed");
      return { success: false, message: "Signup failed" };
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
