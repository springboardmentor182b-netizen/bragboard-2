import React from 'react';
import ChartPlaceholder from './ChartPlaceholder'; // Assuming you create this helper

// --- Weekly Activity Line Chart ---
const WeeklyActivityLineChart = ({ data = [] }) => {
  // SVG Height is 256 (h-64)
  const height = 256;
  const width = 600; // Arbitrary wide base for points

  const maxCount = Math.max(...data.map(d => d.count), 5); // Fallback to 5 for scale

  const getPoints = () => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1 || 1)) * width;
      const y = height - (d.count / maxCount) * height * 0.8 - 20; // 0.8 to keep it within bounds
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="relative h-64 border-l border-b border-gray-700 w-full overflow-hidden">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="absolute w-full border-t border-gray-700/30" style={{ bottom: `${i * 25}%` }}></div>
      ))}
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 w-full h-full overflow-visible preserve-3d">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={getPoints()}
          className="transition-all duration-700 ease-in-out"
        />
        {/* Subtle gradient area under the curve */}
        <polygon
          points={`${getPoints()} ${width},${height} 0,${height}`}
          fill="url(#chartGradient)"
          style={{ opacity: 0.1 }}
        />
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Individual data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1 || 1)) * width;
          const y = height - (d.count / maxCount) * height * 0.8 - 20;
          return (
            <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" />
          );
        })}
      </svg>
      <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-gray-500 pt-2 px-1">
        {data.map((d, i) => <span key={i}>{d.day}</span>)}
      </div>
    </div>
  );
};

const ActivityChart = ({ data }) => (
  <ChartPlaceholder
    title="Weekly Activity"
    subtitle="Shoutouts and engagement trends"
    action={
      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-medium">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span>Shoutouts</span>
        </div>
      </div>
    }
  >
    <WeeklyActivityLineChart data={data} />
  </ChartPlaceholder>
);

export default ActivityChart;
