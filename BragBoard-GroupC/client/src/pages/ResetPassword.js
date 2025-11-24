    import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../features/authentication/services/ResetPassword";

const ResetPassword = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleReset = async () => {
    if (newPass !== confirmPass) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      await resetPassword(email, newPass);
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      setMsg("Failed to reset password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>

      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
};

export default ResetPassword;
