
import React from 'react';
import { ShoutOut, User, UserRole } from '../types';
import { Link } from 'react-router-dom';
import { Icons } from '../constants';

interface AdminDashboardProps {
  brags: ShoutOut[];
  users: User[];
  currentUser: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ brags, users, currentUser }) => {
  const isSuperAdmin = currentUser.role === UserRole.SUPER_ADMIN;
  
  // Strict Role Filtering for Dashboard Stats
  const targetRole = isSuperAdmin ? UserRole.ADMIN : UserRole.EMPLOYEE;
  const filteredUsers = users.filter(u => u.role === targetRole);
  
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5 text-indigo-600">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] italic leading-none">
              {isSuperAdmin ? 'Root Governance Console' : 'Sector Control Node'}
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 italic tracking-tighter">Executive Hub</h1>
          <p className="mt-5 text-slate-500 font-semibold leading-relaxed max-w-2xl text-lg italic">
            Monitoring {isSuperAdmin ? 'Administrative effectiveness' : 'Workforce sentiment'} and cultural velocity.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0 items-center">
           <Link to="/admin/employees" className="px-10 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Manage {isSuperAdmin ? 'Admins' : 'Employees'}</Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: isSuperAdmin ? 'Admins' : 'Employees', value: filteredUsers.length, icon: '👥', color: 'text-indigo-600', trend: 'Verified Nodes' },
          { label: 'Brag Volume', value: brags.length, icon: '🔥', color: 'text-orange-500', trend: 'Platform Activity' },
          { label: 'Global Sentiment', value: '94%', icon: '😊', color: 'text-emerald-500', trend: 'AI Pulse' },
          { label: 'Clearance', value: isSuperAdmin ? 'Lvl 5' : 'Lvl 4', icon: '💎', color: 'text-purple-600', trend: 'Secure Access' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200 flex flex-col justify-center hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden min-h-[240px]">
             <div className="text-4xl mb-8 group-hover:scale-110 transition-transform origin-left italic">{stat.icon}</div>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 italic">{stat.label}</p>
             <p className={`text-5xl font-black ${stat.color} italic tracking-tighter mb-6`}>{stat.value}</p>
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{stat.trend}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
