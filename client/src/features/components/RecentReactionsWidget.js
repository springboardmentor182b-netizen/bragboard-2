import { useState, useEffect } from 'react';
import axios from 'axios';
import './Widget.css';

function RecentReactionsWidget() {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    fetchRecentReactions();
  }, []);

  const fetchRecentReactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.get('http://127.0.0.1:8000/shoutouts/reactions/recent', config);
      setReactions(response.data);
    } catch (error) {
      console.error("Error fetching recent reactions:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="widget-card">
      <h3 className="widget-title">Recent Comments</h3>
      <div className="widget-content">
        {reactions.length === 0 ? (
          <p style={{ color: '#666', fontSize: '0.9rem', padding: '10px' }}>No recent comments.</p>
        ) : (
          reactions.map((reaction, index) => (
            <div key={index} className="widget-item">
              <div className="widget-avatar">
                <span className="avatar-initials">{getInitials(reaction.author?.name)}</span>
              </div>
              <div className="widget-item-info">
                <span className="widget-item-name">{reaction.author?.name}</span>
                <span className="widget-item-action">
                  commented: "{reaction.content && reaction.content.length > 30 ? reaction.content.substring(0, 30) + '...' : reaction.content}"
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentReactionsWidget;
