import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-white shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="text-xl font-bold text-blue-600">BragBoard</div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search for shout-outs or teammates"
            className="w-96 px-4 py-2 rounded-full bg-gray-100 outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Reminder / Bell button */}
        <button
          onClick={() => alert("Reminders coming soon!")}
          aria-label="Reminders"
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {/* simple bell svg */}
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* profile avatar */}
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center text-sm font-medium text-white"
          title="Profile"
        >
          V
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
