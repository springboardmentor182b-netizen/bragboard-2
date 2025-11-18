import React, { useState } from "react";
import { sendOtp } from "../features/authentication/services/SendOTP";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setMsg("OTP sent to your email!");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSendOtp}>Send OTP</button>

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ForgotPassword;
