// ✅ Correct
import React from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboardNew from "./features/pages/AdminDashboardNew";
import Leaderboard from "./features/pages/Leaderboard";
import MyShoutouts from "./features/pages/MyShoutouts";
import Settings from "./features/pages/Settings";
import LoginPage from "./features/pages/Login";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Employee Dashboard */}
          <Route
            path="/employee-dashboard"
            element={<AdminDashboardNew />}
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={<AdminDashboardNew />}
          />

          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-shoutouts" element={<MyShoutouts />} />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
