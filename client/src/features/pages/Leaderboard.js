import React, { useEffect, useMemo, useState } from "react";
import "./Leader.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";


/* -------------------------
  CONFIG: points rules
--------------------------------*/
const BASE_POINTS = 10;
const TAG_BONUS = 2;
const SPECIAL_TAGS = {
  leadership: 10,
  teamwork: 10,
  innovation: 8,
};

/* -------------------------
  Helper: calculate points
--------------------------------*/
function calculatePoints(entry) {
  let points = (entry.shoutouts || 0) * BASE_POINTS;
  const tags = entry.tags || [];
  points += tags.length * TAG_BONUS;
  for (const t of tags) {
    const key = t.toLowerCase();
    if (SPECIAL_TAGS[key]) points += SPECIAL_TAGS[key];
  }
  return points;
}

/* -------------------------
  Mini popup component
--------------------------------*/
function MiniPerformancePopup({ onClose, weekly }) {
  const data =
    weekly?.map((v, i) => ({ name: `W${i + 1}`, value: v })) || [];

  return (
    <div className="mini-popup-backdrop" onClick={onClose}>
      <div className="mini-popup" onClick={(e) => e.stopPropagation()}>
        <h4>Recent Performance</h4>
        <div style={{ width: "320px", height: "160px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ textAlign: "right", marginTop: 10 }}>
          <button className="btn small outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
  Leaderboard Page
--------------------------------*/
export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("points");
  const [departFilters, setDepartFilters] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [currentUserId] = useState(1); // replace with real logged-in user id

  // TODO: replace with real fetch to backend, e.g. GET /leaderboard
  useEffect(() => {
    // example structure if you fetch data:
    // fetch("http://127.0.0.1:5000/leaderboard")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const computed = data.map((r) => ({
    //       ...r,
    //       points: calculatePoints(r),
    //     }));
    //     setEntries(computed);
    //   });
  }, []);

  const allDepartments = useMemo(() => {
    const set = new Set(entries.map((e) => e.department));
    return Array.from(set);
  }, [entries]);

  const visible = useMemo(() => {
    let arr = [...entries];

    if (departFilters.length > 0) {
      arr = arr.filter((e) => departFilters.includes(e.department));
    }

    const q = search.trim().toLowerCase();
    if (q) {
      arr = arr.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "points":
        arr.sort((a, b) => b.points - a.points);
        break;
      case "shoutouts":
        arr.sort((a, b) => b.shoutouts - a.shoutouts);
        break;
      case "name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "dept":
        arr.sort((a, b) => a.department.localeCompare(b.department));
        break;
      default:
        break;
    }
    return arr;
  }, [entries, search, sortBy, departFilters]);

  const yourRank = useMemo(() => {
    if (!currentUserId) return null;
    const sorted = [...entries].sort((a, b) => b.points - a.points);
    const idx = sorted.findIndex((e) => e.userId === currentUserId);
    if (idx === -1) return null;
    return { rank: idx + 1, entry: sorted[idx], sorted };
  }, [entries, currentUserId]);

  const exportCSV = () => {
    const headers = ["Rank", "Name", "Department", "Shoutouts", "Points"];
    const rows = visible.map((e, i) => [
      i + 1,
      e.name,
      e.department,
      e.shoutouts,
      e.points,
    ]);
    const csvContent = [headers, ...rows]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "leaderboard.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(18);
    doc.text("Leaderboard", 14, 20);
    doc.setFontSize(11);

    const startY = 28;
    const rowHeight = 8;
    const marginLeft = 14;

    const headers = ["Rank", "Name", "Department", "Shoutouts", "Points"];
    headers.forEach((h, idx) =>
      doc.text(h, marginLeft + idx * 40, startY)
    );

    visible.slice(0, 40).forEach((e, i) => {
      const y = startY + rowHeight * (i + 1);
      const vals = [
        i + 1,
        e.name,
        e.department,
        String(e.shoutouts),
        String(e.points),
      ];
      vals.forEach((v, idx) =>
        doc.text(v, marginLeft + idx * 40, y)
      );
    });

    doc.save("leaderboard.pdf");
  };

  const toggleDept = (d) => {
    setDepartFilters((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const medals = (rank) => {
    if (rank === 1) return <span className="medal gold">🥇</span>;
    if (rank === 2) return <span className="medal silver">🥈</span>;
    if (rank === 3) return <span className="medal bronze">🥉</span>;
    return null;
  };

  return (
    <div className="page-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="page-title">Leaderboard</h1>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Search name / dept / tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #08090aff",
            }}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="small-select"
          >
            <option value="points">Sort: Highest points</option>
            <option value="shoutouts">Sort: Most shoutouts</option>
            <option value="name">Sort: Name A–Z</option>
            <option value="dept">Sort: Department</option>
          </select>

          <button className="btn small outline" onClick={exportCSV}>
            Export CSV
          </button>
          <button className="btn small outline" onClick={exportPDF}>
            Export PDF
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 15, color: "#13161bff" }}>Departments:</div>
        {allDepartments.map((d) => (
          <button
            key={d}
            onClick={() => toggleDept(d)}
            className={`chip ${
              departFilters.includes(d) ? "chip-active" : ""
            }`}
          >
            {d}
          </button>
        ))}
        <button
          className="btn small outline"
          onClick={() => setDepartFilters([])}
        >
          Clear
        </button>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div className="your-position-card">
          <div style={{ fontSize: 13, color: "#0c0b0bff" }}>
            Your Position
          </div>
          {yourRank ? (
            <>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginTop: 6,
                }}
              >
                {medals(yourRank.rank)} &nbsp; #{yourRank.rank}
              </div>
              <div style={{ fontSize: 14, color: "#080808ff" }}>
                {yourRank.entry.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#131111ff",
                  marginTop: 6,
                }}
              >
                {yourRank.entry.points} points •{" "}
                {yourRank.entry.shoutouts} shoutouts
              </div>
            </>
          ) : (
            <div style={{ color: "#0e0d0dff" }}>
              You are not ranked yet.
            </div>
          )}
        </div>
        
        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "#0c0b0bff" }}>Legend:</div>
          <div className="medal gold small-legend">🥇</div>
          <div className="medal silver small-legend">🥈</div>
          <div className="medal bronze small-legend">🥉</div>
        </div>
      </div>

      <div className="leaderboard-container" style={{ marginTop: 18 }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>Rank</th>
              <th>Name</th>
              <th>Department</th>
              <th style={{ width: 120 }}>Shoutouts</th>
              <th style={{ width: 120 }}>Points</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visible.map((item, idx) => {
              const rank = idx + 1;
              return (
                <tr key={item.userId}>
                  <td className="rank-number">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {medals(rank)}
                      <span style={{ fontWeight: 700 }}>{rank}</span>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.shoutouts}</td>
                  <td>
                    <span className="points-badge">
                      {item.points}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn small outline"
                        onClick={() => setActivePopup(item)}
                      >
                        View
                      </button>
                      <button
                        className="btn small"
                        onClick={() =>
                          alert(`${item.name} — ${item.points} points`)
                        }
                      >
                        Quick
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: 18,
                    color: "#0d0e11ff",
                  }}
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {activePopup && (
        <MiniPerformancePopup
          weekly={activePopup.weekly}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../layout/Header';
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaders();
    }, []);

    const fetchLeaders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const response = await axios.get('http://127.0.0.1:8000/users/leaderboard', config);
            setLeaders(response.data);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="leaderboard-container">
            <Header />
            <main className="leaderboard-content">
                <div className="leaderboard-card">
                    <header className="leaderboard-header">
                        <h1 className="leaderboard-title">Top Performers</h1>
                        <p className="leaderboard-subtitle">Recognizing the most impactful team members</p>
                    </header>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            Loading rankings...
                        </div>
                    ) : leaders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            No data available yet.
                        </div>
                    ) : (
                        <div className="leaderboard-list">
                            {leaders.map((leader, index) => {
                                const rank = index + 1;
                                return (
                                    <div key={leader.id || leader.email} className={`leaderboard-row rank-${rank <= 3 ? rank : 'other'}`}>
                                        <div className="rank-badge">{rank}</div>
                                        <div className="user-info">
                                            <div className="user-avatar">
                                                <span className="initials">{getInitials(leader.name)}</span>
                                            </div>
                                            <div className="user-details">
                                                <span className="user-name">{leader.name}</span>
                                                {leader.department && <span className="user-dept">{leader.department}</span>}
                                            </div>
                                        </div>
                                        <div className="score-container">
                                            <div className="user-score">{leader.score}</div>
                                            <span className="score-label">Points</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Leaderboard;
