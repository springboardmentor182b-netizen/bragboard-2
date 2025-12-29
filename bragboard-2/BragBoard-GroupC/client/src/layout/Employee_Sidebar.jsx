import React from "react";

const Employee_Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fa-solid fa-chart-line" },
    { key: "leaderboard", label: "Leaderboard", icon: "fa-solid fa-trophy" },
    { key: "my-shoutouts", label: "My Shoutouts", icon: "fa-solid fa-comment-dots" },
    { key: "notifications", label: "Notifications", icon: "fa-solid fa-bell" },
  ];

  const departments = ["HR", "CyberSecurity", "Deployment"];

  return (
    <div className="sidebar bg-white shadow-lg min-h-screen w-64 p-4">
      <div className="sidebar-header mb-6">
        <h2 className="text-xl font-bold text-gray-800">BragBoard</h2>
      </div>

      <nav className="sidebar-nav mb-6">
        <ul className="nav-menu space-y-2">
          {menuItems.map((item) => (
            <li key={item.key} className="nav-item">
              <button
                className={`nav-link flex items-center gap-2 w-full p-2 rounded-md text-left ${
                  activeSection === item.key
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.key)}
              >
                <i className={item.icon}></i>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Employee_Sidebar;
