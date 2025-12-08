// src/layout/MainLayout.js
import React from "react";
import Navbar from "./EmployeeNavbar";
import Sidebar from "./EmployeeSidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
