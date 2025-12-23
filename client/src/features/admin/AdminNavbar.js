import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, ShieldAlert, FileText } from 'lucide-react';

// --- 1. ADMIN NAVBAR COMPONENT ---
const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <div
          className="text-blue-500 font-bold text-xl flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/admin-dashboard')}
        >
          <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs">B</div>
          BragBoard
        </div>
      </div>

      <div className="flex items-center gap-6 text-gray-400 text-sm font-medium">
        <button
          onClick={() => navigate('/admin-dashboard')}
          className={`flex items-center gap-2 transition-colors ${location.pathname === '/admin-dashboard' ? 'text-blue-400' : 'hover:text-white'}`}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button
          onClick={() => navigate('/admin/moderation')}
          className={`flex items-center gap-2 transition-colors ${location.pathname === '/admin/moderation' ? 'text-blue-400' : 'hover:text-white'}`}
        >
          <ShieldAlert size={18} /> Moderation
        </button>
        <button className="flex items-center gap-2 hover:text-white transition-colors">
          <FileText size={18} /> Reports
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 ml-4 hover:text-white transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
