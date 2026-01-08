export default function LeaderboardTable({ employees }) {
  const badge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--card-pink)]">
          <tr>
            <th className="px-6 py-4">Rank</th>
            <th className="px-6 py-4">Employee</th>
            <th className="px-6 py-4">Total Hours</th>
            <th className="px-6 py-4">Weekly Hours</th>
            <th className="px-6 py-4">Report</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id} className="border-b hover:bg-pink-50">
              <td className="px-6 py-4 font-bold">
                {badge(index + 1)}
              </td>
              <td className="px-6 py-4 font-medium">{emp.name}</td>
              <td className="px-6 py-4">{emp.total_hours} hrs</td>
              <td className="px-6 py-4">{emp.weekly_hours} hrs</td>
              <td className="px-6 py-4 text-gray-600">{emp.report}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
