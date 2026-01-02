import { useState, useEffect } from 'react';
import axios from 'axios';
import './Widget.css';

function LeaderboardWidget() {
  /* 
  Mock data removed.
  Fetching leaders from API.
  */
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        // No auth needed for leaderboard? Or use token if available. 
        // Assuming public or use header if needed.
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await axios.get('http://127.0.0.1:8000/users/leaderboard', config);
        setLeaders(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaders();
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="widget-card">
      <h3 className="widget-title">Leaderboard</h3>
      <div className="widget-content">
        {leaders.map((leader, index) => (
          <div key={index} className="leaderboard-item">
            <div className="widget-avatar">
              <span className="avatar-initials">{getInitials(leader.name)}</span>
            </div>
            <div className="widget-item-info">
              <span className="widget-item-name">{leader.name}</span>
            </div>
            <div className="widget-item-value">{leader.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardWidget;

