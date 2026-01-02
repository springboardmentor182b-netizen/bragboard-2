import React from 'react';
import ChartPlaceholder from './ChartPlaceholder'; // Assuming you create this helper

// --- Department Bar Chart ---
const DepartmentBarChart = ({ data = [] }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="flex items-end justify-between h-64 gap-2 px-2">
      {data.length === 0 ? (
        <div className="w-full text-center text-gray-600 text-sm mb-20 italic">No departmental data available</div>
      ) : (
        data.map((entry, idx) => {
          const percentage = (entry.count / maxCount) * 100;
          return (
            <div key={idx} className="flex flex-col items-center w-full h-full group cursor-pointer relative justify-end">
              <div
                className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow-lg pointer-events-none z-10"
              >
                {entry.count}
              </div>
              <div
                style={{ height: `${Math.max(percentage, 2)}%` }}
                className="w-full bg-cyan-500/60 rounded-t-sm group-hover:bg-cyan-400 transition-all duration-500 ease-out border-x border-t border-cyan-400/20 shadow-[0_4px_12px_rgba(6,182,212,0.15)]"
              ></div>
              <span className="text-gray-500 text-[10px] mt-2 truncate w-full text-center group-hover:text-gray-300 transition-colors">
                {entry.department}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};

const DepartmentChart = ({ data }) => (
  <ChartPlaceholder title="Shoutouts by Department" subtitle="Distribution across teams">
    <DepartmentBarChart data={data} />
  </ChartPlaceholder>
);

export default DepartmentChart;
