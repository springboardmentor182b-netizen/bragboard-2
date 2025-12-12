import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = "http://127.0.0.1:8000"; // change 8000 to your FastAPI port

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const PEOPLE = ["Alice", "Bob", "Chitra", "David", "Eve", "Francis"];

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Support",
  "Design",
  "Operations",
  "Sales",
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [shoutouts, setShoutouts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipient: "",
    createdBy: "",
    department: "",
    tags: "",
  });

 useEffect(() => {
  if (shoutouts.length === 0) {
    // Pre-fill dummy shoutouts
    const dummyShoutouts = [
      {
        id: 1,
        title: "Great Teamwork!",
        message: "Alice did a fantastic job on the project.",
        recipient: "Alice",
        createdBy: "Bob",
        department: "Engineering",
        tags: ["teamwork", "project"],
        date: new Date().toISOString(),
        flagged: false,
        status: "Active",
      },
      {
        id: 2,
        title: "Marketing Campaign Success",
        message: "The marketing team exceeded their targets.",
        recipient: "Chitra",
        createdBy: "David",
        department: "Marketing",
        tags: ["campaign", "success"],
        date: new Date().toISOString(),
        flagged: false,
        status: "Active",
      },
      {
        id: 3,
        title: "Customer Support Kudos",
        message: "Eve helped resolve a tricky client issue.",
        recipient: "Eve",
        createdBy: "Francis",
        department: "Support",
        tags: ["customer", "support"],
        date: new Date().toISOString(),
        flagged: false,
        status: "Active",
      },
      {
        id: 4,
        title: "Design Appreciation",
        message: "David’s design improved our website UX.",
        recipient: "David",
        createdBy: "Alice",
        department: "Design",
        tags: ["UX", "design"],
        date: new Date().toISOString(),
        flagged: false,
        status: "Active",
      },
      {
        id: 5,
        title: "Operations Excellence",
        message: "Operations handled the launch flawlessly.",
        recipient: "Francis",
        createdBy: "Chitra",
        department: "Operations",
        tags: ["operations", "launch"],
        date: new Date().toISOString(),
        flagged: false,
        status: "Active",
      },
    ];

    setShoutouts(dummyShoutouts);
  }
}, []);

  const totalShoutouts = shoutouts.length;
  const flaggedShoutouts = shoutouts.filter((s) => s.flagged);
  const flaggedCount = flaggedShoutouts.length;

  const departmentCounts = useMemo(() => {
    const counts = {};
    DEPARTMENTS.forEach((d) => (counts[d] = 0));
    shoutouts.forEach((s) => {
      counts[s.department] = (counts[s.department] || 0) + 1;
    });
    return Object.entries(counts).map(([dept, value]) => ({ dept, value }));
  }, [shoutouts]);

  const weeklyActivityData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = Object.fromEntries(days.map((d) => [d, 0]));

    shoutouts.forEach((s) => {
      if (!s.date) return;
      const d = new Date(s.date);
      const jsDay = d.getDay(); // 0=Sun,1=Mon,...6=Sat
      if (jsDay === 0) return; // ignore Sunday
      const label = days[jsDay - 1];
      counts[label] += 1;
    });

    return days.map((name) => ({ name, count: counts[name] }));
  }, [shoutouts]);

  const handleOpenCreate = () => {
    setFormData({
      title: "",
      message: "",
      recipient: "",
      createdBy: "",
      department: "",
      tags: "",
    });
    setShowCreateModal(true);
  };

  const handleCloseCreate = () => {
    if (!isSubmitting) setShowCreateModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateShoutout = (e) => {
  e.preventDefault();
  const newEntry = {
    id: Date.now(),
    title: formData.title,
    message: formData.message,
    recipient: formData.recipient || "—",
    created_by: formData.createdBy || "Unknown",
    department: formData.department || "General",
    tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
    date: new Date().toISOString(),
    flagged: false,
    status: "Active",
  };
  setShoutouts((prev) => [newEntry, ...prev]);
  setFormData({
    title: "",
    message: "",
    recipient: "",
    createdBy: "",
    department: "",
    tags: "",
  });
  setShowCreateModal(false);
};

const handleDelete = (id) => {
  // Simply remove the shoutout from state
  setShoutouts((prev) => prev.filter((s) => s.id !== id));
};

const handleToggleFlag = (id) => {
  setShoutouts((prev) =>
    prev.map((s) =>
      s.id === id
        ? {
            ...s,
            flagged: !s.flagged,
            status: s.flagged ? "Active" : "Flagged",
          }
        : s
    )
  );
};

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="create-shoutout-btn" onClick={handleOpenCreate}>
            + New Shoutout
          </button>
          <button
            className="leaderboard-btn"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Shoutouts</div>
          <div className="stat-value">{totalShoutouts}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Flagged</div>
          <div className="stat-value">{flaggedCount}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Departments</div>
          <div className="stat-value">{DEPARTMENTS.length}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Shoutouts by Department</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Moderation */}
      <div className="moderation-box">
        <h3>Moderation</h3>
        {flaggedCount === 0 ? (
          <div className="empty">No flagged shoutouts.</div>
        ) : (
          flaggedShoutouts.map((s) => (
            <div key={s.id} className="flagged-item">
              <strong>{s.title}</strong>
              <div>By {s.createdBy}</div>
              <button
                className="btn small outline"
                onClick={() => handleToggleFlag(s.id)}
              >
                Unflag
              </button>
              <button
                className="btn small danger"
                onClick={() => handleDelete(s.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* All shoutouts */}
      <div className="all-shoutouts-box">
        <h3>All Shoutouts</h3>
        <table className="shoutouts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Dept</th>
              <th>Created By</th>
              <th>Recipient</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shoutouts.map((s) => (
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.department}</td>
                <td>{s.createdBy}</td>
                <td>{s.recipient || "—"}</td>
                <td>{new Date(s.date).toLocaleString()}</td>
                <td>{s.status || "Active"}</td>
                <td>
                  <button
                    className="btn small outline"
                    onClick={() => handleToggleFlag(s.id)}
                  >
                    {s.flagged ? "Unflag" : "Flag"}
                  </button>
                  <button
                    className="btn small danger"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {shoutouts.length === 0 && (
              <tr>
                <td colSpan={7} className="empty">
                  No shoutouts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Shoutout Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={handleCloseCreate}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create Shoutout</h2>
            <form onSubmit={handleCreateShoutout}>
              <label>
                Title
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Sender
                <select
                  name="createdBy"
                  value={formData.createdBy || ""}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select sender</option>
                  {PEOPLE.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Recipient
                <select
                  name="recipient"
                  value={formData.recipient || ""}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select recipient</option>
                  {PEOPLE.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Department
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleFormChange}
                  placeholder="Optional"
                />
              </label>

              <label>
                Tags
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="Comma separated"
                />
              </label>

              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  className="btn primary small"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
                <button
                  type="button"
                  className="btn small outline"
                  onClick={handleCloseCreate}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
