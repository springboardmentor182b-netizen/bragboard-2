import React, { useState, useEffect } from "react";
import { Award } from "lucide-react";
import "./EmployeeMyShoutouts.css";

// Mock shoutouts data
const mockShoutouts = [
  {
    id: 1,
    message: "Arshit did such an amazing job creating all these designs!",
    recipient: "@arshitsaraff",
    category: "HR",
    timestamp: "2024-01-15",
  },
  {
    id: 2,
    message: "Pranjali did such an amazing job on her designs!",
    recipient: "@prajaliaivale",
    category: "HR",
    timestamp: "2024-01-14",
  },
  {
    id: 3,
    message: "Yeshwanath did such an amazing job creating the admin panel!",
    recipient: "@yeshwanath",
    category: "CyberSecurity",
    timestamp: "2024-01-13",
  },
];

const MyShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [filters, setFilters] = useState({
    HR: false,
    CyberSecurity: false,
    Deployment: false,
  });

  // Load mock shoutouts + saved filters
  useEffect(() => {
    setShoutouts(mockShoutouts);
    const saved = localStorage.getItem("bragboard_filters");
    if (saved) setFilters(JSON.parse(saved));
  }, []);

  // Filter shoutouts based on selected categories
  const filteredShoutouts = shoutouts.filter((shoutout) => {
    const active = Object.keys(filters).filter((k) => filters[k]);
    if (active.length === 0) return true; // no filter = show all
    return active.includes(shoutout.category);
  });

  return (
    <div className="shoutouts-page">
      <h1 className="shoutouts-title">My Shout-outs</h1>

      {filteredShoutouts.length > 0 ? (
        <div className="shoutouts-list">
          {filteredShoutouts.map((shoutout) => (
            <div key={shoutout.id} className="shoutout-card">
              <p className="shoutout-message">{shoutout.message}</p>
              <span className="shoutout-recipient">{shoutout.recipient}</span>
              <span className="shoutout-category">{shoutout.category}</span>
              <span className="shoutout-date">{shoutout.timestamp}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-shoutouts">
          <Award className="no-shoutouts-icon" />
          <p>No shout-outs match your filters</p>
        </div>
      )}
    </div>
  );
};

export default MyShoutouts;
