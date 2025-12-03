import React, { useState } from "react";
import {
  LucideHome,
  LucideFileText,
  LucideTrophy,
  LucideSettings,
  LucideCheckCircle,
  LucideClock,
} from "lucide-react";
import "./Admin_Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [reportsOpen, setReportsOpen] = useState(false);

  return (
    <div className="admin-sidebar-container">
      <h2 className="admin-logo">BragBoard</h2>

      <ul className="admin-menu">
        {/* Dashboard */}
        <li
          className={`sidebar-item ${activeSection === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveSection("dashboard")}
        >
          <LucideHome className="sidebar-icon" size={18} />
          Dashboard
        </li>

        {/* Reports */}
        <li
          className={`sidebar-item ${
            activeSection === "reports" ||
            activeSection.includes("report") ||
            reportsOpen
              ? "active"
              : ""
          }`}
          onClick={() => setReportsOpen(!reportsOpen)}
        >
          <LucideFileText className="sidebar-icon" size={18} />
          Reports ▾
        </li>

        {/* Reports Dropdown */}
        <div className={`dropdown-menu ${reportsOpen ? "open" : ""}`}>
          <div
            className={`dropdown-item ${activeSection === "resolve-reports" ? "active" : ""}`}
            onClick={() => setActiveSection("resolve-reports")}
          >
            <LucideCheckCircle className="sidebar-icon" size={16} />
            Resolve Reports
          </div>
          <div
            className={`dropdown-item ${activeSection === "report-history" ? "active" : ""}`}
            onClick={() => setActiveSection("report-history")}
          >
            <LucideClock className="sidebar-icon" size={16} />
            Report History
          </div>
        </div>

        {/* Leaderboard */}
        <li
          className={`sidebar-item ${activeSection === "leaderboard" ? "active" : ""}`}
          onClick={() => setActiveSection("leaderboard")}
        >
          <LucideTrophy className="sidebar-icon" size={18} />
          Leaderboard
        </li>

        {/* Settings */}
        <li
          className={`sidebar-item ${activeSection === "settings" ? "active" : ""}`}
          onClick={() => setActiveSection("settings")}
        >
          <LucideSettings className="sidebar-icon" size={18} />
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
