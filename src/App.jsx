import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AnalyticsChart from "./components/AnalyticsChart";
import ReportingCards from "./components/ReportingCards";
import Contributors from "./components/Contributors";
import MostTagged from "./components/MostTagged";

export default function App() {
  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="dashboard-content">
        <h1>Welcome to Admin Dashboard!!</h1>

        <AnalyticsChart />
        <ReportingCards />

        <div style={{ display: "flex", gap: 20 }}>
          <Contributors />
          <MostTagged />
        </div>
      </div>
    </>
  );
}
