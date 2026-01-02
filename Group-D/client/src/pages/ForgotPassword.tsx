
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-3xl text-center space-y-8 border border-slate-100">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center text-3xl mx-auto shadow-inner">🔑</div>
        
        {!submitted ? (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">Identity Recovery</h2>
              <p className="text-slate-500 font-medium italic">Enter your workspace email to initiate a security reset.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-8 py-5 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-slate-700 italic" 
                placeholder="user@bragboard.com" 
              />
              <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 italic">Reset Password</button>
            </form>
          </>
        ) : (
          <div className="space-y-6 animate-in zoom-in-95">
             <div className="p-6 bg-emerald-50 rounded-2xl text-emerald-700 font-bold italic leading-relaxed text-sm">
               Reset protocol initiated. Please check your inbox for verification steps.
             </div>
             <Link to="/login" className="block w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl italic">Return to Terminal</Link>
          </div>
        )}
        
        <Link to="/login" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors italic block">Back to Access Terminal</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
