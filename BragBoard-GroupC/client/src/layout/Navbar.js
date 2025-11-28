import "./Navbar.css";
import { Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-left">
        <h2 className="brand">BragBoard</h2>
        <input type="text" className="search" placeholder="Search for shout-outs or teammates" />
      </div>

      <div className="nav-right">
        <Bell className="nav-icon" />
        <User className="nav-icon" />
      </div>
    </header>
  );
};

export default Navbar;
