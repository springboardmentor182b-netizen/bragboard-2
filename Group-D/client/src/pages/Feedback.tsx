
import React, { useState } from 'react';
import { User } from '../types';

const Feedback: React.FC<{ user: User }> = ({ user }) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-in fade-in duration-500">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 italic mb-2 tracking-tight">Help & Improvement</h1>
        <p className="text-slate-500 font-medium italic">Encountered an issue or have a cultural insight? Our admin team is listening.</p>
      </header>

      {sent ? (
        <div className="bg-emerald-50 border border-emerald-100 p-12 rounded-[3rem] text-center space-y-6">
           <div className="text-6xl animate-bounce">📨</div>
           <h2 className="text-2xl font-black text-emerald-900 italic">Message Received</h2>
           <p className="text-emerald-700 font-medium italic">Thank you for contributing to our workspace evolution. We'll review this shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Feedback Type</label>
              <div className="grid grid-cols-2 gap-4">
                 {['Bug Report', 'Feature Request', 'Culture Suggestion', 'Other'].map(type => (
                   <button key={type} type="button" className="py-4 text-center border-2 border-slate-50 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:border-indigo-100 hover:text-indigo-600 transition-all">{type}</button>
                 ))}
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Details</label>
              <textarea 
                required 
                rows={6}
                className="w-full p-8 rounded-[2rem] border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium italic text-slate-700"
                placeholder="Describe your thoughts or the issue in detail..."
              ></textarea>
           </div>

           <button 
             type="submit"
             className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:translate-y-0 italic"
           >
             Send to Administration
           </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
