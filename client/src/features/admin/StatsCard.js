import React from 'react';

// --- WIDGETS COMPONENT (Stat Card) ---
const StatCard = ({ title, value, change, icon: Icon, isNegative }) => (
  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start">
      <span className="text-gray-400 text-sm font-medium">{title}</span>
      <Icon className="text-blue-500" size={20} />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
      <span className={`text-xs font-bold mt-1 inline-block ${isNegative ? 'text-red-400' : 'text-green-400'}`}>
        {change}
      </span>
    </div>
  </div>
);

export default StatCard;