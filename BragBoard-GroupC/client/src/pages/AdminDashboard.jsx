import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import Leaderboard from '../components/Leaderboard';
import Analytics from '../components/Analytics';
import UserManagement from '../components/UserManagement';
import SearchFilters from '../components/SearchFilters';

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
            </div>
            <div className="dashboard-content">
              <Analytics />
              <Leaderboard />
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="section-content">
            <h2>User Management</h2>
            <UserManagement />
          </div>
        );
      case 'reports':
        return (
          <div className="reports-section">
            <div className="reports-header">
              <h2>Reports Management</h2>
            </div>
            <SearchFilters />
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
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="main-content">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        {renderMainContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;