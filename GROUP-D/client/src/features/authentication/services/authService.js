// src/features/authentication/services/authService.js
const API_BASE_URL = "http://localhost:8000"; // FastAPI backend

// SIGNUP with role (ADMIN / EMPLOYEE)
export async function signupService(name, email, password, role) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const msg = errorBody?.detail || "Signup failed";
    throw new Error(msg);
  }

  return res.json();
}

// LOGIN
export async function loginService(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const msg = errorBody?.detail || "Login failed";
    throw new Error(msg);
  }

  return res.json();
}
