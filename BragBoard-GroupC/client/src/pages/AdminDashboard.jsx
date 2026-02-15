import React, { useState } from 'react';
import Admin_Sidebar from '../layout/Admin_Sidebar';
import Admin_Header from '../layout/Admin_Header';
import Admin_Leaderboard from '../components/Admin_Leaderboard';
import Admin_Analytics from '../components/Admin_Analytics';
import '../assets/global.css';  

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Admin_Sidebar />

      <div className="main-content">
        <Admin_Header />

        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>Welcome to Admin Dashboard</h1>
            <p>Monitor and manage your organization</p>
          </div>

          <div className="dashboard-content">
            <Admin_Analytics />
            <Admin_Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;