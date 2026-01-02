
import React from 'react';
import { ShoutOut, User } from '../types';

const EngagementAnalytics: React.FC<{ brags: ShoutOut[]; users: User[] }> = ({ brags, users }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter mb-2">Engagement Velocity</h1>
        <p className="text-slate-500 font-medium italic">High-fidelity interaction mapping across organizational nodes.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">Interaction Flux (Weekly)</h3>
            <div className="h-64 flex items-end justify-between gap-4 px-4">
               {[30, 45, 20, 80, 55, 90, 75].map((v, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-4">
                    <div className="w-full bg-slate-50 rounded-t-2xl border-x border-t border-slate-100 relative group overflow-hidden" style={{ height: `${v}%` }}>
                       <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase italic">Day {i+1}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl flex flex-col justify-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
            <div>
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4 italic">Platform Vitality</p>
               <p className="text-6xl font-black italic tracking-tighter">8.4<span className="text-2xl text-indigo-500 opacity-50">/10</span></p>
            </div>
            <p className="text-sm font-medium text-slate-400 italic leading-relaxed">
              Global interaction coefficient is performing 12% above quarterly baseline.
            </p>
            <div className="flex gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-[9px] font-black text-emerald-500 uppercase italic tracking-widest">Sector Optimal</span>
            </div>
         </div>
      </div>

      <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
         <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 italic">Leaderboard Distribution</h3>
         <div className="space-y-8">
            {['Engineering', 'Design', 'Marketing', 'Executive'].map(dept => (
              <div key={dept} className="flex items-center gap-8">
                 <p className="w-32 text-sm font-black text-slate-700 italic">{dept}</p>
                 <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.random() * 60 + 30}%` }}></div>
                 </div>
                 <p className="text-xs font-bold text-slate-400">Stable</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default EngagementAnalytics;
