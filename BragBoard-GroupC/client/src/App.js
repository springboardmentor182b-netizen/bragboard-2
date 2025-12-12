import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Base from "./pages/Base";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/EmpHome";
import AdminHome from "./pages/AdminHome";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Leaderboard from './pages/Leaderboard'; 
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

import PageContainer from "./layout/PageContainer";
import MyShoutouts from "./pages/EmployeeMyShoutouts";
import ResolveReports from "./components/ResolveReports.jsx";
import ReportHistory from "./components/ReportHistory.jsx";

export default function App() {
  const role = "user"; 

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
        <Route path="/admin/home"
          element={ <ProtectedRoute element={<AdminHome role={role} />}allowedRoles={["admin"]}role={role}/>}
        />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard role={role} />} allowedRoles={["admin"]} role={role}/>}
        />
        <Route
          path="/admin/reports/resolve"
          element={<ProtectedRoute element={<ResolveReports role={role} />} allowedRoles={["admin"]} role={role} />}
        />
       <Route
          path="/admin/reports/history"
          element={ <ProtectedRoute element={<ReportHistory role={role} />} allowedRoles={["admin"]} role={role}/>}
        />
        <Route
          path="/admin/reports"
          element={ <ProtectedRoute  element={<Reports role={role} />}  allowedRoles={["admin"]} role={role} />}
        />
        <Route
          path="/admin/settings"
          element={ <ProtectedRoute element={<Settings role={role} />} allowedRoles={["admin"]} role={role} />}
        />


        {/* ---------------- USER DASHBOARD LAYOUT ---------------- */}
      <Route
  path="/user"
  element={
    <ProtectedRoute
      element={<PageContainer role={role} />}
      allowedRoles={["user"]}
      role={role}
    />
  }
>
  <Route path="home" element={<Home role={role} />} />
  <Route path="reports" element={<Reports role={role} />} />
  <Route path="settings" element={<Settings role={role} />} />
  <Route path="my-shoutouts" element={<MyShoutouts role={role} />} />
</Route>

        {/* ---------------------- UNAUTHORIZED ---------------------- */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        {/* ---------------------- DEFAULT ROUTE ---------------------- */}
        <Route
          path="*"
          element={role === "admin" ? <AdminHome role={role} /> : <Home role={role} />}
        />
      </Routes>
    </Router>
  );
}
