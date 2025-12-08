import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import EmployeeLayout from "./EmployeeLayout"; // new import

const DashboardLayout = () => {
  const { role } = useAuth();

  const renderDashboard = () => {
    if (role === "admin") return <AdminDashboard />;
    if (role === "employee") return <EmployeeLayout />;
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px 0 0 0" }}>{renderDashboard()}</div>
    </div>
  );
};

export default DashboardLayout;

