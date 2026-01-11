import { useState, useEffect } from 'react';
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <button
            className="hamburger-menu md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>

          <div className="logo" onClick={() => navigate('/Dashboard')} style={{ cursor: 'pointer' }}>
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

          {/* Desktop Nav */}
          <nav className="header-nav desktop-nav">
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
          <button className="logout-button hidden md:block" onClick={handleLogout}>→ Logout</button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-content">
          {navItems.map((item) => (
            <button
              key={item}
              className={`mobile-nav-link ${activePage === item ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
          <div className="mobile-nav-divider"></div>
          <button className="mobile-nav-link logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

