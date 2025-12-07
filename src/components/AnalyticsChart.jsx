import { BarChart, Bar, PieChart, Pie, Cell, XAxis, Tooltip, Legend } from 'recharts';

const barData = [
  { dept: 'Development', count: 42 },
  { dept: 'Marketing', count: 30 },
  { dept: 'IT Support', count: 25 },
  { dept: 'HR', count: 15 }
];

const pieData = [
  { name: 'Development', value: 40 },
  { name: 'Marketing', value: 25 },
  { name: 'IT Support', value: 20 },
  { name: 'HR', value: 15 }
];

export default function AnalyticsChart() {
  const colors = ["#0088FE", "#FFBB28", "#00C49F", "#FF4444"];

  return (
    <div style={{
      display: "flex",
      gap: 40,
      padding: 20,
      background: "#fff",
      borderRadius: 12,
      marginBottom: 25
    }}>
      <BarChart width={400} height={280} data={barData}>
        <XAxis dataKey="dept" />
        <Tooltip />
        <Bar dataKey="count" fill="#4c8dff" />
      </BarChart>

      <PieChart width={350} height={280}>
        <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
          {pieData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
