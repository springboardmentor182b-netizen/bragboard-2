import React, { useState } from 'react';
import Admin_Sidebar from '../layout/Admin_Sidebar';
import Admin_Header from '../layout/Admin_Header';
import Admin_Leaderboard from '../components/Admin_Leaderboard';
import Admin_Analytics from '../components/Admin_Analytics';
import Admin_UserManagement from '../components/Admin_UserManagement';
import Admin_SearchFilters from '../components/Admin_SearchFilters';
import '../assets/global.css';  
import Ad_exp_report from './Ad_exp_report.css';


export default function App() {
  return (
    <div className="page">

      <div className="search-wrapper">
        <div className="search-bar">
          <span className="label">Search:</span>
          <button className="chip">By Date</button>
          <button className="chip">By Department ID</button>
          <button className="chip">By Team ID</button>
          <button className="chip">By Employee ID</button>
        </div>
      </div>

      <div className="list-container">
        <div className="list-item">1.</div>
        <div className="list-item">2.</div>
        <div className="list-item">3.</div>
      </div>

      <div className="footer">
        <button className="export-btn">Export in .xlsx</button>
      </div>

    </div>
  );
}
