
import React from 'react';
import { User, UserRole } from '../types';

interface LeaderboardProps {
  users: User[];
  currentUser?: User;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUser }) => {
  // Filter users based on viewing hierarchy:
  // 1. Super Admin sees only Admins.
  // 2. Admin sees only Employees.
  // 3. Employees see only Employees.
  const filteredUsers = users.filter(u => {
    if (!currentUser) return true;
    if (currentUser.role === UserRole.SUPER_ADMIN) {
      return u.role === UserRole.ADMIN;
    }
    // Both Admins and Employees only see the Employee leaderboard
    return u.role === UserRole.EMPLOYEE;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-3 italic tracking-tight">
          {currentUser?.role === UserRole.SUPER_ADMIN ? 'Administrative Rankings' : 'The Recognition Leaderboard'}
        </h1>
        <p className="text-slate-500 font-medium max-w-sm mx-auto">
          {currentUser?.role === UserRole.SUPER_ADMIN 
            ? 'Ranking the effectiveness of sector administrators.' 
            : 'Celebrating the top contributors who lift our workspace culture every day.'}
        </p>
      </header>

      {sortedUsers.length === 0 ? (
        <div className="bg-white p-24 rounded-[3.5rem] border border-slate-100 text-center text-slate-300 font-black italic uppercase tracking-widest text-sm">
          No records found for this hierarchy level.
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-10 border-b border-slate-50 bg-indigo-50/20">
             <div className="flex gap-8 items-center justify-center overflow-x-auto pb-4 no-scrollbar">
               {sortedUsers.slice(0, 3).map((user, idx) => (
                 <div key={user.id} className={`flex-shrink-0 flex flex-col items-center p-10 rounded-[2.5rem] border-2 transition-all ${idx === 0 ? 'bg-indigo-600 text-white scale-110 shadow-2xl border-indigo-400 z-10' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <span className="text-3xl mb-4">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                    <img src={user.avatar} className="w-20 h-20 rounded-[1.5rem] mb-5 bg-white border-2 border-slate-50 shadow-md object-cover" alt={user.name} />
                    <p className="font-black uppercase tracking-[0.1em] text-[10px] opacity-70 mb-1">{idx === 0 ? 'Champion' : 'Elite'}</p>
                    <p className="font-black italic text-lg mb-2">{user.name}</p>
                    <p className="font-black text-2xl tracking-tighter">{user.points} XP</p>
                 </div>
               ))}
             </div>
          </div>

          <div className="divide-y divide-slate-50">
            {sortedUsers.map((u, i) => (
              <div key={u.id} className="flex items-center gap-6 p-8 hover:bg-slate-50/50 transition-all group cursor-default">
                <span className="w-12 font-black text-slate-200 italic text-3xl transition-colors group-hover:text-indigo-100">#{i + 1}</span>
                <img src={u.avatar} className="w-14 h-14 rounded-[1.2rem] border border-slate-200 shadow-sm group-hover:scale-110 transition-transform bg-white object-cover" alt={u.name} />
                <div className="flex-1">
                  <p className="font-black text-slate-900 text-lg italic group-hover:text-indigo-600 transition-colors">{u.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{u.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-600 italic tracking-tighter">{u.points.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Accumulated XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
