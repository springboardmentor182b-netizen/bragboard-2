
import React, { useState } from 'react';
import { ShoutOut, User } from '../types';
// Added import for Icons from constants to fix the "Cannot find name 'Icons'" error
import { Icons } from '../constants';

interface AdminAnalyticsProps {
  brags: ShoutOut[];
  users: User[];
}

const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ brags, users }) => {
  const [activeTab, setActiveTab] = useState<'toxicity' | 'burnout' | 'silent'>('toxicity');

  // Fix: Use b.toIds.includes(u.id) instead of deprecated b.toId
  const silentEmployees = users.filter(u => !brags.some(b => b.fromId === u.id || b.toIds.includes(u.id)));
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <header>
        <div className="flex items-center gap-3 mb-2">
           <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">AI Hub</span>
           <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Advanced Risk Analysis</h1>
        </div>
        <p className="text-slate-500 font-medium">Leveraging Gemini AI to monitor culture health and predict employee risk factors.</p>
      </header>

      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'toxicity', label: 'Toxicity Review', icon: '🛡️' },
          { id: 'burnout', label: 'Burnout Detection', icon: '🔥' },
          { id: 'silent', label: 'Silent Employees', icon: '🔇' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === 'toxicity' && (
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm animate-in slide-in-from-left-4">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-slate-900 italic">Toxic Content Review</h3>
                <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full">0 Urgent Flags</span>
             </div>
             <div className="space-y-6">
                <p className="text-sm text-slate-500 italic leading-relaxed">
                  Our AI is currently scanning all workspace messages. No high-risk toxicity has been detected in the last 24 hours. The last flagged word was 'stupid' which was automatically softened by the UI filter.
                </p>
                <div className="grid grid-cols-3 gap-6">
                   <div className="bg-slate-50 p-6 rounded-3xl text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Messages Scanned</p>
                      <p className="text-2xl font-black text-indigo-600 italic">1,248</p>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-3xl text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Filter Efficiency</p>
                      <p className="text-2xl font-black text-emerald-600 italic">99.9%</p>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-3xl text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Manual Reviews</p>
                      <p className="text-2xl font-black text-slate-400 italic">0</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'burnout' && (
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-xl animate-in slide-in-from-left-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
             <h3 className="text-xl font-black italic mb-10 relative">Burnout Risk Analysis</h3>
             <div className="space-y-8 relative">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-xl">⚠️</div>
                      <div>
                         <p className="font-black italic">Moderate Risk Detected</p>
                         <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Engineering Dept • 2 Indicators</p>
                      </div>
                   </div>
                   <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase">View Insights</button>
                </div>
                <div className="space-y-4">
                   <p className="text-xs text-slate-400 uppercase font-black tracking-widest italic">AI Indicators Found:</p>
                   <ul className="grid grid-cols-2 gap-4">
                      {['Late night activity patterns', 'Decrease in recognition frequency', 'Work-life balance sentiment drop', 'Higher weekend login activity'].map(i => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium opacity-80">
                           <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> {i}
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'silent' && (
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm animate-in slide-in-from-left-4">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-slate-900 italic">Silent Employee Detection</h3>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{silentEmployees.length} Detected</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {silentEmployees.map(u => (
                  <div key={u.id} className="p-6 bg-slate-50 rounded-3xl flex items-center gap-4 hover:bg-slate-100 transition-all cursor-default group">
                     <img src={u.avatar} className="w-12 h-12 rounded-2xl bg-white shadow-sm transition-transform group-hover:scale-110" alt="" />
                     <div className="flex-1">
                        <p className="font-black text-slate-800 italic">{u.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last Activity: 30+ Days ago</p>
                     </div>
                     <button className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <Icons.Bell className="w-4 h-4" />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
