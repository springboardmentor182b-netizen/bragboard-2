import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../features/authentication/services/VerifyOTP";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // fetch email from previous screen

  const handleVerify = async () => {
    try {
      await verifyOtp(email, otp);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setMsg("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <p>OTP sent to: {email}</p>

      <input
        type="number"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>

      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
};

export default VerifyOTP;
