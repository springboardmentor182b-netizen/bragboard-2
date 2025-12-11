import React from 'react';

const AdminShoutoutStats = ({ stats }) => {
  return (
    <div className="shoutout-stats">
      <div className="shareholder-header">
        <h2>
          <i className="fa-solid fa-chart-simple"></i>
          Dashboard Overview
        </h2>
        <span className="shareholder-badge">
          Total: {stats.total}
        </span>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>
            <i className="fa-solid fa-check-circle"></i>
            Approved
          </h3>
          <p className="stat-value">{stats.approved}</p>
          <div className="stat-trend trend-up">
            <i className="fa-solid fa-arrow-up"></i>
            <span>+12%</span>
          </div>
        </div>
        <div className="stat-card">
          <h3>
            <i className="fa-solid fa-clock"></i>
            Pending
          </h3>
          <p className="stat-value">{stats.pending}</p>
          <div className="stat-trend trend-up">
            <i className="fa-solid fa-arrow-up"></i>
            <span>+8%</span>
          </div>
        </div>
        <div className="stat-card">
          <h3>
            <i className="fa-solid fa-times-circle"></i>
            Rejected
          </h3>
          <p className="stat-value">{stats.rejected}</p>
          <div className="stat-trend trend-down">
            <i className="fa-solid fa-arrow-down"></i>
            <span>-5%</span>
          </div>
        </div>
        <div className="stat-card">
          <h3>
            <i className="fa-solid fa-users"></i>
            Active Users
          </h3>
          <p className="stat-value">128</p>
          <div className="stat-trend trend-up">
            <i className="fa-solid fa-arrow-up"></i>
            <span>+23%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShoutoutStats;