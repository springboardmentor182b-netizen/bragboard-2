
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface AdminEmployeesProps {
  currentUser: User;
  users: User[];
  onToggleStatus: (userId: string) => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}

const AdminEmployees: React.FC<AdminEmployeesProps> = ({ currentUser, users, onToggleStatus, onApprove, onReject }) => {
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  const isSuperAdmin = currentUser.role === UserRole.SUPER_ADMIN;
  
  // Hierarchy Rule:
  // Super Admin manages ONLY Admins (and other Super Admins if any).
  // Admins manage ONLY Employees.
  const targetScopeUsers = users.filter(u => {
    if (u.id === currentUser.id) return false; // Hide self
    if (isSuperAdmin) {
      return u.role === UserRole.ADMIN || u.role === UserRole.SUPER_ADMIN;
    } else {
      return u.role === UserRole.EMPLOYEE;
    }
  });

  const verifiedNodes = targetScopeUsers.filter(u => u.status === 'ACTIVE' || u.status === 'INACTIVE');
  const pendingApplications = targetScopeUsers.filter(u => u.status === 'PENDING_APPROVAL');

  const getSecretKeyForDisplay = (role: string) => {
    if (role === UserRole.SUPER_ADMIN) return "SUPER123";
    if (role === UserRole.ADMIN) return "ADMIN123";
    return "N/A";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic mb-2 tracking-tighter">
            {isSuperAdmin ? 'Council Governance' : 'Sector Directory'}
          </h1>
          <p className="text-slate-500 font-medium italic">
            {isSuperAdmin 
              ? 'Verifying and managing administrative access keys.' 
              : 'Overseeing regional employee identities and status.'}
          </p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-200">
           <button onClick={() => setActiveTab('approved')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'approved' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>Verified ({verifiedNodes.length})</button>
           <button onClick={() => setActiveTab('pending')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
             Applications ({pendingApplications.length})
             {pendingApplications.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] border-2 border-white">{pendingApplications.length}</span>}
           </button>
        </div>
      </header>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">
                  <th className="px-10 py-6">Member Node</th>
                  <th className="px-10 py-6">Tier Level</th>
                  <th className="px-10 py-6">Email Address</th>
                  {isSuperAdmin && activeTab === 'approved' && <th className="px-10 py-6">Clearance Key</th>}
                  <th className="px-10 py-6 text-right">Access Control</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {(activeTab === 'approved' ? verifiedNodes : pendingApplications).length === 0 ? (
                 <tr>
                    <td colSpan={isSuperAdmin ? 5 : 4} className="px-10 py-24 text-center text-slate-300 font-black italic uppercase tracking-widest text-sm">
                        No {isSuperAdmin ? 'administrative' : 'employee'} records found in this scope.
                    </td>
                 </tr>
               ) : (
                 (activeTab === 'approved' ? verifiedNodes : pendingApplications).map(u => (
                   <tr key={u.id} className={`transition-all ${u.status === 'INACTIVE' ? 'opacity-50 bg-slate-50/50' : 'hover:bg-slate-50/30'}`}>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <img src={u.avatar} className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-50 shadow-sm object-cover" alt="" />
                          <div>
                             <p className="font-black text-slate-900 text-lg italic leading-tight">{u.name}</p>
                             <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase italic tracking-widest border ${u.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : (u.status === 'INACTIVE' ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse')}`}>
                               {u.status}
                             </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border shadow-sm ${u.role === UserRole.ADMIN || u.role === UserRole.SUPER_ADMIN ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-xs font-bold text-slate-400 italic">
                        {u.email}
                      </td>
                      {isSuperAdmin && activeTab === 'approved' && (
                        <td className="px-10 py-8">
                          <code className="text-[10px] font-black text-indigo-400 italic bg-indigo-50/50 px-3 py-1 rounded-lg border border-indigo-100">
                             {getSecretKeyForDisplay(u.role)}
                          </code>
                        </td>
                      )}
                      <td className="px-10 py-8 text-right">
                         <div className="flex justify-end gap-3">
                            {activeTab === 'pending' ? (
                                <>
                                  <button onClick={() => onApprove(u.id)} className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all italic active:scale-95">Approve</button>
                                  <button onClick={() => onReject(u.id)} className="px-6 py-3 bg-white text-rose-500 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all italic active:scale-95">Deny Entry</button>
                                </>
                            ) : (
                                <button onClick={() => onToggleStatus(u.id)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border shadow-sm active:scale-95 ${u.status === 'ACTIVE' ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white' : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-600 hover:text-white'}`}>
                                    {u.status === 'ACTIVE' ? 'Suspend Access' : 'Reactivate Node'}
                                </button>
                            )}
                         </div>
                      </td>
                   </tr>
                 ))
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default AdminEmployees;
