
import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoutOut, UserRole } from '../types';

interface ProfileProps {
  user: User;
  brags: ShoutOut[];
  users: User[];
}

const Profile: React.FC<ProfileProps> = ({ user, brags, users }) => {
  // Fix: Use b.toIds.includes(user.id) instead of deprecated b.toId
  const receivedCount = brags.filter(b => b.toIds.includes(user.id)).length;
  const givenCount = brags.filter(b => b.fromId === user.id).length;
  const isAdmin = user.role === UserRole.ADMIN;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="relative h-56 rounded-[3.5rem] bg-gradient-to-r from-indigo-600 via-indigo-900 to-slate-900 shadow-xl overflow-hidden group">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent transition-transform group-hover:scale-110 duration-1000"></div>
        <div className="absolute -bottom-10 left-12">
           <img src={user.avatar} className="w-40 h-40 rounded-[2.5rem] border-8 border-white bg-white shadow-2xl object-cover" alt={user.name} />
           <Link 
             to="/settings" 
             className="absolute bottom-4 right-0 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-all border-4 border-white group/btn"
           >
             <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
           </Link>
        </div>
      </div>

      <div className="pt-6 px-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none">{user.name}</h1>
          <p className="text-indigo-500 font-black uppercase tracking-[0.2em] text-[10px] mt-4 italic">{user.department} Unit • Sector Access: {user.role}</p>
          <div className="flex gap-3 mt-6">
             <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">Active Node</span>
             <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">Elite Status</span>
          </div>
        </div>
        <Link 
          to="/settings" 
          className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all italic shadow-sm"
        >
          Edit Identity
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic group-hover:text-indigo-400 transition-colors">Recognitions Received</p>
           <p className="text-5xl font-black text-indigo-600 italic tracking-tighter leading-none">{receivedCount}</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic group-hover:text-indigo-400 transition-colors">Appreciations Given</p>
           <p className="text-5xl font-black text-indigo-600 italic tracking-tighter leading-none">{givenCount}</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic group-hover:text-emerald-400 transition-colors">Performance Level</p>
           <p className="text-5xl font-black text-emerald-600 italic tracking-tighter leading-none">{user.points.toLocaleString()}</p>
        </div>
      </div>

      {isAdmin && (
        <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-3xl mx-4 space-y-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -mr-40 -mt-40 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
           <header className="relative z-10">
              <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 italic">Administrative Oversight</h3>
              <p className="text-2xl font-black italic tracking-tighter">System Health & Metrics</p>
           </header>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative z-10">
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-500 uppercase italic">Managed Identities</p>
                 <p className="text-3xl font-black italic">{users.length} Nodes</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-500 uppercase italic">Security Clearance</p>
                 <p className="text-3xl font-black italic text-emerald-400">Level 4</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-slate-500 uppercase italic">System Uptime</p>
                 <p className="text-3xl font-black italic text-indigo-400">99.9%</p>
              </div>
           </div>
        </div>
      )}

      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 mx-4">
         <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">Cultural Accomplishments</h3>
         </div>
         <div className="flex flex-wrap gap-6">
            {[
              { label: 'Star Performer', icon: '⭐', color: 'bg-amber-50 text-amber-600' },
              { label: 'Innovator', icon: '💡', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'Team Player', icon: '🤝', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'High Flyer', icon: '🏆', color: 'bg-purple-50 text-purple-600' }
            ].map(badge => (
              <div key={badge.label} className={`px-8 py-5 ${badge.color} rounded-[2rem] border-2 border-current/10 flex items-center gap-4 font-black text-xs uppercase tracking-widest hover:scale-105 hover:bg-current hover:text-white transition-all cursor-default italic shadow-sm`}>
                 <span className="text-2xl">{badge.icon}</span>
                 {badge.label}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Profile;
