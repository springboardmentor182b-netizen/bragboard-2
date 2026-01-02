
import React from 'react';
import { ShoutOut } from '../types';
import { DEPARTMENTS } from '../constants';

const TeamRecognition: React.FC<{ brags: ShoutOut[] }> = ({ brags }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
      <header className="text-center">
        <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter mb-4">Team Synchronicity</h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic leading-relaxed">Cross-departmental appreciation fuels our collective growth. See how our units are collaborating.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEPARTMENTS.map(dept => {
          const deptBrags = brags.filter(b => b.category === dept.toLowerCase()); // Simplified for demo
          const activityCount = Math.floor(Math.random() * 20) + 5; // Mocking activity logic
          
          return (
            <div key={dept} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
               <h3 className="text-2xl font-black text-slate-900 italic mb-2 tracking-tight relative z-10">{dept}</h3>
               <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-8 relative z-10 italic">Pulse Level: Optimized</p>
               
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Appreciation Cycle</p>
                     <p className="text-sm font-black text-slate-900 italic">{activityCount} Wins</p>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                     <div className="h-full bg-indigo-600 rounded-full shadow-lg" style={{ width: `${(activityCount/30)*100}%` }}></div>
                  </div>
               </div>
               
               <div className="mt-10 flex -space-x-3 relative z-10">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-indigo-50 shadow-sm flex items-center justify-center text-[10px] font-black text-indigo-400">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-xl border-2 border-white bg-slate-100 shadow-sm flex items-center justify-center text-[8px] font-black text-slate-400">+12</div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamRecognition;
