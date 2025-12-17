import React, { useEffect, useState } from 'react';
import Admin_Sidebar from '../layout/Admin_Sidebar';
import Admin_Header from '../layout/Admin_Header';
import Admin_Leaderboard from '../components/Admin_Leaderboard';
import Admin_Analytics from '../components/Admin_Analytics';
import Admin_UserManagement from '../components/Admin_UserManagement';
import Admin_SearchFilters from '../components/Admin_SearchFilters';
import '../assets/global.css';  
import Ad_exp_report from './Ad_exp_report.css';


export default function App() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/reports", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error(err));
  }, []);

  const exportCSV = () => {
    window.open("http://localhost:8000/reports/export/csv", "_blank");
  };

  const exportPDF = () => {
    window.open("http://localhost:8000/reports/export/pdf", "_blank");
  };

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
        {reports.map((r, index) => (
          <div key={r.id} className="list-item">
            <strong>{index + 1}.</strong>
            <span> Sender: {r.sender_id}</span> |
            <span> Receiver: {r.receiver_id}</span> |
            <span> {r.message}</span> |
            <span> {new Date(r.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>

      <div className="footer">
        <button className="export-btn" onClick={exportCSV}>
          Export CSV
        </button>
        <button className="export-btn" onClick={exportPDF}>
          Export PDF
        </button>
      </div>

    </div>
  );
}