export default function TopBar() {
  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="flex-1 bg-[var(--header-pink)] rounded-xl p-3 card-border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-[var(--accent-dark)]">Dashboard</div>
          <div className="flex items-center gap-3">
            <div className="w-80 bg-[var(--white)] rounded-full px-4 py-2">
              <input className="w-full bg-transparent outline-none text-sm" placeholder="Search..." />
            </div>
            <div className="text-xl">🔔</div>
          </div>
        </div>
      </div>
    </div>
  );
}
