import React, { useState } from 'react';
import { Users, MessageSquare, Flag, Activity } from 'lucide-react';

// Import all local admin components
import AdminNavbar from '../admin/AdminNavbar';
import StatCard from '../admin/StatsCard';
import ActivityChart from '../admin/ActivityChart';
import DepartmentChart from '../admin/DepartmentChart';
import EmployeeDrawer from '../admin/EmployeeDrawer';
import ShoutoutReports from '../admin/ShoutoutReports';

// --- MAIN PAGE COMPONENT ---
const AdminDashboard = () => {
  const [isEmployeePanelOpen, setEmployeePanelOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-blue-500 selection:text-white">
      
      <AdminNavbar />

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Platform insights and analytics</p>
          </div>
          <button 
            onClick={() => setEmployeePanelOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20"
          >
            Employee management
          </button>
        </header>

        {/* Stats Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value="156" change="+12%" icon={Users} />
          <StatCard title="Shoutouts" value="1,243" change="+28%" icon={MessageSquare} />
          <StatCard title="Flagged Items" value="3" change="-50%" icon={Flag} isNegative={true} />
          <StatCard title="Engagement" value="78%" change="+5%" icon={Activity} />
        </div>

        {/* Charts Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96">
            <ActivityChart />
          </div>

          <div className="lg:col-span-1 h-96">
            <DepartmentChart />
          </div>
        </div>

        <ShoutoutReports />
      </div>

      {/* Employee Drawer Overlay */}
      <EmployeeDrawer 
        isOpen={isEmployeePanelOpen} 
        onClose={() => setEmployeePanelOpen(false)} 
      />
      
    </div>
  );
};

export default AdminDashboard;