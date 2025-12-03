import React from "react";
import { LucideBell } from "lucide-react";
import "./Admin_Header.css";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for shoutouts and teammates.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search"
          />
        </div>
      </div>
      <div className="header-right">
        <div className="notification">
          <LucideBell size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
