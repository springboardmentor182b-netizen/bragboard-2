import React, { useState } from 'react';

const AdminNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav style={styles.navbar}>
      <div style={styles.searchContainer}>
        <i className="fa-solid fa-search" style={styles.searchIcon}></i>
        <input 
          type="text" 
          placeholder="Search shoutouts..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
      </div>
      <div style={styles.rightSection}>
        <button style={styles.notificationButton}>
          <i className="fa-solid fa-bell" style={styles.bellIcon}></i>
        </button>
        <div style={styles.divider}></div>
        <div style={styles.userProfile}>
          <div style={styles.userInfo}>
            <div style={styles.userName}>Admin User</div>
            <div style={styles.userRole}>Administrator</div>
          </div>
          <div style={styles.avatar}>AU</div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'white',
    padding: '0 20px',
    height: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '14px'
  },
  searchInput: {
    width: '100%',
    padding: '8px 12px 8px 36px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '13px',
    background: '#f8fafc',
    transition: 'all 0.2s',
    color: '#334155'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  notificationButton: {
    position: 'relative',
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '6px',
    transition: 'all 0.2s'
  },
  bellIcon: {
    fontSize: '18px'
  },
  divider: {
    height: '24px',
    width: '1px',
    background: '#e2e8f0'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '4px 8px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '12px'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  userName: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: '13px'
  },
  userRole: {
    color: '#64748b',
    fontSize: '11px',
    marginTop: '1px'
  }
};

export default AdminNavbar;