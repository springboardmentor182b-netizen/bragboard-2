import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/AdminDashboard";
import ExportReportsScreen from "../components/admin/ExportReportsScreen";

const AdminLayout = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <AdminSidebar onNavigate={setActive} active={active} />
      <main style={{ flex: 1, padding: 20 }}>
        {active === "dashboard" && <AdminDashboard />}
        {active === "exports" && <ExportReportsScreen />}
        {/* Add more admin modules here */}
      </main>
    </div>
  );
};

export default AdminLayout;
