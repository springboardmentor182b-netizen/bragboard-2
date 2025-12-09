import "./SideBar.css";
import { Home, Star, Trophy, FileText, Settings, Archive, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ role }) => {
  const location = useLocation();

  const adminLinks = [
    { name: "Dashboard", path: "/admin/home", icon: <Home size={20} /> },
    { name: "Award", path: "/admin/award", icon: <Star size={20} /> },
    { name: "Resolve Reports", path: "/admin/reports", icon: <FileText size={20} /> },
    { name: "Export Reports", path: "/admin/export", icon: <Archive size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/user/home", icon: <Home size={20} /> },
    { name: "My Reports", path: "/user/reports", icon: <FileText size={20} /> },
    { name: "Leaderboard", path: "/user/leaderboard", icon: <Trophy size={20} /> },
    { name: "Settings", path: "/user/settings", icon: <Settings size={20} /> },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      <ul className="menu">
        {links.map((l) => (
          <li key={l.path} className={location.pathname === l.path ? "active" : ""}>
            <Link to={l.path}>
              {l.icon}
              <span>{l.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
