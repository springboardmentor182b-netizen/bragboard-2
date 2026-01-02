import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Header from '../layout/Header';
import FeedPost from '../components/FeedPost';
import './MyShoutouts.css';

const MyShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.user_id);
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
    fetchShoutouts();
  }, [fetchShoutouts]);

  const fetchShoutouts = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.get('http://127.0.0.1:8000/shoutouts', config);

      // Format shoutouts for FeedPost component
      const formatted = res.data.map(item => {
        const likedByMe = (item.likes || []).some(l => l.user_id === currentUserId || l.id === currentUserId);
        const recipientIds = (item.recipients || []).map(r => r.id);

        return {
          id: item.id,
          sender: item.sender.name,
          sender_id: item.sender.id,
          recipient_ids: recipientIds,
          senderAvatar: '',
          department: item.sender.department,
          timestamp: new Date(item.created_at).toLocaleString(),
          message: item.message,
          taggedUsers: (item.recipients || []).map(r => r.name),
          reactions: {
            emoji: 0,
            thumbsUp: (item.likes || []).length,
            likedByMe: likedByMe
          },
          likes: item.likes || [],
          comments: item.comments || []
        };
      });
      setShoutouts(formatted);
    } catch (err) {
      console.error("Error fetching shoutouts:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  const filteredShoutouts = shoutouts.filter(s => {
    if (activeTab === 'received') {
      return s.recipient_ids.includes(currentUserId);
    } else {
      return s.sender_id === currentUserId;
    }
  });

  return (
    <div className="my-shoutouts-container">
      <Header />
      <main className="my-shoutouts-content">
        <header className="page-header">
          <h1 className="page-title">My Shoutouts</h1>
          <div className="tabs-container">
            <button
              className={`tab-button ${activeTab === 'received' ? 'active' : ''}`}
              onClick={() => setActiveTab('received')}
            >
              Received
            </button>
            <button
              className={`tab-button ${activeTab === 'given' ? 'active' : ''}`}
              onClick={() => setActiveTab('given')}
            >
              Given
            </button>
          </div>
        </header>

        {loading ? (
          <div className="empty-state">
            <p>Loading your shoutouts...</p>
          </div>
        ) : filteredShoutouts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📢</span>
            <h3>No shoutouts yet</h3>
            <p>Shoutouts you {activeTab === 'received' ? 'receive' : 'give'} will appear here.</p>
          </div>
        ) : (
          <div className="shoutouts-list">
            {filteredShoutouts.map((s) => (
              <div key={s.id} className="shoutout-card">
                <FeedPost
                  shoutout={s}
                  onReport={() => { }}
                  currentUserId={currentUserId}
                  onInteraction={fetchShoutouts}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyShoutouts;
