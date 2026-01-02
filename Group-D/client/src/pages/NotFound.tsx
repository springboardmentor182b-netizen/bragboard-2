
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700">
      <div className="text-9xl mb-8 grayscale group-hover:grayscale-0 transition-all cursor-default">🛰️</div>
      <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter mb-4">Space Not Found</h1>
      <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed italic">
        The page you are looking for has drifted out of orbit. Let's get you back to the board.
      </p>
      <Link to="/" className="px-10 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:translate-y-0">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
