import React, { useState } from "react";
import ShoutoutCard from "../components/ShoutoutCard";
import "../assets/global.css";

const ReportShoutout = ({ shoutout, onCancel }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // ✅ Fixed API path: router.post("/submit") + employee_id query
      const res = await fetch(
        `http://localhost:8000/api/reporting/submit?employee_id=1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shoutout_id: shoutout.id,
            reporting_reason: reason,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to submit report");
      }

      setSuccess("🚨 Report submitted successfully");
      setReason("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-wrapper">
      {/* SHOUTOUT PREVIEW */}
      <div className="report-preview">
        <h3>Reported Shoutout</h3>
        <ShoutoutCard shoutout={shoutout} />
      </div>

      {/* REPORT FORM */}
      <div className="report-card">
        <h2>Report Shoutout</h2>
        <p className="report-subtitle">
          Tell us why this shoutout violates guidelines
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reporting reason..."
            required
          />

          {error && <div className="error-text">{error}</div>}
          {success && <div className="success-text">{success}</div>}

          <div className="report-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" disabled={loading} className="btn-danger">
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportShoutout;
