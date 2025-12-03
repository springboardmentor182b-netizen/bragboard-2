import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./Reports.css";

const HISTORY = [
  {
    id: "h1",
    title: "Harassment in shoutout",
    reportedBy: "Neha Sharma",
    target: "Ravi Kumar",
    department: "HR",
    description: "Derogatory language; action taken.",
    createdAt: "2025-10-14T11:00:00Z",
    resolvedAt: "2025-10-15T09:30:00Z",
    resolved: true,
  },
  {
    id: "h2",
    title: "Confidential data posted",
    reportedBy: "Asha Singh",
    target: "Team Alpha",
    department: "Operations",
    description: "Internal screenshot leaked; moderated and removed.",
    createdAt: "2025-09-03T08:20:00Z",
    resolvedAt: "2025-09-04T14:18:00Z",
    resolved: true,
  },
];

export default function ReportHistory() {
  const [items] = useState(HISTORY);

  const exportToExcel = () => {
    const data = items.map((r) => ({
      ID: r.id,
      Title: r.title,
      ReportedBy: r.reportedBy,
      Target: r.target,
      Department: r.department,
      Description: r.description,
      CreatedAt: new Date(r.createdAt).toLocaleString(),
      ResolvedAt: new Date(r.resolvedAt).toLocaleString(),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReportHistory");
    XLSX.writeFile(wb, `ReportHistory_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="reports-page">
      <div className="reports-header-row">
        <h2 className="reports-title">Report History</h2>
        <div>
          <button className="export-btn" onClick={exportToExcel}>Export to Excel</button>
        </div>
      </div>

      <div className="reports-list">
        {items.length === 0 && <div className="empty-text">No history available</div>}

        {items.map((r) => (
          <div key={r.id} className="report-card resolved">
            <div className="report-card-top">
              <div>
                <div className="report-title">{r.title}</div>
                <div className="report-meta">Reported by {r.reportedBy} • {r.department}</div>
              </div>

              <div className="report-actions">
                <span className="resolved-label">Resolved</span>
              </div>
            </div>

            <div className="report-details">
              <p><strong>Target:</strong> {r.target}</p>
              <p><strong>Description:</strong> {r.description}</p>
              <p><strong>Created:</strong> {new Date(r.createdAt).toLocaleString()}</p>
              <p><strong>Resolved:</strong> {new Date(r.resolvedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
