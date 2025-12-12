import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = ['Dashboard', 'Feed', 'My Shoutouts', 'Leaderboard', 'Settings'];

  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/settings') return 'Settings';
    if (path === '/feed') return 'Feed';
    if (path === '/my-shoutouts') return 'My Shoutouts';
    if (path === '/leaderboard') return 'Leaderboard';
    return 'Dashboard';
  };

  const handleNavClick = (item) => {
    const routeMap = {
      'Dashboard': '/dashboard',
      'Feed': '/feed',
      'My Shoutouts': '/my-shoutouts',
      'Leaderboard': '/leaderboard',
      'Settings': '/settings',
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
        <div className="header-right">
          <button className="logout-button" onClick={handleLogout}>→ Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
