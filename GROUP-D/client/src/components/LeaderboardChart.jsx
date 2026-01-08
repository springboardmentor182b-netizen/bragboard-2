import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function LeaderboardChart({ data, title }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h3 className="font-semibold mb-3">{title}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="weekly_hours" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
