import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";
import { forgotPasswordApi } from "../services/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    try {
      await forgotPasswordApi(email);
      setSubmitted(true);
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError("Failed to start password reset. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">Forgot password</h1>
          <p className="auth-subtitle auth-subtitle--center">
            Enter your email to receive reset OTP
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

          {error && <div className="auth-error">{error}</div>}

          {submitted && !error && (
            <div className="auth-error" style={{ color: "#27ae60" }}>
              If this email exists, an OTP has been sent.
            </div>
          )}

          <button className="auth-button" type="submit">
            Send OTP
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
