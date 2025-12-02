import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './features/pages/Dashboard';
import Settings from './features/pages/Settings';
import LoginPage from './features/pages/Login';
import AdminDashboard from './features/pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employee-dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

