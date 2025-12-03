import React, { useState } from "react";
import Sidebar from "../layout/Admin_Sidebar";
import Header from "../layout/Admin_Header";
import Leaderboard from "../components/Admin_Leaderboard";
import ReportManagement from "../components/Admin_ReportManagement";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-12 space-y-10">
           <div className="dashboard-main">
            <div className="dashboard-header">
              <h1 className="welcome">Welcome back, Arshit Rawat!</h1>
            </div>
            </div>
            <div
              className="bg-white rounded-3xl shadow-md p-10 border border-gray-200 
              w-full transition-all"
            ><p className="tip">Tip: You can attach images and gifs in the posts</p>
              
              <button className="create-btn"> + Create Shout-out
          </button>

<div classname="post-card">
<h3 className="text-xl font-semibold text-gray-900">
                Pranjali Randive • Design </h3>
              <p className="mt-5 text-gray-700 text-lg leading-relaxed">
                Pairing up Arshit and Sandeep increased our productivity by 80% 🔥🔥
              </p>
              <input
                type="text"
                placeholder="Add a comment..."
                className="mt-8 w-full border border-gray-300 rounded-xl px-4 py-3
                text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              /></div>
                 </div>
          </div>
        );

      case "resolve-reports":
      case "report-history":
        return (
          <div className="p-10">
            <ReportManagement activeSection={activeSection} />
          </div>
        );

      case "leaderboard":
        return (
          <div className="p-12 space-y-10">
            <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>

            <div className="bg-white rounded-3xl shadow-md p-10 border border-gray-200">
              <Leaderboard />
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Settings</h2>

            <div className="bg-white p-10 rounded-3xl shadow border border-gray-200">
              <p className="text-gray-700 text-lg">
                Configure admin system preferences here.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-10">
            <p className="text-red-600 font-semibold">Section not found.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main style={{ marginLeft: "230px" }}>{renderMainContent()}</main>
    </div>
  );
};

export default AdminDashboard;
