import React, { useState } from 'react';
import { Users, MessageSquare, Flag, Activity } from 'lucide-react';

// Import all local admin components
import AdminNavbar from '../admin/AdminNavbar';
import StatCard from '../admin/StatsCard';
import ActivityChart from '../admin/ActivityChart';
import DepartmentChart from '../admin/DepartmentChart';
import EmployeeDrawer from '../admin/EmployeeDrawer';
import ShoutoutReportsPanel from '../admin/ShoutoutReportsPanel';

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

        <ShoutoutReportsPanel />
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


import React, { useState } from 'react';
import PageContainer from '../layout/PageContainer';
import AdminSidebar from '../layout/Sidebar'; 
import ExportReportsButton from '../features/admin/components/ExportReportsButton';


const AdminDashboard = () => {
    
    const [reportType, setReportType] = useState('shoutouts');
    const [format, setFormat] = useState('csv');

    
    const handleExport = (type, format) => {
        console.log(`Requesting export for: ${type} in format: ${format}`);
        
        alert(`Admin is exporting ${type} report as a ${format}!`);
    };

    return (
        <PageContainer>
            <div className="flex">
                <AdminSidebar />
                <div className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                    
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-semibold mb-4">Reports & Analytics</h2>
                        
                        <div className="flex items-center space-x-4 mb-4">
                            <label htmlFor="reportType" className="font-medium">Report Type:</label>
                            <select 
                                id="reportType"
                                value={reportType} 
                                onChange={(e) => setReportType(e.target.value)}
                                className="border p-2 rounded-md"
                            >
                                <option value="shoutouts">Shout-outs</option>
                                <option value="users">User Activity</option>
                                <option value="comments">Comments</option>
                            </select>
                            
                            <label htmlFor="format" className="font-medium">Format:</label>
                            <select 
                                id="format"
                                value={format} 
                                onChange={(e) => setFormat(e.target.value)}
                                className="border p-2 rounded-md"
                            >
                                <option value="csv">CSV</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </div>

                        <ExportReportsButton 
                            reportType={reportType} 
                            format={format}
                            onExport={() => handleExport(reportType, format)}
                        />
                    </div>

                    

                </div>
            </div>
        </PageContainer>
    );
};

export default AdminDashboard;