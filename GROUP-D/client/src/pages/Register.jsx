import React, { useState } from "react";
import axios from "../services/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const ADMIN_SECRET = "adminofbragboard";  // fixed admin key

  async function submit(e) {
    e.preventDefault();
    setError("");
    setMsg("");

    // 1️⃣ Validate admin secret key
    if (adminKey !== ADMIN_SECRET) {
      setError("Invalid Admin Secret Key");
      return;
    }

    // 2️⃣ Check passwords match
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 3️⃣ Register employee
      await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      setMsg("Registration successful.");

      // 4️⃣ Redirect to login page
      // Admin will manually click "Login" below.
      
    } catch (err) {
      setError(err?.response?.data?.detail || "Registration failed");
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <h2 className="register-title">Create Account ✨</h2>
        <p className="register-subtitle">
          Join BrangBoard and start appreciating your team!
        </p>

        <form onSubmit={submit}>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Admin Secret Key */}
          <input
            type="text"
            placeholder="Admin Secret Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
          />

          {/* Password */}
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8 a21.78 21.78 0 0 1 5.06-6.88" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="password-box">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <svg width="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8 a21.78 21.78 0 0 1 5.06-6.88" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </span>
          </div>

          {error && <div className="error">{error}</div>}
          {msg && <div className="success">{msg}</div>}

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
