import React from 'react';

const AdminShoutoutFilters = ({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  onReset
}) => {
  return (
    <>
      <div className="filter-row">
        <div className="filter-group">
          <label>
            <i className="fa-solid fa-filter"></i>
            Status
          </label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>
            <i className="fa-solid fa-calendar"></i>
            Date
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-date"
            placeholder="Select date"
          />
        </div>
        
        <div className="filter-group">
          <label>
            <i className="fa-solid fa-user"></i>
            Sender
          </label>
          <select 
            className="filter-select"
          >
            <option value="all">All Senders</option>
            <option value="naveen">Naveen</option>
            <option value="sai">Sai</option>
            <option value="madhu">Madhu</option>
            <option value="john">John</option>
            <option value="emma">Emma</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>
            <i className="fa-solid fa-user-check"></i>
            Receiver
          </label>
          <select 
            className="filter-select"
          >
            <option value="all">All Receivers</option>
            <option value="raghu">Raghu</option>
            <option value="lokesh">Lokesh</option>
            <option value="sham">Sham</option>
            <option value="alice">Alice</option>
            <option value="david">David</option>
          </select>
        </div>
      </div>
      
      <button 
        onClick={onReset}
        className="reset-btn"
      >
        <i className="fa-solid fa-rotate-left"></i>
        Reset Filters
      </button>
    </>
  );
};

export default AdminShoutoutFilters;