// src/features/authentication/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";

function Signup() {
  const { signup, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      navigate("/dashboard");
    } else if (result.message) {
      setLocalError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">Create account</h1>
          <p className="auth-subtitle auth-subtitle--center">
            Join your BragBoard workspace
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Full Name
            <input
              type="text"
              className="auth-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {(error || localError) && (
            <div className="auth-error">{localError || error}</div>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
