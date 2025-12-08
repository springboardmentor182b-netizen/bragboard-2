import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "30px", padding: "10px", background: "#f5f5f5" }}>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/admin">Admin Dashboard</Link>
      {/* Add other links as needed */}
    </nav>
  );
};

export default Navbar;
