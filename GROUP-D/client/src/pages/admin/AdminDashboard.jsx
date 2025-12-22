import TopContributors from "../../components/admin/TopContributors";
import DepartmentAnalytics from "../../components/admin/DepartmentAnalytics";
import TimeAnalytics from "../../components/admin/TimeAnalytics";

function AdminDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard – Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopContributors />
        <DepartmentAnalytics />
      </div>

      <div className="mt-6">
        <TimeAnalytics />
      </div>
    </div>
  );
}

export default AdminDashboard;
