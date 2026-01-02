
import React from 'react';
import { User, ShoutOut } from '../types';

const MyActivity: React.FC<{ user: User; brags: ShoutOut[] }> = ({ user, brags }) => {
  const given = brags.filter(b => b.fromId === user.id);
  // Fix: Use b.toIds.includes(user.id) instead of deprecated b.toId
  const received = brags.filter(b => b.toIds.includes(user.id));

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-black text-slate-900 italic mb-2 tracking-tight">Your Activity Timeline</h1>
        <p className="text-slate-500 font-medium">Tracking every shout-out given and received.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
           <div className="flex justify-between items-end mb-4 px-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">Shout-Outs Received ({received.length})</h3>
           </div>
           {received.length === 0 ? (
             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center text-slate-300 italic font-bold">No recognitions received yet.</div>
           ) : (
             received.map(b => (
               <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors">
                  <p className="text-sm font-bold text-slate-700 italic">"{b.message}"</p>
                  <div className="mt-4 flex justify-between items-center">
                     <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">from {b.fromName}</span>
                     <span className="text-[10px] text-slate-300 font-bold">{new Date(b.timestamp).toLocaleDateString()}</span>
                  </div>
               </div>
             ))
           )}
        </section>

        <section className="space-y-6">
           <div className="flex justify-between items-end mb-4 px-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">Shout-Outs Given ({given.length})</h3>
           </div>
           {given.length === 0 ? (
             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center text-slate-300 italic font-bold">Go on, recognize someone today!</div>
           ) : (
             given.map(b => (
               <div key={b.id} className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl hover:translate-x-1 transition-all">
                  <p className="text-sm font-bold italic opacity-90">"{b.message}"</p>
                  <div className="mt-4 flex justify-between items-center">
                     {/* Fix: Use b.toNames.join(', ') instead of deprecated b.toName */}
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">to {b.toNames.join(', ')}</span>
                     <span className="text-[10px] text-slate-500 font-bold">{new Date(b.timestamp).toLocaleDateString()}</span>
                  </div>
               </div>
             ))
           )}
        </section>
      </div>
    </div>
  );
};

export default MyActivity;
