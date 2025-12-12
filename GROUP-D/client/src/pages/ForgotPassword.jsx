import "../styles/ForgotPassword.css";

import React, { useState } from "react";
import axios from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      // 🔹 API call to send OTP
      await axios.post("/auth/forgot-password", { email });

      // 🔹 Inform user OTP sent
      setMsg("If the email exists, an OTP has been sent.");

      // 🔹 Navigate to Verify OTP screen
      navigate("/verify-otp", { state: { email } });

    } catch (err) {
      setError(err?.response?.data?.detail || "Something went wrong.");
    }
  }

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <h2 className="forgot-title">Forgot Password?</h2>
        <p className="forgot-subtitle">
          Enter your registered email address to receive an OTP.
        </p>

        <form onSubmit={submit}>

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}
          {msg && <div className="success">{msg}</div>}

          <button type="submit" className="forgot-btn">Send OTP</button>
        </form>

        <p className="back-login">
          Remember your password?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
