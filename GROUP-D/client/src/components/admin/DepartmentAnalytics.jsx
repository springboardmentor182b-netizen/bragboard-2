import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "IT", value: 40 },
  { name: "HR", value: 25 },
  { name: "Finance", value: 15 },
];

function DepartmentAnalytics() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-4">
        Department-wise Analytics
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentAnalytics;
