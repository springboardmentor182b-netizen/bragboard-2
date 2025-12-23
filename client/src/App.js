import MyShoutouts from './features/pages/MyShoutouts';
import Leaderboard from './features/pages/Leaderboard';
import FeedPage from './features/pages/FeedPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './features/pages/Dashboard';
import Settings from './features/pages/Settings';
import LoginPage from './features/pages/Login';
import AdminDashboard from './features/pages/AdminDashboard';
import AdminModeration from './features/pages/AdminModeration';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/moderation" element={<AdminModeration />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-shoutouts" element={<MyShoutouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
