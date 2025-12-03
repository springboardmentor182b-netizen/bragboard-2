
import React, { useState } from 'react'; 
const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isReportsExpanded, setIsReportsExpanded] = useState(true);

  const menuItems = [
    { key: 'dashboard', label: 'Admin Dashboard', type: 'link' },
    { key: 'users', label: 'Users', type: 'link' },
    { 
      key: 'manage-reports', 
      label: 'Manage Reports', 
      type: 'parent',
      icon: '📄', 
      children: [
        { key: 'resolve-reports', label: 'Resolve Reports', type: 'sub-link' },
        { key: 'report-history', label: 'Report History', type: 'sub-link' }
      ]
    },
    { key: 'notifications', label: 'Notifications', type: 'link' },
    { key: 'settings', label: 'Settings', type: 'link' }
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
            <React.Fragment key={item.key}>
              <li className="nav-item">
                {item.type === 'parent' ? (
                  <button
                    className={`nav-link ${activeSection.startsWith(item.key) ? 'active' : ''}`}
                    onClick={() => setIsReportsExpanded(!isReportsExpanded)} // Toggle reports submenu
                  >
                    {item.label} {item.icon}
                  </button>
                ) : (
                  <button
                    className={`nav-link ${activeSection === item.key ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.key)}
                  >
                    {item.label}
                  </button>
                )}
              </li>
              {item.type === 'parent' && item.key === 'manage-reports' && isReportsExpanded && (
                <ul className="sub-menu">
                  {item.children.map(child => (
                    <li key={child.key} className="nav-item">
                      <button
                        className={`nav-link ${activeSection === child.key ? 'active' : ''}`}
                        onClick={() => setActiveSection(child.key)}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
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