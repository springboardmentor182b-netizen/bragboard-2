import React, { useState } from "react";
import axios from "../services/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ResetPassword.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // ⭐ OTP SUCCESS MESSAGE FROM OtpVerify
  const otpMessage = location.state?.otpSuccess || "";

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setError("");

    if (newPassword !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("/auth/reset-password", {
        email,
        new_password: newPassword,
      });

      setMsg("Password reset successful!Redirecting...");
      setTimeout(()=>navigate("/login"),1500);
    } catch (err) {
      setError(err?.response?.data?.detail || "Reset failed");
    }
  }

  return (
    <div className="reset-page">
      <div className="reset-card">

        <h2 className="reset-title">Reset Password</h2>
        <p className="reset-subtitle">Enter your new password</p>

        {/* ⭐ SHOW OTP SUCCESS MESSAGE HERE */}
        {otpMessage && <div className="success">{otpMessage}</div>}

        <form onSubmit={submit}>

          {/* NEW PASSWORD */}
          <div className="input-box">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span className="icon-right" onClick={() => setShowNew(!showNew)}>
              {showNew ? (
                <svg width="22" height="22" fill="none" stroke="#444" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="#444" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.9 21.9 0 0 1 5.06-6.88"/>
                  <path d="M1 1l22 22" />
                </svg>
              )}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-box">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <span className="icon-right" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? (
                <svg width="22" height="22" fill="none" stroke="#444" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="#444" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.9 21.9 0 0 1 5.06-6.88"/>
                  <path d="M1 1l22 22" />
                </svg>
              )}
            </span>
          </div>

          {error && <div className="error">{error}</div>}
          {msg && <div className="success">{msg}</div>}

          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
