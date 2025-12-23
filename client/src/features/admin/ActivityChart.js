import React from 'react';
import ChartPlaceholder from './ChartPlaceholder'; // Assuming you create this helper

// --- Weekly Activity Line Chart ---
const WeeklyActivityLineChart = () => (
  <div className="relative h-64 border-l border-b border-gray-700 w-full">
    {[0, 1, 2, 3].map(i => (
      <div key={i} className="absolute w-full border-t border-gray-700/30" style={{ bottom: `${i * 25}%` }}></div>
    ))}
    <svg className="absolute inset-0 w-full h-full overflow-visible">
       <polyline 
         fill="none" 
         stroke="#3b82f6" 
         strokeWidth="3" 
         points="0,200 100,180 200,190 300,150 400,170 500,220 600,240" 
       />
       <polyline 
         fill="none" 
         stroke="#10b981" 
         strokeWidth="3" 
         points="0,150 100,130 200,140 300,100 400,120 500,180 600,190" 
       />
    </svg>
    <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500 pt-2">
      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
    </div>
  </div>
);

const ActivityChart = () => (
    <ChartPlaceholder title="Weekly Activity" subtitle="Shoutouts and engagement trends">
        <WeeklyActivityLineChart />
    </ChartPlaceholder>
);

export default ActivityChart;
