import React from 'react';

const Admin_Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <div className="user-info">
          <div className="user-details">
            <span className="user-role">Admin User</span>
            <span className="user-role" style={{ fontSize: '11px', color: '#94a3b8' }}>Administrator</span>
          </div>
          <div className="user-avatar">
            <span>AU</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Admin_Header;