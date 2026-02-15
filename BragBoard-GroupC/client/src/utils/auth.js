import { jwtDecode } from "jwt-decode";


const TOKEN_KEY = "access_token";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
