
import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
      <div className="w-32 h-32 bg-rose-50 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border border-rose-100 mb-10 grayscale-0">🚫</div>
      <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter mb-4">Security Breach</h1>
      <p className="text-slate-500 font-medium max-w-sm mx-auto mb-12 leading-relaxed italic text-lg">
        Identity validation failed for this sector. Access restricted based on your current clearance tier.
      </p>
      <Link to="/" className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-3xl hover:bg-indigo-600 hover:-translate-y-1 transition-all italic">
        Return to Safe Zone
      </Link>
    </div>
  );
};

export default AccessDenied;
