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

export default function App() {
  const role = "user"; // change to "user" to test user view

  return (
    <Router>
      <Routes>
        {role === "admin" ? (
          <>
            <Route path="/home" element={<AdminHome role={role} />} />
            <Route path="/leaderboard" element={<Leaderboard role={role} />} />
            <Route path="/reports" element={<Reports role={role} />} />
            <Route path="/settings" element={<Settings role={role} />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home role={role} />} />
            <Route path="/leaderboard" element={<Leaderboard role={role} />} />
            <Route path="/reports" element={<Reports role={role} />} />
            <Route path="/settings" element={<Settings role={role} />} />
          </>
        )}
        <Route path="*" element={role === "admin" ? <AdminHome role={role} /> : <Home role={role} />} />
      </Routes>
    </Router>
  );
}
