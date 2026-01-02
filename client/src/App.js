import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './features/pages/Dashboard';
import Settings from './features/pages/Settings';
import LoginPage from './features/pages/Login';
import FeedPage from './features/pages/FeedPage';
import MyShoutouts from './features/pages/MyShoutouts';
import Leaderboard from './features/pages/Leaderboard';

import AdminDashboard from './features/pages/AdminDashboard';
import AdminModeration from './features/pages/AdminModeration';
import AdminReports from './features/pages/AdminReports';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* User Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/my-shoutouts" element={<MyShoutouts />} />
          <Route path="/settings" element={<Settings />} />

          {/* Admin Pages */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/moderation" element={<AdminModeration />} />
          <Route path="/admin/reports" element={<AdminReports />} />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
