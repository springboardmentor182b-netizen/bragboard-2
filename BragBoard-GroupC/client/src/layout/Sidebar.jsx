import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { key: 'dashboard', label: 'Admin Dashboard' },
    { key: 'users', label: 'Users' },
    { key: 'reports', label: 'Reports' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'settings', label: 'Settings' }
  ];

  const departments = ['HR', 'CyberSecurity', 'Deployment'];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>BragBoard</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map(item => (
            <li key={item.key} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.key ? 'active' : ''}`}
                onClick={() => setActiveSection(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-filters">
        <h3>Filter</h3>
        <ul className="filter-list">
          {departments.map(dept => (
            <li key={dept} className="filter-item">
              <label className="filter-label">
                <input type="checkbox" />
                <span>{dept}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;