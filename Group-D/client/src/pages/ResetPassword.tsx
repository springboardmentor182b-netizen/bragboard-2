
import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-3xl text-center space-y-8 border border-slate-100">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center text-3xl mx-auto shadow-inner">🔄</div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">Credential Reset</h2>
          <p className="text-slate-500 font-medium italic">Enter your new workspace credentials below.</p>
        </div>
        <form className="space-y-4">
           <input type="password" placeholder="New Password" required className="w-full px-8 py-5 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none font-bold italic" />
           <input type="password" placeholder="Confirm Password" required className="w-full px-8 py-5 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none font-bold italic" />
           <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs italic shadow-xl">Update Access</button>
        </form>
        <Link to="/login" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors italic">Back to Terminal</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
