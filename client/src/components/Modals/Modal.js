import React from 'react';

const Modal = ({ children, title, onClose, className = '', show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}>
        <div className="bg-gradient-to-br from-slate-800 via-blue-900/50 to-slate-800 rounded-2xl border border-blue-500/40 shadow-2xl">
          <div className="p-6 border-b border-blue-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl font-bold p-1 rounded-full hover:bg-white/10 transition-all"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;