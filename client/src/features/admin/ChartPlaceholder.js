import React from 'react';

const ChartPlaceholder = ({ title, subtitle, children }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col h-full">
    <h3 className="text-white font-bold text-lg">{title}</h3>
    <p className="text-gray-500 text-xs mb-6">{subtitle}</p>
    <div className="flex-1 w-full relative">
      {children}
    </div>
  </div>
);

export default ChartPlaceholder;