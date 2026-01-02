
import React from 'react';
import { User, ShoutOut } from '../types';

interface AIInsightsProps {
  user: User;
  brags: ShoutOut[];
  isAdminView?: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({ user, brags, isAdminView }) => {
  // Fix: Use b.toIds.includes(user.id) instead of deprecated b.toId
  const relevantBrags = isAdminView ? brags : brags.filter(b => b.toIds.includes(user.id) || b.fromId === user.id);
  const avgScore = relevantBrags.length ? Math.round(relevantBrags.reduce((acc, curr) => acc + curr.sentimentScore, 0) / relevantBrags.length) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tight">AI & Culture Analytics</h1>
        <p className="text-slate-500 font-medium">{isAdminView ? "Real-time global workspace sentiment and burnout monitoring." : "Personal feedback trends and recognition velocity."}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200">
           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-6">Sentiment Pulse</p>
           <div className="flex items-baseline gap-2 mb-8">
              <span className="text-7xl font-black italic tracking-tighter">{avgScore}%</span>
              <span className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Positive</span>
           </div>
           <p className="text-sm font-medium leading-relaxed opacity-90 italic">
             Our LLM analysis of {relevantBrags.length} interaction(s) suggests a {avgScore > 80 ? 'thriving and psychologicaly safe' : 'stable but improving'} environment.
           </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-center">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic">Mood Vectors</h3>
           <div className="space-y-6">
              {[
                { mood: 'Inspired', val: 85, color: 'bg-indigo-500' },
                { mood: 'Empowered', val: 12, color: 'bg-emerald-500' },
                { mood: 'Neutral', val: 3, color: 'bg-slate-300' }
              ].map(item => (
                <div key={item.mood}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 px-1">
                    <span>{item.mood}</span>
                    <span className="text-slate-900">{item.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 italic">AI Behavioral Log</h3>
        <div className="space-y-4">
          {relevantBrags.length === 0 ? (
            <p className="text-slate-300 font-bold italic text-center py-12">Insufficient data to generate behavioral insights.</p>
          ) : (
            relevantBrags.map(brag => (
              <div key={brag.id} className="flex gap-5 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="text-3xl grayscale hover:grayscale-0 transition-all">✨</div>
                <div>
                  <p className="text-sm font-bold text-slate-700 italic leading-relaxed">"{brag.message}"</p>
                  <div className="mt-4 flex items-center gap-4">
                     <span className="text-[10px] font-black bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">{brag.mood}</span>
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Sentiment: {brag.sentimentScore}/100</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
