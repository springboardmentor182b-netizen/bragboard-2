import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Rohit", shoutouts: 25 },
  { name: "Meghana", shoutouts: 20 },
  { name: "Vignesh", shoutouts: 18 },
];

function TopContributors() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-4">Top Contributors</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="shoutouts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopContributors;
