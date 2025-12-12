import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import "./Dashboard.css"; // we add classes to same CSS

/* -------------------------
  CONFIG: points rules
   - each shoutout = BASE_POINTS
   - each tag provides TAG_BONUS
   - special tags mapping -> EXTRA_BONUS
--------------------------------*/


const BASE_POINTS = 10;
const TAG_BONUS = 2;
const SPECIAL_TAGS = {
  leadership: 10,
  teamwork: 10,
  innovation: 8,
};

/* -------------------------
  Demo data (replace with real fetch)
--------------------------------*/
const DEMO_USERS = [
  { id: 1, name: "Alice", department: "Engineering" },
  { id: 2, name: "Bob", department: "Marketing" },
  { id: 3, name: "Edward", department: "Support" },
  { id: 4, name: "David", department: "Design" },
  { id: 5, name: "Eve", department: "Operations" },
  { id: 6, name: "Francis", department: "Sales" },
];

// Simulate logged-in user
const user = DEMO_USERS[0]; // Alice
const currentUserId = user?.id;

// Sample shoutouts received per user (for gamification & mini graph)
// In real app: fetch `/leaderboard` or compute from shoutouts API
const DEMO_LEADERBOARD_RAW = [
  { userId: 1, name: "Alice", department: "Engineering", shoutouts: 8, tags: ["leadership","teamwork"], weekly: [1,1,2,1,3] },
  { userId: 2, name: "Bob", department: "Marketing", shoutouts: 5, tags: ["marketing"], weekly: [0,1,2,0,2] },
  { userId: 3, name: "Chitra", department: "Support", shoutouts: 9, tags: ["support","teamwork"], weekly: [2,2,1,1,3] },
  { userId: 4, name: "David", department: "Design", shoutouts: 4, tags: ["design","innovation"], weekly: [0,1,1,1,1] },
  { userId: 5, name: "Eve", department: "Operations", shoutouts: 6, tags: ["operations"], weekly: [1,1,2,1,1] },
  { userId: 6, name: "Francis", department: "Sales", shoutouts: 3, tags: ["sales"], weekly: [0,0,1,1,1] },
];

