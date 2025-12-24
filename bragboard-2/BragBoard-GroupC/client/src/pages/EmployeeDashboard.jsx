import React, { useEffect, useState } from "react";
import Employee_Sidebar from "../layout/Employee_Sidebar";
import Employee_Header from "../layout/Employee_Header";
import ShoutoutCard from "../components/ShoutoutCard";
import Employee_Leaderboard from "../components/Employee_Leaderboard";
import MyShoutouts from "../components/MyShoutouts";
import CreateShoutout from "../pages/CreateShoutout";
import ReportShoutout from "../pages/ReportShoutout"; 
import Notifications from "../components/Notifications";
import "../assets/global.css";

const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [shoutouts, setShoutouts] = useState([]);
  const [selectedShoutout, setSelectedShoutout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeSection !== "dashboard") return;

    const fetchShoutouts = async () => {
      try {
        const res = await fetch("http://localhost:8000/shoutouts?limit=5");
        if (!res.ok) throw new Error("Failed to fetch shoutouts");
        const data = await res.json();
        setShoutouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoutouts();
  }, [activeSection]);

  // ✅ Handle report click from card
  const handleReportClick = (shoutout) => {
    setSelectedShoutout(shoutout);
    setActiveSection("report-shoutout");
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="section-content">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-semibold">Welcome Pranjali!</h1>

              <button
                onClick={() => setActiveSection("create-shoutout")}
                className="create-shoutout-btn"
              >
                + Create Shoutout
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Latest shoutouts from the organization
            </p>

            {loading && <p>Loading shoutouts...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="analytics-grid">
              {shoutouts.map((s) => (
                <ShoutoutCard
                  key={s.id}
                  shoutout={s}
                  onReport={() => handleReportClick(s)}
                />
              ))}
            </div>
          </div>
        );

      case "create-shoutout":
        return (
          <div className="section-content">
            <CreateShoutout onCancel={() => setActiveSection("dashboard")} />
          </div>
        );

      case "report-shoutout":
        return (
          <div className="section-content">
            <ReportShoutout
              shoutout={selectedShoutout}
              employeeId={1}
              onCancel={() => setActiveSection("dashboard")}
            />
          </div>
        );

      case "leaderboard":
        return (
          <div className="section-content">
            <Employee_Leaderboard />
          </div>
        );

      case "notifications":
        return (
          <div className="section-content">
            <Notifications />
          </div>
        );

      case "my-shoutouts":
        return (
          <div className="section-content">
            <MyShoutouts employeeId={1} />
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="employee-dashboard flex">
      <Employee_Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="main-content flex-1 p-6 bg-gray-50 min-h-screen">
        <Employee_Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {renderMainContent()}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
