import React from 'react';

const Header = ({ searchQuery, setSearchQuery }) => {
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
          <span className="user-role">Admin</span>
          <div className="user-avatar">
            <span>A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
