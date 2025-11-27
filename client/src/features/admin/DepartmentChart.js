import React from 'react';
import ChartPlaceholder from './ChartPlaceholder'; // Assuming you create this helper

// --- Department Bar Chart ---
const DepartmentBarChart = () => (
  <div className="flex items-end justify-between h-64 gap-2 px-2">
    {[
      { label: 'Eng', h: 'h-64', val: '340' },
      { label: 'Dsg', h: 'h-48', val: '255' },
      { label: 'Prod', h: 'h-32', val: '170' },
      { label: 'Mkt', h: 'h-24', val: '140' },
      { label: 'Sales', h: 'h-20', val: '110' }
    ].map((bar, idx) => (
      <div key={idx} className="flex flex-col items-center w-full group cursor-pointer">
        <div className={`w-full ${bar.h} bg-cyan-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all`}></div>
        <span className="text-gray-500 text-xs mt-2 transform -rotate-45 md:rotate-0">{bar.label}</span>
      </div>
    ))}
  </div>
);

const DepartmentChart = () => (
    <ChartPlaceholder title="Shoutouts by Department" subtitle="Distribution across teams">
        <DepartmentBarChart />
    </ChartPlaceholder>
);

export default DepartmentChart;