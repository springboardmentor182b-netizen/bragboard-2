import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Flag, Activity } from 'lucide-react';
import { useNavigate } from "react-router-dom";

import AdminNavbar from '../admin/AdminNavbar';
import StatCard from '../admin/StatsCard';
import ActivityChart from '../admin/ActivityChart';
import DepartmentChart from '../admin/DepartmentChart';
import EmployeeDrawer from '../admin/EmployeeDrawer';
import ShoutoutReportsPanel from '../admin/ShoutoutReportsPanel';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

const adminAPI = {
  getStats: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to fetch statistics");
    return response.json();
  },

  exportReport: async (type, format) => {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${API_BASE_URL}/admin/export?report_type=${type}&format=${format}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (!response.ok) throw new Error("Export failed");
    return response.blob();
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isEmployeePanelOpen, setEmployeePanelOpen] = useState(false);

  const [stats, setStats] = useState({
    total_users: '0',
    shoutouts: '0',
    flagged_items: '0',
    engagement: '0%',
    weekly_activity: [],
    department_stats: []
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await adminAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };
    loadDashboardData();
  }, []);

  const handleExport = async (type, format) => {
    try {
      const blob = await adminAPI.exportReport(type, format);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Export failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Platform insights and analytics
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/leaderboard")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
            >
              View Leaderboard
            </button>

            <button
              onClick={() => setEmployeePanelOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
            >
              Employee Management
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={stats.total_users} icon={Users} />
          <StatCard title="Shoutouts" value={stats.shoutouts} icon={MessageSquare} />
          <StatCard
            title="Flagged Items"
            value={stats.flagged_items}
            icon={Flag}
            isNegative={stats.flagged_items > 0}
          />
          <StatCard title="Engagement" value={stats.engagement} icon={Activity} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96">
            <ActivityChart data={stats.weekly_activity} />
          </div>
          <div className="lg:col-span-1 h-96">
            <DepartmentChart data={stats.department_stats} />
          </div>
        </div>

        <ShoutoutReportsPanel onExport={handleExport} />
      </div>

      <EmployeeDrawer
        isOpen={isEmployeePanelOpen}
        onClose={() => setEmployeePanelOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;
