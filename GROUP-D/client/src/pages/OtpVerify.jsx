import React, { useState, useEffect } from "react";
import axios from "../services/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/OtpVerify.css";

export default function OtpVerify() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Auto-fill email from ForgotPassword.jsx
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      // API call to verify OTP
      await axios.post("/auth/verify-otp", { email, otp });

      //  Redirect With success message
      navigate("/reset", { 
        state: { 
          email, 
          msg: "OTP verified successfully — please reset your password." 
        } 
      });

    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid OTP. Try again.");
    }
  }

  return (
    <div className="otp-page">
      <div className="otp-card">

        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-subtitle">Enter the OTP sent to your email</p>

        <form onSubmit={submit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <button type="submit" className="otp-btn">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
