
import React, { useState } from 'react';

const AdminManagement: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-black text-slate-900 italic tracking-tight mb-2">System Configuration</h1>
        <p className="text-slate-500 font-medium">Global settings for point values, roles, and automated features.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 italic">Gamification Settings</h3>
            <div className="space-y-8">
               {[
                 { label: 'Brag Giving Points', val: 50 },
                 { label: 'Brag Receiving Points', val: 100 },
                 { label: 'Comment Bonus', val: 10 },
                 { label: 'Daily Login XP', val: 5 },
               ].map(item => (
                 <div key={item.label} className="flex items-center justify-between">
                    <p className="font-black text-slate-800 italic">{item.label}</p>
                    <input type="number" defaultValue={item.val} className="w-20 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-center font-black text-indigo-600 focus:bg-white outline-none" />
                 </div>
               ))}
               <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-100">Save Values</button>
            </div>
         </section>

         <section className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 italic">Role Hierarchy</h3>
            <div className="space-y-4">
               {[
                 { role: 'Administrator', access: 'Global Control', count: 1 },
                 { role: 'Moderator', access: 'Content & Flagging', count: 0 },
                 { role: 'Manager', access: 'Dept. Analytics', count: 4 },
                 { role: 'Standard User', access: 'Social Only', count: 32 },
               ].map(r => (
                 <div key={r.role} className="p-6 bg-white rounded-3xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:border-indigo-200 transition-colors">
                    <div>
                       <p className="font-black text-slate-900 italic">{r.role}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{r.access}</p>
                    </div>
                    <span className="text-xs font-black text-indigo-600 group-hover:translate-x-1 transition-transform">{r.count} Users →</span>
                 </div>
               ))}
               <button className="w-full py-4 bg-white border-2 border-slate-200 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-4 hover:bg-slate-100 transition-colors">Define New Role</button>
            </div>
         </section>
      </div>
    </div>
  );
};

export default AdminManagement;
