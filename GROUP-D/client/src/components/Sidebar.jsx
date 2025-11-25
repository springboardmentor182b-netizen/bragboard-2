import React from "react";

export default function Sidebar() {
  return (
    <aside className="sidebar text-white h-screen p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">BragBoard</h1>
      </div>

      <button className="btn-create rounded-xl py-2 px-3 font-semibold w-full mb-6">
        Admin DashBoard
      </button>

      <nav className="flex-1 text-sm space-y-4">
        <a className="block text-white/95 hover:text-black">Dashboard</a>
        <a href="/shoutouts" className="block text-white/95 hover:text-black">My Shoutouts</a>
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
  );
}
