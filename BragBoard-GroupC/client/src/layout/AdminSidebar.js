import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const [hoverItem, setHoverItem] = useState(null);
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'fa-solid fa-chart-line' },
    { name: 'Shoutouts', path: '/admin/shoutouts', active: true, icon: 'fa-solid fa-bullhorn' },
    { name: 'Users', path: '/admin/users', icon: 'fa-solid fa-users' },
    { name: 'Reports', path: '/admin/reports', icon: 'fa-solid fa-chart-bar' },
    { name: 'Settings', path: '/admin/settings', icon: 'fa-solid fa-gear' },
  ];

  const getMenuItemStyle = (item) => {
    const isActive = location.pathname === item.path || item.active;
    const isHovered = hoverItem === item.name;
    
    let style = { ...styles.menuLink };
    
    if (isActive) {
      Object.assign(style, styles.activeLink);
    }
    
    if (isHovered && !isActive) {
      Object.assign(style, styles.hoverLink);
    }
    
    return style;
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>BragBoard</h1>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.menuList}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || item.active;
            return (
              <li 
                key={item.name} 
                style={styles.menuItem}
                onMouseEnter={() => setHoverItem(item.name)}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Link 
                  to={item.path} 
                  style={getMenuItemStyle(item)}
                >
                  <i 
                    className={item.icon} 
                    style={{
                      ...styles.menuIcon,
                      ...(isActive ? styles.activeIcon : {})
                    }} 
                  />
                  <span style={styles.menuText}>{item.name}</span>
                  {isActive && (
                    <div style={styles.activeIndicator}></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    background: 'white',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    color: '#64748b',
    borderRight: '1px solid #e2e8f0',
    zIndex: 1000
  },
  logoContainer: {
    padding: '20px 16px',
    borderBottom: '1px solid #e2e8f0',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.3px'
  },
  nav: {
    padding: '20px 0',
    flex: 1
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  menuItem: {
    margin: 0
  },
  menuLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    position: 'relative',
    margin: '4px 0'
  },
  activeLink: {
    background: '#f1f5f9',
    color: '#667eea',
    fontWeight: '600',
    borderRight: '3px solid #667eea'
  },
  hoverLink: {
    background: '#f8fafc',
    color: '#475569'
  },
  menuIcon: {
    marginRight: '12px',
    fontSize: '16px',
    color: '#94a3b8',
    width: '20px',
    textAlign: 'center'
  },
  activeIcon: {
    color: '#667eea'
  },
  menuText: {
    flex: 1
  },
  activeIndicator: {
    position: 'absolute',
    right: '16px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#667eea'
  }
};

export default AdminSidebar;