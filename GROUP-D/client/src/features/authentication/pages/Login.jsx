// src/features/authentication/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";
import { loginApi } from "../services/authApi";

const ADMIN_SECRET = "ADMIN123";

function Login() {
  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (role === "admin") {
      if (secret.trim() !== ADMIN_SECRET) {
        setLocalError("Invalid admin secret code");
        return;
      }
    }

    try {
      setLoading(true);
      const data = await loginApi({ email, password }); // /auth/login (Mongo)
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", role);
      navigate("/dashboard");
    } catch (err) {
      setLocalError("Login failed. Check email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">BragBoard</h1>
          <p className="auth-subtitle auth-subtitle--center">
            Sign in to your workspace
          </p>
        </div>

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

          {localError && <div className="auth-error">{localError}</div>}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading
              ? "Signing in..."
              : `Login as ${role === "admin" ? "Admin" : "Employee"}`}
          </button>
        </form>

        <p className="auth-footer">
          Forgot password? <Link to="/forgot-password">Reset it</Link>
        </p>

        <p className="auth-footer">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
