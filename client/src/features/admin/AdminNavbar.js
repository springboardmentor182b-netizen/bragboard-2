import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-lg border-b border-blue-500/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-200 font-semibold px-4 py-2 bg-blue-900/50 rounded-lg backdrop-blur-sm border border-blue-500/30">
              Admin Mode
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
