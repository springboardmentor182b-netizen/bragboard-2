import React, { useState, useEffect, useMemo } from "react";
import "../pages/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/**
 * AdminDashboard.jsx
 * - Shows charts (weekly activity / by-department)
 * - Shows moderation list (flagged shoutouts)
 * - Full shoutouts table
 * - Create shoutout modal/form
 * - Delete shoutout support
 *
 * NOTE: adapt API payload keys if your backend uses different names.
 */

const API_URL = "http://localhost:8000";
const DEMO_USERS = [
  { id: 1, name: "Alice", department: "Engineering" },
  { id: 2, name: "Bob", department: "Marketing" },
  { id: 3, name: "Chitra", department: "Support" },
  { id: 4, name: "David", department: "Design" },
  { id: 5, name: "Eve", department: "Operations" },
];


export default function AdminDashboard() {
  const [shoutouts, setShoutouts] = useState([]);
  const [users] = useState(DEMO_USERS); // list of users for form/select
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create modal state
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    sender_id: "", // will be user id
    recipient_id: "", // single recipient for simplicity; change to array if needed
    department: "",
    tags: "", // comma separated
  });

  // Fetch users and shoutouts
  useEffect(() => {
    loadShoutouts();
    // eslint-disable-next-line
  }, []);


  async function loadShoutouts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/shoutouts`);
      if (!res.ok) throw new Error("Failed to fetch shoutouts");
      const data = await res.json();
      // Ensure created_at is valid date; backend should provide ISO strings
      setShoutouts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this shoutout?")) return;
    try {
      const res = await fetch(`${API_URL}/shoutouts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Delete failed");
      }
      // remove locally
      setShoutouts((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.message || err));
    }
  }

  // Create shoutout
  async function handleCreate(e) {
    e.preventDefault();
    // basic validation
    if (!form.title || !form.message) {
      alert("Please add title and message");
      return;
    }

    // tags -> array
    const tagsArray = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // pick the selected sender from DEMO_USERS
const senderUser = users.find(
  (u) => String(u.id) === String(form.sender_id)
);

const createPayload = {
  title: form.title,
  description: form.message, // backend expects "description"
  department: form.department || (senderUser?.department ?? "Unknown"),
  created_by: senderUser ? senderUser.name : "Unknown", // backend expects "created_by"
  is_flagged: false,
};

    try {
      const res = await fetch(`${API_URL}/shoutouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createPayload),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to create shoutout");
      }
      const newShoutout = await res.json();
      // If backend returns created object, append it; otherwise reload list
      if (newShoutout && newShoutout.id) {
        setShoutouts((prev) => [newShoutout, ...prev]);
      } else {
        await loadShoutouts();
      }
      setShowCreate(false);
      setForm({ title: "", message: "", sender_id: "", recipient_id: "", department: "", tags: "" });
    } catch (err) {
      alert("Create failed: " + (err.message || err));
    }
  }

  // flagged list
  const flagged = useMemo(() => shoutouts.filter((s) => s.is_flagged), [shoutouts]);

  // weekly activity chart (Mon..Sun)
  const weeklyData = useMemo(() => {
    const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    shoutouts.forEach((s) => {
      if (!s.created_at) return;
      const d = new Date(s.created_at);
      if (isNaN(d)) return;
      const day = map[d.getDay()];
      if (counts[day] !== undefined) counts[day] += 1;
    });
    // keep Mon->Sun order
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({ day: d, count: counts[d] || 0 }));
  }, [shoutouts]);

  // department chart
  const deptData = useMemo(() => {
    const counts = {};
    shoutouts.forEach((s) => {
      const dept = (s.department && s.department.trim()) || "Unknown";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [shoutouts]);

  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="btn primary" onClick={() => { loadShoutouts(); fetchUsers(); }}>
            🔄 Refresh
          </button>
          <button className="btn" onClick={() => setShowCreate(true)}>＋ New Shoutout</button>
        </div>
      </header>

      {error && <div className="error-banner">Error: {error}</div>}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Shoutouts</div>
          <div className="stat-value">{shoutouts.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Flagged</div>
          <div className="stat-value">{flagged.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Departments</div>
          <div className="stat-value">{new Set(shoutouts.map((s) => (s.department || "Unknown"))).size}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Users (fetched)</div>
          <div className="stat-value">{users.length}</div>
        </div>
      </section>

      <section className="charts-section">
        <div className="chart-card">
          <h3>Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Shoutouts by Department</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#16a34a" animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="moderation-box">
        <div className="moderation-header">
          <h3>Moderation</h3>
          <button className="btn outline">Pending reports ({flagged.length})</button>
        </div>

        {flagged.length === 0 ? (
          <div className="empty">No flagged shoutouts.</div>
        ) : (
          <div className="flagged-list">
            {flagged.map((f) => (
              <div className="flagged-item" key={f.id}>
                <div>
                  <strong>{f.title}</strong>
                  <div className="muted">By: {f.created_by || f.sender_id || "Unknown"}</div>
                </div>
                <div className="flagged-actions">
                  <button className="btn danger" onClick={() => handleDelete(f.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="all-shoutouts-box">
        <h3>All Shoutouts</h3>

        <div className="table-wrapper">
          {loading ? (
            <div className="empty">Loading shoutouts…</div>
          ) : shoutouts.length === 0 ? (
            <div className="empty">No shoutouts found.</div>
          ) : (
            <table className="shoutouts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Dept</th>
                  <th>Created By</th>
                  <th>Recipients</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shoutouts.map((s) => (
                  <tr key={s.id}>
                    <td className="title-col">{s.title}</td>
                    <td>{s.department || "N/A"}</td>
                    <td>{s.created_by || s.sender_name || s.sender_id || "N/A"}</td>
                    <td>
                      {Array.isArray(s.recipients) && s.recipients.length > 0
                        ? s.recipients.map((r) => r.name || r.id).join(", ")
                        : s.recipient_names || "—"}
                    </td>
                    <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : "—"}</td>
                    <td>
                      <span className={`status-pill ${s.is_flagged ? "flagged" : "active"}`}>
                        {s.is_flagged ? "Flagged" : "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn small" onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Create modal */}
      {showCreate && (
        <div className="modal-backdrop" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create Shoutout</h3>
            <form onSubmit={handleCreate} className="create-form">
              <label>
                Title
                <input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  required
                />
              </label>

              <label>
                Sender (created by)
                <select
                  value={form.sender_id}
                  onChange={(e) => setForm((p) => ({ ...p, sender_id: e.target.value }))}
                >
                  <option value="">(none)</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — {u.department || "N/A"}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Recipient
                <select
                  value={form.recipient_id}
                  onChange={(e) => setForm((p) => ({ ...p, recipient_id: e.target.value }))}
                >
                  <option value="">(none)</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Department
                <input
                  value={form.department}
                  onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                />
              </label>

              <label>
                Tags (comma separated)
                <input
                  value={form.tags}
                  onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                />
              </label>

              <div className="form-actions">
                <button type="button" className="btn outline" onClick={() => setShowCreate(false)}>
                  Cancel
                </button>
                <button className="btn primary" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
