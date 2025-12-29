import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getUserRole } from "./utils/auth";

import Base from "./pages/Base";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/AdminHome";
import Settings from "./pages/Settings";
import Leaderboard from './pages/Leaderboard';
import Reports from "./pages/Reports";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

import PageContainer from "./layout/PageContainer";
import MyShoutouts from "./pages/EmployeeMyShoutouts";
import ResolveReports from "./components/ResolveReports.jsx";
import Admin_UserManagement from "./components/Admin_UserManagement.jsx";
import Admin_SearchFilter from "./components/Admin_SearchFilters.jsx"; 

export default function App() {
  const role = getUserRole();

  return (
    <Router>
      <Routes>
        {/* ---------------------- COMMON ROUTES ---------------------- */}
        <Route path="/" element={<Base />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/leaderboard" element={<Leaderboard role={role} />} />

        {/* ---------------------- ADMIN ROUTES ---------------------- */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute
              element={<AdminHome />}
              allowedRoles={["admin"]}
            />
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              element={<Admin_UserManagement />}
              allowedRoles={["admin"]}
            />
          }
        />

        <Route
          path="/admin/reports/resolve"
          element={
            <ProtectedRoute
              element={<ResolveReports />}
              allowedRoles={["admin"]}
            />
          }
        />

        <Route
          path="/admin/reports/export"
          element={
            <ProtectedRoute
              element={<Admin_SearchFilter />}
              allowedRoles={["admin"]}
            />
          }
        />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute
              element={<h2>Notifications Page</h2>}
              allowedRoles={["admin"]}
            />
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute
              element={<Settings />}
              allowedRoles={["admin"]}
            />
          }
        />

        {/* ---------------------- EMPLOYEE ROUTES ---------------------- */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute
              element={<EmployeeDashboard />}
              allowedRoles={["employee"]}
            />
          }
        />

        {/* ✅ CREATE SHOUTOUT ROUTE */}
        <Route
          path="/user/create"
          element={
            <ProtectedRoute
              element={<CreateShoutout />}
              allowedRoles={["employee"]}
            />
          }
        />

        {/* ---------------------- UNAUTHORIZED ---------------------- */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

        {/* ---------------------- DEFAULT ROUTE ---------------------- */}
        <Route
          path="*"
          element={
            getUserRole() === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/user/home" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
