import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";
import { resetPasswordApi } from "../services/authApi";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || "";
  const initialOtp = location.state?.otp || "";
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(initialOtp);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await resetPasswordApi(email, otp, newPassword);
      setMessage("Password reset successful. You can now log in.");
      navigate("/login");
    } catch (err) {
      setError("Reset failed. Check email, OTP, and try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">Reset Password</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Email
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            OTP
            <input
              type="text"
              className="auth-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            New Password
            <input
              type="password"
              className="auth-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}
          {message && (
            <div className="auth-error" style={{ color: "#27ae60" }}>
              {message}
            </div>
          )}

          <button className="auth-button" type="submit">
            Reset Password
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
