// src/features/authentication/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo only – pretend to send email
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">Forgot password</h1>
          <p className="auth-subtitle auth-subtitle--center">
            Enter your email to receive reset instructions
          </p>
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

          {submitted && (
            <div className="auth-error" style={{ color: "#27ae60" }}>
              If this email exists, reset instructions have been sent.
            </div>
          )}

          <button className="auth-button" type="submit">
            Send reset link
          </button>
        </form>

        <p className="auth-footer">
          Remembered your password? <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
