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
          <li className="nav-item">
            <button
              className={`nav-link ${activeSection === 'manage_reports' || activeSection === 'resolve_reports' || activeSection === 'report_history' ? 'active' : ''}`}
              onClick={() => setActiveSection('manage_reports')}
            >
              Manage Reports
            </button>
            { (activeSection === 'manage_reports' || activeSection === 'resolve_reports' || activeSection === 'report_history') && (
              <ul style={{ listStyle: 'none', paddingLeft: '12px', marginTop: '8px' }}>
                <li style={{ marginBottom: '6px' }}>
                  <button
                    className={`nav-link ${activeSection === 'resolve_reports' ? 'active' : ''}`}
                    style={{ paddingLeft: '28px', fontSize: '13px' }}
                    onClick={() => setActiveSection('resolve_reports')}
                  >
                    Resolve Reports
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link ${activeSection === 'report_history' ? 'active' : ''}`}
                    style={{ paddingLeft: '28px', fontSize: '13px' }}
                    onClick={() => setActiveSection('report_history')}
                  >
                    Report History
                  </button>
                </li>
              </ul>
            )}
          </li>

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