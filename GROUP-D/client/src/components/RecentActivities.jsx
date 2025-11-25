export default function RecentActivities() {
  const activities = [
    { name: "Evan Jones", text: 'completed a report: "Resolved 5 pending feedback items from Q2"', img: "/logo1.avif" },
    { name: "Lindsey Bell", text: 'Scored a new client: "Closed the deal with Apex"', img: "/logo2.jpg" },
    { name: "John Smith", text: "Climbed the leaderboard this week", img: "/logo4.avif" },
  ];

  return (
    <div className="col-span-2 bg-[var(--card-pink)] rounded-xl p-5 card-border">
      <h3 className="font-bold text-[var(--accent-dark)] mb-4">Recent Activities</h3>

      <div className="space-y-4">
        {activities.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={item.img} alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[var(--accent-dark)]">{item.name}</div>
                <div className="text-sm mt-1 text-gray-700">{item.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