/* -------------------------
  Helper: calculate points
--------------------------------*/
function calculatePoints(entry) {
  let points = (entry.shoutouts || 0) * BASE_POINTS;
  const tags = entry.tags || [];
  points += (tags.length) * TAG_BONUS;
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
  // weekly is array of numbers (last 5 weeks/day buckets)
  const data = weekly?.map((v, i) => ({ name: `W${i + 1}`, value: v })) || [];
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
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ textAlign: "right", marginTop: 10 }}>
          <button className="btn small outline" onClick={onClose}>Close</button>
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
  const [sortBy, setSortBy] = useState("points"); // points | shoutouts | name | dept
  const [departFilters, setDepartFilters] = useState([]); // selected departments
  const [activePopup, setActivePopup] = useState(null); // entry to show mini popup
  const [currentUserId] = useState(1); // << DEMO: default "You" = Alice (id 1)
  // If you have auth, replace currentUserId with logged in user's id.

  // load data (demo). Replace with real fetch to backend if available.
  useEffect(() => {
    // emulate fetching and computing points
    const computed = DEMO_LEADERBOARD_RAW.map((r) => {
      const points = calculatePoints(r);
      return { ...r, points };
    });
    setEntries(computed);
  }, []);

  // Departments list from data
  const allDepartments = useMemo(() => {
    const set = new Set(entries.map((e) => e.department));
    return Array.from(set);
  }, [entries]);

  // Filter + search + sort pipeline
  const visible = useMemo(() => {
    let arr = [...entries];

    // department filters
    if (departFilters.length > 0) {
      arr = arr.filter((e) => departFilters.includes(e.department));
    }

    // search
    const q = search.trim().toLowerCase();
    if (q) {
      arr = arr.filter((e) =>
        e.name.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        (e.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    // sort
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

  // compute the rank of current user (demo)
  const yourRank = useMemo(() => {
    if (!currentUserId) return null;
    const sorted = [...entries].sort((a, b) => b.points - a.points);
    const idx = sorted.findIndex((e) => e.userId === currentUserId);
    if (idx === -1) return null;
    return { rank: idx + 1, entry: sorted[idx], sorted };
  }, [entries, currentUserId]);

  /* -------------------------
     Export CSV
  --------------------------------*/
  const exportCSV = () => {
    const headers = ["Rank", "Name", "Department", "Shoutouts", "Points"];
    const rows = visible.map((e, i) => [i + 1, e.name, e.department, e.shoutouts, e.points]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "leaderboard.csv");
  };

  /* -------------------------
     Export PDF using jsPDF
  --------------------------------*/
  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(18);
    doc.text("Leaderboard", 14, 20);
    doc.setFontSize(11);

    const startY = 28;
    const rowHeight = 8;
    const marginLeft = 14;

    // headers
    const headers = ["Rank", "Name", "Department", "Shoutouts", "Points"];
    headers.forEach((h, idx) => doc.text(h, marginLeft + idx * 40, startY));

    // rows (limit to first 40 to avoid page overflow)
    visible.slice(0, 40).forEach((e, i) => {
      const y = startY + rowHeight * (i + 1);
      const vals = [i + 1, e.name, e.department, String(e.shoutouts), String(e.points)];
      vals.forEach((v, idx) => doc.text(v, marginLeft + idx * 40, y));
    });

    doc.save("leaderboard.pdf");
  };

  /* -------------------------
     UI helpers
  --------------------------------*/
  const toggleDept = (d) => {
    setDepartFilters((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };

  const medals = (rank) => {
    if (rank === 1) return <span className="medal gold">🥇</span>;
    if (rank === 2) return <span className="medal silver">🥈</span>;
    if (rank === 3) return <span className="medal bronze">🥉</span>;
    return null;
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="page-title">Leaderboard</h1>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Search name / dept / tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db" }}
          />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="small-select">
            <option value="points">Sort: Highest points</option>
            <option value="shoutouts">Sort: Most shoutouts</option>
            <option value="name">Sort: Name A–Z</option>
            <option value="dept">Sort: Department</option>
          </select>

          <button className="btn small outline" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      {/* Filters row */}
      <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ fontSize: 13, color: "#e4e9f0ff" }}>Departments:</div>
        {allDepartments.map((d) => (
          <button
            key={d}
            onClick={() => toggleDept(d)}
            className={`chip ${departFilters.includes(d) ? "chip-active" : ""}`}
          >
            {d}
          </button>
        ))}
        <button className="btn small outline" onClick={() => setDepartFilters([])}>Clear</button>
      </div>

      {/* your position box */}
      <div style={{ marginTop: 16, display: "flex", gap: 20, alignItems: "center" }}>
        <div className="your-position-card">
          <div style={{ fontSize: 13, color: "#ffffffff" }}>Your Position</div>
          {yourRank ? (
            <>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>
                {medals(yourRank.rank) } &nbsp; #{yourRank.rank}
              </div>
              <div style={{ fontSize: 14, color: "#ffffffff" }}>{yourRank.entry.name}</div>
              <div style={{ fontSize: 13, color: "#ffffffff", marginTop: 6 }}>
                {yourRank.entry.points} points • {yourRank.entry.shoutouts} shoutouts
              </div>
            </>
          ) : (
            <div style={{ color: "#ffffffff" }}>You are not ranked yet.</div>
          )}
        </div>

        <div style={{ flex: 1 }} />

        {/* quick legend */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "#ffffffff" }}>Legend:</div>
          <div className="medal gold small-legend">🥇</div>
          <div className="medal silver small-legend">🥈</div>
          <div className="medal bronze small-legend">🥉</div>
        </div>
      </div>

      {/* Table */}
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
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {medals(rank)}
                      <span style={{ fontWeight: 700 }}>{rank}</span>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.shoutouts}</td>
                  <td><span className="points-badge">{item.points}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn small outline" onClick={() => setActivePopup(item)}>View</button>
                      <button className="btn small" onClick={() => alert(`${item.name} — ${item.points} points`)}>
                        Quick
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: 18, color: "#6b7280" }}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mini popup */}
      {activePopup && (
        <MiniPerformancePopup
          weekly={activePopup.weekly}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
}
