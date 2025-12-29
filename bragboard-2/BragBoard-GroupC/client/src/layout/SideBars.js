import "./SideBar.css";
import { Home, Star, Trophy, FileText, Settings, Archive, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(false);
  const adminLinks = [
    { name: "Dashboard", path: "/admin/home", icon: <Home size={20} /> },
    { name: "Award", path: "/admin/award", icon: <Star size={20} /> },
    { name: "Manage Reports",icon: <FileText size={20} />,isParent: true, toggle: () => setReportsOpen(!reportsOpen),open: reportsOpen,
      submenu: [
        { name: "Resolve Reports",path: "/admin/reports/resolve",icon: <FileText size={18} />},
        {name: "Report History",path: "/admin/reports/history",icon: <Archive size={18} />}
      ]
    },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/user/home", icon: <Home size={20} /> },
    { name: "My Reports", path: "/user/reports", icon: <FileText size={20} /> },
    { name: "Leaderboard", path: "/user/leaderboard", icon: <Trophy size={20} /> },
    { name: "My Shoutouts", path: "/user/my-shoutouts", icon: <Star size={20} /> }, 
    { name: "Settings", path: "/user/settings", icon: <Settings size={20} /> },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      <ul className="menu">
        {links.map((l) => !l.isParent ?(
          <li key={l.path} className={location.pathname === l.path ? "active" : ""}>
            <Link to={l.path}>
              {l.icon}
              <span>{l.name}</span>
            </Link>
          </li>
           ) : (
            <li key={l.name} className="submenu-parent">
              <button className="submenu-btn" onClick={l.toggle}>
                {l.icon}
                <span>{l.name}</span>
                <ChevronDown
                  size={16}
                  style={{
                    marginLeft: "auto",
                    transform: l.open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.2s"
                  }}
                />
              </button>

              {l.open && (
                <ul className="submenu">
                  {l.submenu.map((sub) => (
                    <li
                      key={sub.path}
                      className={
                        location.pathname === sub.path ? "active" : ""
                      }
                    >
                      <Link to={sub.path}>
                        {sub.icon}
                        <span>{sub.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
