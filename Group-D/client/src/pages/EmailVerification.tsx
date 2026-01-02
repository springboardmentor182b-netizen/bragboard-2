
import React from 'react';
import { Link } from 'react-router-dom';

const EmailVerification = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-3xl text-center space-y-8 border border-slate-100">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center text-3xl mx-auto shadow-inner">✉️</div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">Verify Email</h2>
          <p className="text-slate-500 font-medium italic">We have sent a 6-digit verification code to your email.</p>
        </div>
        <div className="flex gap-2 justify-center">
           {[1,2,3,4,5,6].map(i => (
             <input key={i} type="text" maxLength={1} className="w-12 h-16 bg-slate-50 border-2 border-slate-100 rounded-xl text-center font-black text-2xl text-indigo-600 outline-none focus:border-indigo-500" />
           ))}
        </div>
        <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs italic shadow-xl">Verify Code</button>
        <div className="pt-4 flex flex-col gap-3">
           <button className="text-[10px] font-black text-indigo-500 uppercase italic">Resend Verification Code</button>
           <Link to="/login" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors italic">Return to Terminal</Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
