import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./Reports.css";

const SAMPLE = [
  {
    id: "r1",
    title: "Inappropriate content in shoutout",
    reportedBy: "Sakshi Patel",
    target: "Pranjali Randive",
    department: "Design",
    description:
      "Contains personal info and sensitive screenshot — needs review.",
    createdAt: "2025-11-28T10:12:00Z",
    resolved: false,
  },
  {
    id: "r2",
    title: "Spam shoutout",
    reportedBy: "Arjun Mehta",
    target: "John Doe",
    department: "Development",
    description: "Repeated promotional content in multiple shoutouts.",
    createdAt: "2025-11-30T09:40:00Z",
    resolved: false,
  },
];

export default function ResolveReports() {
  const [reports, setReports] = useState(SAMPLE);
  const [expanded, setExpanded] = useState(null);

  const markResolved = (id) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, resolved: true } : r)));
    if (expanded === id) setExpanded(null);
  };

  const exportToExcel = () => {
    const data = reports.map((r) => ({
      ID: r.id,
      Title: r.title,
      ReportedBy: r.reportedBy,
      Target: r.target,
      Department: r.department,
      Description: r.description,
      CreatedAt: new Date(r.createdAt).toLocaleString(),
      Resolved: r.resolved ? "Yes" : "No",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ResolveReports");
    XLSX.writeFile(wb, `ResolveReports_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="reports-page">
      <div className="reports-header-row">
        <h2 className="reports-title">Resolve Reports</h2>
        <div>
          <button className="export-btn" onClick={exportToExcel}>Export to Excel</button>
        </div>
      </div>

      <div className="reports-list">
        {reports.length === 0 && <div className="empty-text">No pending reports</div>}

        {reports.map((r) => (
          <div key={r.id} className={`report-card ${r.resolved ? "resolved" : ""}`}>
            <div className="report-card-top">
              <div>
                <div className="report-title">{r.title}</div>
                <div className="report-meta">Reported by {r.reportedBy} • {r.department}</div>
              </div>

              <div className="report-actions">
                <button
                  className="view-btn"
                  onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                >
                  {expanded === r.id ? "Hide" : "View"}
                </button>

                {!r.resolved ? (
                  <button className="resolve-btn" onClick={() => markResolved(r.id)}>
                    Mark Resolved
                  </button>
                ) : (
                  <span className="resolved-label">Resolved</span>
                )}
              </div>
            </div>

            {expanded === r.id && (
              <div className="report-details">
                <p><strong>Target:</strong> {r.target}</p>
                <p><strong>Description:</strong> {r.description}</p>
                <p><strong>Created:</strong> {new Date(r.createdAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
