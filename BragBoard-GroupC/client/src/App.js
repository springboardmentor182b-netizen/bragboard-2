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
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ResolveReports from "./components/ResolveReports.jsx";
import ReportHistory from "./components/ReportHistory.jsx";
export default function App() {
  const role = "admin"; 

  return (
    <Router>
      <Routes>

        {/* ---------------------- COMMON ROUTES ---------------------- */}
        <Route path="/" element={<Base />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

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
        {/* ---------------------- USER ROUTES ---------------------- */}
        <Route
          path="/user/home"
          element={ <ProtectedRoute  element={<Home role={role} />} allowedRoles={["user"]} role={role} /> }
        />
        <Route
          path="/user/reports"
          element={ <ProtectedRoute element={<Reports role={role} />}allowedRoles={["user"]}role={role}/> }
        />

        <Route
          path="/user/settings"
          element={<ProtectedRoute element={<Settings role={role} />}allowedRoles={["user"]} role={role} /> }
        />
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
