import React from "react";
import "../styles/EmployeeDashboard.css";

export default function EmployeeDashboard() {

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }

  return (
    <div className="emp-page">
      <div className="emp-card">
        <h2 className="emp-title">Employee Dashboard</h2>
        <p className="emp-subtitle">Welcome! Explore your activity and badges.</p>

        <div className="emp-info">
          Your session is active.  
          <br />
          Your token is securely stored.
        </div>

        <button className="emp-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
