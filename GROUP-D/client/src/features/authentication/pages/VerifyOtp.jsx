import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";
import { verifyOtpApi } from "../services/authApi";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await verifyOtpApi(email, otp);
      setMessage("OTP verified.");
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      setError("Invalid or expired OTP.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand auth-brand--center">
          <img src={logo} alt="BragBoard logo" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">Verify OTP</h1>
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

          {error && <div className="auth-error">{error}</div>}
          {message && (
            <div className="auth-error" style={{ color: "#27ae60" }}>
              {message}
            </div>
          )}

          <button className="auth-button" type="submit">
            Verify OTP
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;
