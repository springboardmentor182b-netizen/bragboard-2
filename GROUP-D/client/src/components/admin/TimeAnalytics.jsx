import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { period: "Week 1", count: 10 },
  { period: "Week 2", count: 18 },
  { period: "Week 3", count: 25 },
  { period: "Week 4", count: 30 },
];

function TimeAnalytics() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-4">
        Time-based Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Line dataKey="count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimeAnalytics;
