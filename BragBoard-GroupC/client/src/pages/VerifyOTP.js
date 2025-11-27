import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BigText from "./BigText";
import "./VerifyOTP.css";
import { verifyOtp } from "../features/authentication/services/VerifyOTP";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      await verifyOtp(email, otp);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setMsg("Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <BigText />

      <div className="auth-box">
        <h2 className="auth-title">Verify OTP</h2>

        <p className="auth-subtitle">
          OTP has been sent to <span>{email}</span>
        </p>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          className="auth-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button className="auth-btn" onClick={handleVerify}>
          Verify
        </button>

        {msg && <p className="auth-error">{msg}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP;