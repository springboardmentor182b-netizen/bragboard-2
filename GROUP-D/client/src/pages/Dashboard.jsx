import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import HeroBanner from "../components/HeroBanner";
import StatsCards from "../components/StatsCards";
import RecentActivities from "../components/RecentActivities";
import BadgesPanel from "../components/BadgesPanel";

export default function Dashboard() {
  return (
    <div className="app-shell min-h-screen flex items-start">
      <Sidebar />
      <main className="flex-1 p-8">
        <TopBar />
        <HeroBanner />
        <StatsCards />

        <div className="grid grid-cols-3 gap-6">
          <RecentActivities />
          <BadgesPanel />
        </div>
      </main>
    </div>
  );
}
