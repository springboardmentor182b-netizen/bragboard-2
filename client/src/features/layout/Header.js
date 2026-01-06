import { useNavigate, useLocation } from 'react-router-dom';
import NotificationBell from '../components/NotificationBell';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from storage
  const role = localStorage.getItem('role') || sessionStorage.getItem('role');

  const navItems = ['Dashboard', 'My Shoutouts', 'Leaderboard', 'Settings'];
  if (role === 'admin') {
    navItems.push('Admin Dashboard');
  }

  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/Dashboard') return 'Dashboard';
    if (path === '/settings') return 'Settings';
    if (path === '/my-shoutouts') return 'My Shoutouts';
    if (path === '/leaderboard') return 'Leaderboard';
    if (path === '/admin-dashboard') return 'Admin Dashboard';
    return 'Dashboard';
  };

  const handleNavClick = (item) => {
    const routeMap = {
      'Dashboard': '/Dashboard',
      'My Shoutouts': '/my-shoutouts',
      'Leaderboard': '/leaderboard',
      'Settings': '/settings',
      'Admin Dashboard': '/admin-dashboard',
    };
    const route = routeMap[item];
    if (route) {
      navigate(route);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const activePage = getActivePage();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <svg
              className="logo-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
              />
            </svg>
            <span className="logo-text">BragBoard</span>
          </div>
          <nav className="header-nav">
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-link ${activePage === item ? 'active' : ''}`}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className="header-right flex items-center gap-4">
          <NotificationBell />
          <button className="logout-button" onClick={handleLogout}>→ Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

