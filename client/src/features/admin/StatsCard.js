import React from 'react';

const StatsCard = ({ title, value, trend, className = '' }) => {
  return (
    <div className={`p-8 rounded-2xl shadow-2xl border-2 backdrop-blur-lg ${className} border-blue-500/30 hover:border-blue-400/70 transition-all hover:shadow-3xl hover:-translate-y-2`}>
      <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider opacity-90 mb-2">
        {title}
      </h3>
      <div className="mt-4">
        <p className="text-4xl font-black text-white leading-tight">{value}</p>
        <p className={`text-sm font-medium mt-2 px-3 py-1 inline-block rounded-full text-xs ${trend.startsWith('+') ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
