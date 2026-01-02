
import React from 'react';

const IntegrationSettings: React.FC = () => {
  const integrations = [
    { id: 'slack', name: 'Slack Bot', status: 'Connected', icon: '💬', color: 'text-purple-600' },
    { id: 'teams', name: 'MS Teams Connector', status: 'Pending', icon: '👥', color: 'text-blue-600' },
    { id: 'email', name: 'Global SMTP Relay', status: 'Optimal', icon: '✉️', color: 'text-rose-600' },
    { id: 'hris', name: 'HRIS Identity Sync', status: 'Disabled', icon: '🏢', color: 'text-slate-400' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter mb-2">Neural Bridges</h1>
        <p className="text-slate-500 font-medium italic">Synchronize recognition events across the corporate communication stack.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {integrations.map(int => (
           <div key={int.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-8">
                 <div className="text-4xl bg-slate-50 w-20 h-20 flex items-center justify-center rounded-3xl shadow-inner group-hover:scale-110 transition-transform">{int.icon}</div>
                 <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase italic tracking-widest border ${int.status === 'Connected' || int.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                    {int.status}
                 </span>
              </div>
              <h3 className={`text-xl font-black italic mb-2 ${int.color}`}>{int.name}</h3>
              <p className="text-sm text-slate-400 font-medium italic mb-8">Deploy automated shout-outs directly into the workspace.</p>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all italic">Configure Node</button>
           </div>
         ))}
      </div>

      <div className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
         <h3 className="text-2xl font-black italic mb-4 relative z-10">Webhook Architecture</h3>
         <p className="text-sm font-medium text-indigo-100 italic leading-relaxed mb-8 relative z-10 max-w-lg">
           Enable raw event streams for custom internal dashboarding and external performance tracking tools.
         </p>
         <button className="px-10 py-5 bg-white text-indigo-600 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-indigo-50 transition-all italic relative z-10">Generate Access Key</button>
      </div>
    </div>
  );
};

export default IntegrationSettings;
