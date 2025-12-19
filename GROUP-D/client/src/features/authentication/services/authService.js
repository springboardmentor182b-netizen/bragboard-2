// src/features/authentication/services/authService.js
const API_BASE_URL = "http://localhost:8000"; // FastAPI backend

export async function signupService(name, email, password) {
  // For now, if backend is not running, you can mock this with a resolved promise.
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  // Expected: { access_token: string, token_type: "bearer" }
  return res.json();
}

export async function loginService(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}
