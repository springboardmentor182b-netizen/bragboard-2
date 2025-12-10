import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/auth";
import "../styles/Login.css";

export default function Login() {
  const [loginType, setLoginType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
        role: loginType,
      });

      const token = res?.data?.access_token || res?.data?.token;

      if (token) {
        // store role & token
        localStorage.setItem("access_token", token);
        localStorage.setItem("role", loginType);

        // redirect to correct dashboard
        if (loginType === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Login error");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="subtitle">Join BrangBoard and start appreciating your team</p>

        <form onSubmit={submit}>

          {/* DROPDOWN */}
          <div className="input-box">
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              required
            >
              <option value="">Choose Login Type</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>

            <span className="icon-right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>

          {/* EMAIL */}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span className="icon-right" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                // OPEN EYE
                <svg width="20" viewBox="0 0 24 24" fill="none"
                  stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // CLOSED EYE
                <svg width="20" viewBox="0 0 24 24" fill="none"
                  stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8
                           a21.78 21.78 0 0 1 5.06-6.88" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </span>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* ONLY ADMIN SEES REGISTER */}
        {loginType === "admin" && (
          <p className="bottom-text">
            New User?{" "}
            <span className="link" onClick={() => navigate("/register")}>
              Create an account
            </span>
          </p>
        )}

        <p className="forgot link" onClick={() => navigate("/forgot")}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
}
