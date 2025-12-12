import React from "react";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        
        <h2 className="admin-title">Admin Dashboard</h2>
        <p className="admin-subtitle">
          Manage users, monitor activities, and oversee BrangBoard.
        </p>

        <div className="admin-info">
          You are logged in as <b>Admin</b>.
        </div>

        <button className="admin-btn" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}
