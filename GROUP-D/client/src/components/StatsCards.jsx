export default function StatsCards() {
  const stats = [
    { label: "Shoutouts Given", value: 10 },
    { label: "Shoutouts Received", value: 15 },
    { label: "Current Rank", value: "#5" },
    { label: "Points Accumulated", value: 115 },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((item) => (
        <div key={item.label} className="bg-[var(--card-pink)] rounded-xl p-4 text-center card-border">
          <div className="text-sm text-[var(--accent-dark)]">{item.label}</div>
          <div className="text-2xl font-bold mt-1">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
