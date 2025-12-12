import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpVerify from "./pages/OtpVerify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

export default function App() {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role"); // store role when logging in

  return (
    <Router>
      <Routes>

        {/* AUTH SCREENS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* DASHBOARDS */}
        <Route
          path="/admin-dashboard"
          element={
            token && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/employee-dashboard"
          element={
            token && role === "employee" ? (
              <EmployeeDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
