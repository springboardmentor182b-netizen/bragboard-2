import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { role } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#f4f4f4" }}>
      <h3>Dashboard</h3>
      <ul>
        {role === "admin" && <li>Admin Panel</li>}
        {role === "employee" && <li>My Tasks</li>}
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
