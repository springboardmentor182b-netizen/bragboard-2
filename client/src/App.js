import MyShoutouts from './features/pages/MyShoutouts';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './features/pages/Dashboard';
import Settings from './features/pages/Settings';
import LoginPage from './features/pages/Login';
import AdminDashboard from './features/pages/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employee-dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-shoutouts" element={<MyShoutouts />} />  
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
