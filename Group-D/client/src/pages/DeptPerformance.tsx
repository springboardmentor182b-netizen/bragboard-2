
import React from 'react';
import { ShoutOut } from '../types';

const DeptPerformance: React.FC<{ brags: ShoutOut[] }> = ({ brags }) => {
  const depts = [
    { name: 'Engineering', engagement: 94, sentiment: 88, brags: 42 },
    { name: 'Marketing', engagement: 76, sentiment: 92, brags: 28 },
    { name: 'Design', engagement: 88, sentiment: 95, brags: 35 },
    { name: 'Product', engagement: 91, sentiment: 86, brags: 39 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-black text-slate-900 italic mb-2">Departmental Performance</h1>
        <p className="text-slate-500 font-medium">Comparative analytics for team engagement and cultural health.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {depts.map(dept => (
          <div key={dept.name} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">{dept.name}</h3>
                <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{dept.brags} Brags</span>
             </div>
             
             <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                      <span>Engagement Rate</span>
                      <span className="text-slate-900">{dept.engagement}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${dept.engagement}%` }}></div>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                      <span>Positive Sentiment</span>
                      <span className="text-slate-900">{dept.sentiment}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${dept.sentiment}%` }}></div>
                   </div>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weekly Growth</p>
                   <p className="text-lg font-black text-emerald-600 italic">+12%</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Participation</p>
                   <p className="text-lg font-black text-indigo-600 italic">High</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeptPerformance;
