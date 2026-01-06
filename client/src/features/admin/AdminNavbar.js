import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, ShieldAlert, FileText } from 'lucide-react';
import NotificationBell from '../components/NotificationBell';

// --- 1. ADMIN NAVBAR COMPONENT ---
const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const NavContent = () => (
    <>
      <button
        onClick={() => { navigate('/admin-dashboard'); setIsMenuOpen(false); }}
        className={`flex items-center gap-2 transition-colors ${location.pathname === '/admin-dashboard' ? 'text-blue-400' : 'hover:text-white'}`}
      >
        <LayoutDashboard size={18} /> Dashboard
      </button>
      <button
        onClick={() => { navigate('/admin/moderation'); setIsMenuOpen(false); }}
        className={`flex items-center gap-2 transition-colors ${location.pathname === '/admin/moderation' ? 'text-blue-400' : 'hover:text-white'}`}
      >
        <ShieldAlert size={18} /> Moderation
      </button>
      <button
        onClick={() => { navigate('/admin/reports'); setIsMenuOpen(false); }}
        className={`flex items-center gap-2 transition-colors ${location.pathname === '/admin/reports' ? 'text-blue-400' : 'hover:text-white'}`}
      >
        <FileText size={18} /> Reports
      </button>

      <div className="flex items-center">
        <NotificationBell />
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 md:ml-4 hover:text-white transition-colors text-red-400"
      >
        <LogOut size={18} /> Logout
      </button>
    </>
  );

  return (
    <nav className="bg-gray-900 border-b border-gray-800 relative z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
          <div
            className="text-blue-500 font-bold text-xl flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/admin-dashboard')}
          >
            <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs">B</div>
            BragBoard
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-gray-400 text-sm font-medium">
          <NavContent />
        </div>

        {/* Mobile Bell (visible on header) */}
        {!isMenuOpen && (
          <div className="md:hidden flex items-center">
            <NotificationBell />
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 border-t border-gray-800 bg-gray-900 flex flex-col gap-6 text-gray-400 text-sm font-medium animate-in slide-in-from-top-2">
          {/* Re-render content mostly for links, but handle bell separately to avoid dupes */}
          <button
            onClick={() => { navigate('/admin-dashboard'); setIsMenuOpen(false); }}
            className={`flex items-center gap-2 p-2 rounded-lg ${location.pathname === '/admin-dashboard' ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-gray-800'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button
            onClick={() => { navigate('/admin/moderation'); setIsMenuOpen(false); }}
            className={`flex items-center gap-2 p-2 rounded-lg ${location.pathname === '/admin/moderation' ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-gray-800'}`}
          >
            <ShieldAlert size={20} /> Moderation
          </button>
          <button
            onClick={() => { navigate('/admin/reports'); setIsMenuOpen(false); }}
            className={`flex items-center gap-2 p-2 rounded-lg ${location.pathname === '/admin/reports' ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-gray-800'}`}
          >
            <FileText size={20} /> Reports
          </button>

          <div className="border-t border-gray-800 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 w-full"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
