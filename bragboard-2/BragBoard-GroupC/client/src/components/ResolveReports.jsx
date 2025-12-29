// client/src/components/ResolveReports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Modal from "./Modals/Modal";

const ResolveReports = () => {
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
  }, []);

  async function fetchReports() {
    setLoading(true);
    try {
      const url = `http://localhost:8000/api/reporting/admin/all?admin_id=${adminId}&status=pending&page=1&limit=50`;
      const res = await axios.get(url, axiosConfig);
      let fetched = [];
      if (Array.isArray(res.data)) {
        fetched = res.data;
      } else if (res.data && Array.isArray(res.data.reports)) {
        fetched = res.data.reports;
      } else if (res.data && res.data.reports === undefined && res.data.reports !== null) {
        fetched = res.data;
      } else {
        fetched = res.data?.reports ?? [];
      }
      setReports(fetched);
    } catch (err) {
      console.error("Error fetching pending reports:", err);
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

  const markResolved = async (reportId) => {
    const notes = window.prompt("Enter resolution notes (optional):", "");
    if (notes === null) return; 

    try {
      const url = `http://localhost:8000/api/reporting/admin/resolve/${reportId}?admin_id=${adminId}`;
      await axios.patch(url, {
        reporting_status: "resolved",
        admin_resolution_notes: notes || ""
      }, axiosConfig);
      // refresh list
      fetchReports();
    } catch (err) {
      console.error("Error resolving report:", err);
      alert("Failed to mark resolved. See console for details.");
    }
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
      "Reason": r.reporting_reason ?? "",
      "Status": r.reporting_status ?? "",
      "Created At": r.created_at ? new Date(r.created_at).toLocaleString() : "",
      "Resolved At": r.resolved_at ? new Date(r.resolved_at).toLocaleString() : "",
      "Resolution Notes": r.admin_resolution_notes ?? ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ResolveReports");
    XLSX.writeFile(workbook, "ResolveReports.xlsx");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Pending Reports</h3>
        <div>
          <button className="export-btn" onClick={exportToExcel}>Export Excel</button>
        </div>
      </div>

      {loading ? (
        <div>Loading pending reports...</div>
      ) : (
        <div className="reports-grid">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                <th style={{ padding: 8 }}>ID</th>
                <th style={{ padding: 8 }}>Shoutout</th>
                <th style={{ padding: 8 }}>Reporter</th>
                <th style={{ padding: 8 }}>Reason</th>
                <th style={{ padding: 8 }}>Created At</th>
                <th style={{ padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 && (
                <tr><td colSpan={6} style={{ padding: 12 }}>No pending reports found.</td></tr>
              )}
              {reports.map(r => (
                <tr key={r.id} style={{ borderBottom: "1px solid #f1f1f1" }}>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.id}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.shoutout_message}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.reporter_name}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>{r.reporting_reason}</td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>
                    {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
                  </td>
                  <td style={{ padding: 8, verticalAlign: "top" }}>
                    <button style={{ marginRight: 8 }} onClick={() => markResolved(r.id)}>
                      Mark Resolved
                    </button>
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
            <p><strong>Description:</strong> {detailReport.description ?? "—"}</p>
            <p><strong>Status:</strong> {detailReport.reporting_status}</p>
            <p><strong>Created At:</strong> {detailReport.created_at}</p>

            <div style={{ marginTop: 12 }}>
              <button onClick={async () => { closeDetails(); await markResolved(detailReport.id); }} style={{ marginRight: 8 }}>
                Mark Resolved
              </button>
              <button onClick={closeDetails}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ResolveReports;
