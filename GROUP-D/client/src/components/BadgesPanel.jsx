export default function BadgesPanel() {
  return (
    <div className="bg-[var(--card-pink)] rounded-xl p-5 card-border">
      <h3 className="font-bold text-[var(--accent-dark)] mb-4">Badges panel</h3>

      <ul className="space-y-2 text-sm">
        <li>🏆 Top Contributor</li>
        <li>🌟 Creative Mind</li>
        <li>🤝 Team Player</li>
        <li>⚡ Active Engager</li>
        <li>💡 Idea Generator</li>
      </ul>

      <div className="mt-6 bg-white rounded-xl p-4 text-center">
        <div className="text-4xl font-extrabold text-[var(--accent-dark)]">35</div>
        <div className="mt-1 font-medium text-gray-700">Total Activities</div>
      </div>
    </div>
  );
}
