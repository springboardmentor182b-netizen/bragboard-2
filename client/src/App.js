// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboardNew from "./features/pages/AdminDashboardNew";
import Leaderboard from "./features/pages/Leaderboard";
import MyShoutouts from "./features/pages/MyShoutouts";
import Settings from "./features/pages/Settings";
import LoginPage from "./features/pages/Login";
import Dashboard from "./features/pages/Dashboard"; // employee dashboard
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Employee Dashboard */}
          <Route path="/employee-dashboard" element={<Dashboard />} />

          {/* Admin Dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboardNew />} />

          {/* Leaderboard */}
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* Other pages */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-shoutouts" element={<MyShoutouts />} />

          {/* Default: redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
