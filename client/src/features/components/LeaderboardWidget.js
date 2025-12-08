import React, { useEffect, useMemo, useState } from "react";
import "./Widget.css";

const API_URL = "http://localhost:8000";

const DEMO_EMPLOYEES = [
  { id: 1, name: "Alice", department: "Engineering" },
  { id: 2, name: "Bob", department: "Marketing" },
  { id: 3, name: "Chitra", department: "Support" },
  { id: 4, name: "David", department: "Design" },
  { id: 5, name: "Eve", department: "Operations" },
];

function getBadge(rank) {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "none";
}

// period filter helper
function isInPeriod(createdAt, period) {
  if (period === "all") return true; // no filter

  if (!createdAt) return false;
  const d = new Date(createdAt);
  if (isNaN(d)) return false;

  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  if (period === "week") {
    return now - d <= 7 * msInDay;
  }
  if (period === "month") {
    return now - d <= 30 * msInDay;
  }
  return true;
}

export default function LeaderboardWidget() {
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters
  const [deptFilter, setDeptFilter] = useState("all");
  const [period, setPeriod] = useState("all"); // "week" | "month" | "all"

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/shoutouts`); // later can be /leaderboard
        if (!res.ok) throw new Error("Failed to fetch leaderboard data");
        const data = await res.json();
        setShoutouts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const leaderboard = useMemo(() => {
    if (!shoutouts.length) return [];

    const scores = {};

    shoutouts.forEach((s) => {
      // time filter
      if (!isInPeriod(s.created_at, period)) return;

      // department filter (case‑insensitive)
      const sDept = (s.department || "Unknown").trim();
      if (
        deptFilter !== "all" &&
        sDept.toLowerCase() !== deptFilter.toLowerCase()
      ) {
        return;
      }

      // sender / creator
      const creatorName = (
        s.created_by ||
        s.sender_name ||
        s.sender_id ||
        "Unknown"
      ).toString();
      if (!scores[creatorName]) {
        const demo = DEMO_EMPLOYEES.find((e) => e.name === creatorName);
        scores[creatorName] = {
          name: creatorName,
          department: demo?.department || s.department || "Unknown",
          given: 0,
          received: 0,
        };
      }
      scores[creatorName].given += 1;

      // recipients
      if (Array.isArray(s.recipients)) {
        s.recipients.forEach((r) => {
          const recName = (r.name || r.id || "Unknown").toString();
          if (!scores[recName]) {
            const demo = DEMO_EMPLOYEES.find((e) => e.name === recName);
            scores[recName] = {
              name: recName,
              department: demo?.department || "Unknown",
              given: 0,
              received: 0,
            };
          }
          scores[recName].received += 1;
        });
      }
    });

    const arr = Object.values(scores).map((row) => ({
      ...row,
      points: row.given * 1 + row.received * 2,
    }));

    arr.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return a.name.localeCompare(b.name);
    });

    return arr.slice(0, 10).map((row, index) => ({
      rank: index + 1,
      badge: getBadge(index + 1),
      ...row,
    }));
  }, [shoutouts, deptFilter, period]);

  const topThree = leaderboard.slice(0, 3);

  const maxPoints =
    leaderboard.length > 0
      ? Math.max(...leaderboard.map((row) => row.points || 0))
      : 0;

  const rankEmoji = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };

  return (
    <div className="widget-card leaderboard-widget">
      <div className="widget-header">
        <h3>🏆 BragBoard Leaderboard</h3>
        <span className="widget-subtitle">Employee ranking & gamification</span>
      </div>
      <p className="points-hint">
      Points formula: 1 point per shout‑out given, 2 points per shout‑out received.
      </p>


      {loading ? (
        <div className="widget-empty">Loading leaderboard…</div>
      ) : error ? (
        <div className="widget-error">{error}</div>
      ) : leaderboard.length === 0 ? (
        <div className="widget-empty">No leaderboard data yet.</div>
      ) : (
        <>
          {/* FILTERS */}
          <div className="leaderboard-filters">
            <div className="filter-group">
              <span className="filter-label">Period:</span>
              <button
                className={`filter-chip ${
                  period === "week" ? "active" : ""
                }`}
                onClick={() => setPeriod("week")}
              >
                Weekly
              </button>
              <button
                className={`filter-chip ${
                  period === "month" ? "active" : ""
                }`}
                onClick={() => setPeriod("month")}
              >
                Monthly
              </button>
              <button
                className={`filter-chip ${
                  period === "all" ? "active" : ""
                }`}
                onClick={() => setPeriod("all")}
              >
                All‑time
              </button>
            </div>

            <div className="filter-group">
              <span className="filter-label">Department:</span>
              <select
                className="filter-select"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Support">Support</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>

          {/* TOP 3 CARDS */}
          <div className="leaderboard-top3">
            {topThree.map((row) => (
              <div
                key={row.name}
                className={`leaderboard-top-card badge-${row.badge}`}
              >
                <div className="leaderboard-top-header">
                  <span className="leaderboard-top-rank">
                    #{row.rank} {rankEmoji(row.rank)}
                  </span>
                  <span className="leaderboard-top-name">{row.name}</span>
                </div>
                <div className="leaderboard-top-sub">
                  <span className="leaderboard-top-dept">{row.department}</span>
                  <span className="leaderboard-top-points">
                    {row.points} pts
                  </span>
                </div>
                <div className="leaderboard-top-meta">
                  <span>{row.given} given</span>
                  <span>{row.received} received</span>
                </div>
                <div className="leaderboard-progress">
                  <div
                    className="leaderboard-progress-bar"
                    style={{
                      width: maxPoints
                        ? `${(row.points / maxPoints) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Employee</th>
                  <th>Dept</th>
                  <th>Given</th>
                  <th>Received</th>
                  <th>Points</th>
                  <th>Badge</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row) => (
                  <tr key={row.name}>
                    <td className="lb-rank">
                      #{row.rank} {rankEmoji(row.rank)}
                    </td>
                    <td className="lb-name">{row.name}</td>
                    <td>{row.department}</td>
                    <td>{row.given}</td>
                    <td>{row.received}</td>
                    <td className="lb-points">{row.points}</td>
                    <td>
                      {row.badge !== "none" ? (
                        <span className={`badge-pill badge-${row.badge}`}>
                          {row.badge === "gold" && "Gold"}
                          {row.badge === "silver" && "Silver"}
                          {row.badge === "bronze" && "Bronze"}
                        </span>
                      ) : (
                        <span className="badge-pill badge-participation">
                          Player
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
