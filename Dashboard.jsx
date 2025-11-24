import React from "react";

/* Make sure you add an avatar image to: /public/avatar.png
   or change src to any image URL you prefer.
*/

export default function Dashboard() {
  return (
    <div className="app-shell min-h-screen flex items-start">
      {/* Sidebar */}
      <aside className="sidebar text-white h-screen p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">BragBoard</h1>
        </div>

        <button className="btn-create rounded-xl py-2 px-3 font-semibold w-full mb-6">
          Admin DashBoard
        </button>

        <nav className="flex-1 text-sm space-y-4">
          <a className="block text-white/95 hover:text-black">Dashboard</a>
          <a  href="/shoutouts" className="block text-white/95 hover:text-black">My Shoutouts</a>
          <a className="block text-white/95 hover:text-black">Leader Board</a>
          <a className="block text-white/95 hover:text-black">Community</a>
          <a className="block text-white/95 hover:text-black">Reports</a>
          <a className="block text-white/95 hover:text-black">Upgrade</a>
        </nav>

        <div className="mt-auto space-y-2 text-sm">
          <a className="block text-white/95 hover:text-black">User</a>
          <a className="block text-white/95 hover:text-black">Logout</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Top bar */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex-1 bg-[var(--header-pink)] rounded-xl p-3 card-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium text-[var(--accent-dark)]">Dashboard</div>
              <div className="flex items-center gap-3">
                <div className="w-80 bg-[var(--white)] rounded-full px-4 py-2">
                  <input
                    className="w-full bg-transparent outline-none text-sm"
                    placeholder="Search..."
                  />
                </div>
                <div className="text-xl">🔔</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero banner */}
        <div className="bg-[var(--header-pink)] rounded-xl p-5 mb-6 card-border flex items-center justify-between overflow-hidden">
          <div>
            <h2 className="text-2xl font-bold text-[var(--accent-dark)]">Hi, User</h2>
            <p className="text-sm text-[var(--accent-dark)]/85 mt-1">
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-40 h-24 avatar-blob rounded-2xl flex items-center justify-center px-3">
              <img
                src="/logo3.avif"
                alt="avatar"
                className="object-cover w-28 h-20 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--card-pink)] rounded-xl p-4 text-center card-border">
            <div className="text-sm text-[var(--accent-dark)]">Shoutouts Given</div>
            <div className="text-2xl font-bold mt-1">10</div>
          </div>

          <div className="bg-[var(--card-pink)] rounded-xl p-4 text-center card-border">
            <div className="text-sm text-[var(--accent-dark)]">Shoutouts Received</div>
            <div className="text-2xl font-bold mt-1">15</div>
          </div>

          <div className="bg-[var(--card-pink)] rounded-xl p-4 text-center card-border">
            <div className="text-sm text-[var(--accent-dark)]">Current Rank</div>
            <div className="text-2xl font-bold mt-1">#5</div>
          </div>

          <div className="bg-[var(--card-pink)] rounded-xl p-4 text-center card-border">
            <div className="text-sm text-[var(--accent-dark)]">Points Accumulated</div>
            <div className="text-2xl font-bold mt-1">115</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent Activities (col-span 2) */}
          <div className="col-span-2 bg-[var(--card-pink)] rounded-xl p-5 card-border">
            <h3 className="font-bold text-[var(--accent-dark)] mb-4">Recent Activities</h3>

            <div className="space-y-4">
              {/* activity item */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/logo1.avif" alt="u" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[var(--accent-dark)]">Evan Jones</div>
                      <div className="text-xs text-gray-500">oct 10, 2025</div>
                    </div>
                    <div className="text-sm mt-1 text-gray-700">
                      completed a report: "Resolved 5 pending feedback items from Q2"
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/logo2.jpg" alt="u" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[var(--accent-dark)]">Lindsey Bell</div>
                      <div className="text-xs text-gray-500">oct 10, 2025</div>
                    </div>
                    <div className="text-sm mt-1 text-gray-700">Scored a new client: "Closed the deal with Apex"</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/logo4.avif" alt="u" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[var(--accent-dark)]">John Smith</div>
                      <div className="text-xs text-gray-500">oct 10, 2025</div>
                    </div>
                    <div className="text-sm mt-1 text-gray-700">Climbed the leaderboard this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges panel */}
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
        </div>
      </main>
    </div>
  );
}