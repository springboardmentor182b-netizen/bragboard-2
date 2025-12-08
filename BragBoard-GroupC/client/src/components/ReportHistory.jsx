// client/src/components/ReportHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Modal from "./Modals/Modal";

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailReport, setDetailReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const adminId = localStorage.getItem("admin_id") || 1;
  const token = localStorage.getItem("token") || null;
  const axiosConfig = {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, []);

  async function fetchReports() {
    setLoading(true);
    try {
      const url = `http://localhost:8000/api/reporting/admin/all?admin_id=${adminId}&status=resolved&page=1&limit=100`;
      const res = await axios.get(url, axiosConfig);
      let fetched = [];
      if (Array.isArray(res.data)) fetched = res.data;
      else fetched = res.data?.reports ?? [];
      setReports(fetched);
    } catch (err) {
      console.error("Error fetching resolved reports:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  const openDetails = (r) => {
    setDetailReport(r);
    setShowModal(true);
  };

  const closeDetails = () => {
    setDetailReport(null);
    setShowModal(false);
  };

  const exportToExcel = () => {
    if (!reports || reports.length === 0) {
      alert("No reports to export.");
      return;
    }

    const rows = reports.map(r => ({
      "Report ID": r.id ?? "",
      "Shoutout ID": r.shoutout_id ?? "",
      "Shoutout Message": r.shoutout_message ?? "",
      "Reporter": r.reporter_name ?? "",
      "Status": r.reporting_status ?? "",
      "Resolved By": r.resolver_name ?? "",
      "Resolution Notes": r.admin_resolution_notes ?? "",
      "Created At": r.created_at ? new Date(r.created_at).toLocaleString() : "",
      "Resolved At": r.resolved_at ? new Date(r.resolved_at).toLocaleString() : ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ReportHistory");
    XLSX.writeFile(workbook, "ReportHistory.xlsx");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Report History (Resolved)</h3>
        <div>
          <button className="export-btn" onClick={exportToExcel}>Export Excel</button>
        </div>
      </div>

      {loading ? (
        <div>Loading resolved reports...</div>
      ) : (
        <div className="reports-grid">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                <th style={{ padding: 8 }}>ID</th>
                <th style={{ padding: 8 }}>Shoutout</th>
                <th style={{ padding: 8 }}>Reporter</th>
                <th style={{ padding: 8 }}>Resolved By</th>
                <th style={{ padding: 8 }}>Resolved At</th>
                <th style={{ padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 && (
                <tr><td colSpan={6} style={{ padding: 12 }}>No resolved reports found.</td></tr>
              )}
              {reports.map(r => (
                <tr key={r.id} style={{ borderBottom: "1px solid #f1f1f1" }}>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.id}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.shoutout_message}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.reporter_name}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.resolver_name}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>
                    {r.resolved_at ? new Date(r.resolved_at).toLocaleString() : ""}
                  </td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>
                    <button onClick={() => openDetails(r)}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && detailReport && (
        <Modal onClose={closeDetails}>
          <div>
            <h3>Report #{detailReport.id}</h3>
            <p><strong>Shoutout:</strong></p>
            <p style={{ whiteSpace: "pre-wrap" }}>{detailReport.shoutout_message}</p>

            <p><strong>Reporter:</strong> {detailReport.reporter_name}</p>
            <p><strong>Reason:</strong> {detailReport.reporting_reason}</p>
            <p><strong>Resolution Notes:</strong> {detailReport.admin_resolution_notes ?? "—"}</p>
            <p><strong>Resolved At:</strong> {detailReport.resolved_at ?? "—"}</p>

            <div style={{ marginTop: 12 }}>
              <button onClick={closeDetails}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReportHistory;
