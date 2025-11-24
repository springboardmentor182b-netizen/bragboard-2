import React, { useState } from "react";
import "./reporting.css";

const ReportingShoutouts = () => {
  // data
  const [shoutouts] = useState([
    {
      message: "Great work bro!",
      reason: "Misuse",
      date: "Nov 18",
      status: "Resolved",
    },
    {
      message: "Excellent presentation",
      reason: "Misuse",
      date: "Nov 15",
      status: "Pending",
    },
    {
      message: "Well done!",
      reason: "Offensive",
      date: "Nov 12",
      status: "Resolved",
    },

    {
      message: "Keep it up!",
      reason: "Spam",
      date: "Nov 20",
      status: "Pending",
    },
    {
      message: "Awesome support from team.",
      reason: "Misuse",
      date: "Nov 10",
      status: "Resolved",
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");

  
  const [selectedShoutout, setSelectedShoutout] = useState(null);
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");

  
  const openModal = (shoutout) => {
    setSelectedShoutout(shoutout);
  };

  const closeModal = () => {
    setSelectedShoutout(null);
    setReason("");
    setComments("");
  };

  const submitReport = () => {
    alert("Report submitted successfully!");
    closeModal();
  };

  // helper: filter shoutouts using searchTerm
  const filtered = shoutouts.filter((s) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true; // empty search => show all
    return (
      (s.message || "").toLowerCase().includes(q) ||
      (s.reason || "").toLowerCase().includes(q) ||
      (s.status || "").toLowerCase().includes(q) ||
      (s.date || "").toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="reporting-container">
        <h2 className="page-title">Reporting Shoutouts</h2>

        {/* SEARCH INPUT: bound to searchTerm */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search shoutouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search shoutouts"
            className="search-input"
          />
        </div>

        {/* TABLE: use filtered array */}
        <table className="report-table">
          <thead>
            <tr>
              <th>Shoutout</th>
              <th>Reason</th>
              <th>Date Reported</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s, index) => (
              <tr key={index}>
                <td>{s.message}</td>
                <td>{s.reason}</td>
                <td>{s.date}</td>
                <td
                  className={
                    s.status === "Resolved"
                      ? "status-resolved"
                      : "status-pending"
                  }
                >
                  {s.status}
                </td>
                <td>
                  <button className="report-btn" onClick={() => openModal(s)}>
                    Report
                  </button>
                </td>
              </tr>
            ))}

            {/* optional: show message when no results */}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "16px", color: "#666" }}>
                  No shoutouts found for “{searchTerm}”
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedShoutout && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Report Shoutout</h3>

            <p>
              <strong>Shoutout:</strong> {selectedShoutout.message}
            </p>

            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="">Select Reason</option>
              <option value="Spam">Spam</option>
              <option value="Misuse">Misuse</option>
              <option value="Offensive">Offensive</option>
            </select>

            <textarea
              rows="4"
              placeholder="Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="submit-btn" onClick={submitReport}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportingShoutouts;
