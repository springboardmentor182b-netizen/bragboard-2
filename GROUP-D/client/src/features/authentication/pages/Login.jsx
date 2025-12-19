// src/features/authentication/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./LoginPage.css";
import logo from "../../../assets/logo.png"; // <-- your logo path

const ADMIN_SECRET = "ADMIN123"; // demo secret code

function Login() {
  const { login, loading, error } = useAuth();
  const [role, setRole] = useState("employee"); // "employee" | "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Extra check for admin
    if (role === "admin") {
      if (secret.trim() !== ADMIN_SECRET) {
        setLocalError("Invalid admin secret code");
        return;
      }
    }

    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else if (result.message) {
      setLocalError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Centered logo + title */}
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">BragBoard</h1>
          <p className="auth-subtitle auth-subtitle--center">
            Sign in to your workspace
          </p>
        </div>

        {/* Role switch */}
        <div className="role-switch">
          <button
            type="button"
            className={
              role === "employee"
                ? "role-toggle role-toggle--active"
                : "role-toggle"
            }
            onClick={() => {
              setRole("employee");
              setSecret("");
              setLocalError("");
            }}
          >
            Employee
          </button>
          <button
            type="button"
            className={
              role === "admin"
                ? "role-toggle role-toggle--active"
                : "role-toggle"
            }
            onClick={() => {
              setRole("admin");
              setLocalError("");
            }}
          >
            Admin
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Email
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {/* Admin secret field appears only for admin */}
          {role === "admin" && (
            <label className="auth-label">
              Admin Secret Code
              <input
                type="password"
                className="auth-input"
                placeholder="Enter admin secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
              />
            </label>
          )}

          {(error || localError) && (
            <div className="auth-error">{localError || error}</div>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading
              ? "Signing in..."
              : `Login as ${role === "admin" ? "Admin" : "Employee"}`}
          </button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
