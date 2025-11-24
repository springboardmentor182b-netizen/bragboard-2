import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";

const DashboardLayout = () => {
  const { role } = useAuth();

  // Placeholder for components based on role
  const renderDashboard = () => {
    if (role === "admin") return <AdminDashboard />;
    if (role === "employee") return <EmployeeDashboard />;
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>{renderDashboard()}</div>
    </div>
  );
};

export default DashboardLayout;
