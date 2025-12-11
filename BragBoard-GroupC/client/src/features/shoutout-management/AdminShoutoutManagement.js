import React, { useState, useEffect } from 'react';
import AdminShoutoutStats from './components/AdminShoutoutStats';
import AdminShoutoutFilters from './components/AdminShoutoutFilters';
import AdminShoutoutTable from './components/AdminShoutoutTable';
import { fetchShoutouts, deleteShoutout } from './services/adminShoutoutService';
import './AdminShoutoutManagement.css';

const AdminShoutoutManagement = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [filteredShoutouts, setFilteredShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 5,
    approved: 2,
    pending: 2,
    rejected: 1
  });

  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  useEffect(() => {
    loadShoutouts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [shoutouts, statusFilter, dateFilter]);

  const loadShoutouts = async () => {
    try {
      setLoading(true);
      const data = await fetchShoutouts();
      setShoutouts(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error loading shoutouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const approved = data.filter(s => s.status === 'approved').length;
    const pending = data.filter(s => s.status === 'pending').length;
    const rejected = data.filter(s => s.status === 'rejected').length;
    
    setStats({ total, approved, pending, rejected });
  };

  const applyFilters = () => {
    let filtered = [...shoutouts];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(shoutout => shoutout.status === statusFilter);
    }
    
    if (dateFilter) {
      filtered = filtered.filter(shoutout => shoutout.date === dateFilter);
    }
    
    setFilteredShoutouts(filtered);
  };

  const handleDeleteShoutout = async (id) => {
    if (window.confirm('Are you sure you want to delete this shoutout? This action cannot be undone.')) {
      try {
        await deleteShoutout(id);
        setShoutouts(shoutouts.filter(s => s.id !== id));
        alert('Shoutout deleted successfully!');
      } catch (error) {
        alert('Error deleting shoutout: ' + error.message);
      }
    }
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setDateFilter('');
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  const handleRefresh = () => {
    loadShoutouts();
  };

  if (loading) {
    return (
      <div className="shoutout-management">
        <div className="loading">
          <i className="fa-solid fa-spinner fa-spin" style={{marginRight: '8px'}}></i>
          Loading shoutouts...
        </div>
      </div>
    );
  }

  return (
    <div className="shoutout-management">
      <div className="page-header">
        <h1>Shoutout Management</h1>
        <h2>Manage and monitor all shoutouts</h2>
      </div>
      
      <AdminShoutoutStats stats={stats} />
      
      <div className="shoutout-filters">
        <div className="filter-header">
          <h3>
            <i className="fa-solid fa-filter"></i>
            Filter Options
          </h3>
          <div className="filter-actions">
            <button className="export-btn" onClick={handleExport}>
              <i className="fa-solid fa-download"></i>
              Export
            </button>
            <button className="filter-btn" onClick={() => applyFilters()}>
              <i className="fa-solid fa-filter"></i>
              Apply Filters
            </button>
          </div>
        </div>
        
        <AdminShoutoutFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          onReset={handleResetFilters}
        />
      </div>
      
      <div className="shoutout-table-container">
        <div className="table-header">
          <h3>
            <i className="fa-solid fa-table-list"></i>
            All Shoutouts
          </h3>
          <div className="table-actions">
            <button className="refresh-btn" onClick={handleRefresh}>
              <i className="fa-solid fa-rotate"></i>
              Refresh
            </button>
            <button className="add-btn" onClick={() => alert('Add new shoutout functionality')}>
              <i className="fa-solid fa-plus"></i>
              Add New
            </button>
          </div>
        </div>
        
        <AdminShoutoutTable
          shoutouts={filteredShoutouts}
          onDelete={handleDeleteShoutout}
        />
      </div>
    </div>
  );
};

export default AdminShoutoutManagement;