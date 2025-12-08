import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // local filter state stored in localStorage so MyShoutouts page can read it
  const [filters, setFilters] = useState({
    HR: false,
    CyberSecurity: false,
    Deployment: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("bragboard_filters");
    if (saved) setFilters(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bragboard_filters", JSON.stringify(filters));
  }, [filters]);

  const toggleFilter = (name) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-100"}`;

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-5 flex flex-col justify-between">
      <div>
        <nav className="space-y-2 mb-6">
          <NavLink to="/dashboard" className={linkClass}>
            <span className="text-lg">🏠</span> <span>Dashboard</span>
          </NavLink>

          <NavLink to="/my-shoutouts" className={linkClass}>
            <span className="text-lg">⭐</span> <span>My Shout-outs</span>
          </NavLink>

          <NavLink to="/leaderboard" className={linkClass}>
            <span className="text-lg">📊</span> <span>Leaderboard</span>
          </NavLink>

          {/* removed Settings link as requested */}
        </nav>

        {/* Filter box */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h4 className="text-sm font-semibold mb-3">Filter</h4>

          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.HR}
                onChange={() => toggleFilter("HR")}
                className="form-checkbox"
              />
              <span>HR</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.CyberSecurity}
                onChange={() => toggleFilter("CyberSecurity")}
                className="form-checkbox"
              />
              <span>CyberSecurity</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.Deployment}
                onChange={() => toggleFilter("Deployment")}
                className="form-checkbox"
              />
              <span>Deployment</span>
            </label>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-6">
        <p>BragBoard • Internal</p>
      </div>
    </aside>
  );
};

export default Sidebar;
