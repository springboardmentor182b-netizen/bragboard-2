import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reports.css";

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="report-page">
      <h1 className="page-title">Manage Reports</h1>

      <div className="reports-actions">
        <button className="action-card" onClick={() => navigate("/admin/resolve-reports")}>
          Resolve Reports
        </button>

        <button className="action-card" onClick={() => navigate("/admin/report-history")}>
          Report History
        </button>
      </div>
    </div>
  );
}
