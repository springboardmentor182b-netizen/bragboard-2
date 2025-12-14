import React, { useState } from 'react';
import Admin_Sidebar from '../layout/Admin_Sidebar';
import Admin_Header from '../layout/Admin_Header';
import Admin_Leaderboard from '../components/Admin_Leaderboard';
import Admin_Analytics from '../components/Admin_Analytics';
import Admin_UserManagement from '../components/Admin_UserManagement';
import Admin_SearchFilters from '../components/Admin_SearchFilters';
import Ad_exp_report from './Ad_exp_report';
import '../assets/global.css';  

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-main">
            <div className="dashboard-header">
              <h1>Welcome to Admin Dashboard!!</h1>
              <p>Monitor and manage your organization's shoutouts and analytics</p>
            </div>
            <div className="dashboard-content">
              <Admin_Analytics />
              <Admin_Leaderboard />
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="section-content">
            <h2>User Management</h2>
            <p>Add, edit, and manage user accounts</p>
            <Admin_UserManagement />
          </div>
        );
      case 'reports':
        return (
          <div className="reports-section">
            <div className="reports-header">
              <h2>Reports Management</h2>
              <p>Search and filter reports</p>
            </div>
            <Admin_SearchFilters />
          </div>
        );
      case 'notifications':
        return (
          <div className="section-content">
            <h2>Notifications</h2>
            <p>Notification settings and preferences will be displayed here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="section-content">
            <h2>Settings</h2>
            <p>System configuration and preferences</p>
          </div>
        );
      default:
        return (
          <div className="dashboard-main">
            <div className="dashboard-header">
              <h1>Welcome to Admin Dashboard!!</h1>
              <p>Monitor and manage your organization's shoutouts and analytics</p>
            </div>
            <div className="dashboard-content">
              <Admin_Analytics />
              <Admin_Leaderboard />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <Admin_Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="main-content">
        <Admin_Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        {renderMainContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;