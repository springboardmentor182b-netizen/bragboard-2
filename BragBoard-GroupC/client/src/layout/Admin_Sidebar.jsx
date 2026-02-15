import React from "react";
import { NavLink } from "react-router-dom";

const Admin_Sidebar = () => {
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "fa-solid fa-chart-line" },
    { path: "/admin/users", label: "Users", icon: "fa-solid fa-users" },
    { path: "/admin/reports/resolve", label: "Resolve Reports", icon: "fa-solid fa-chart-bar" },
    { path: "/admin/reports/export", label: "Export Reports", icon: "fa-solid fa-file-export" },
    { path: "/admin/notifications", label: "Notifications", icon: "fa-solid fa-bell" },
    { path: "/admin/settings", label: "Settings", icon: "fa-solid fa-gear" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>BragBoard</h2>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map(item => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <i className={item.icon}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Admin_Sidebar;
