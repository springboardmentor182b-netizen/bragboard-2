// src/features/authentication/pages/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo only – pretend to submit signup
    console.log("Signup form submitted", form);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">Create an account</h1>
          <p className="auth-subtitle auth-subtitle--center">
            Join BragBoard and start sharing your wins
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Name
            <input
              type="text"
              name="name"
              className="auth-input"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-label">
            Email
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-label">
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              className="auth-input"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-button" type="submit">
            Sign up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
