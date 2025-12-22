import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { jwtDecode } from 'jwt-decode';

let loggedInUser = "You";
const token = localStorage.getItem("token"); // the key you use to store JWT
if (token) {
  try {
    const decoded = jwtDecode(token);
    loggedInUser = decoded.email || decoded.username || "You";
  } catch (e) {
    console.error("Invalid token", e);
  }
}

const MyShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShoutouts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const res = await axios.get('http://localhost:8000/shoutouts', config);
        // Backend returns generic list. Client side filtering logic remains for now since API doesn't filter yet.
        setShoutouts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShoutouts();
  }, []);

  // Simple mapping for display since backend model differs from initial frontend assumptions
  const filteredShoutouts = shoutouts.map(s => ({
    ...s,
    from: s.sender?.name || 'Unknown',
    to: 'Me' // Assuming 'to' is consistent for My Shoutouts or needs mapping if we had recipient name
  })).filter(s =>
    // Logic needs to adapt to API data. 
    // API returns all shoutouts (as implemented in controller currently).
    // Filtering should be based on user ID from token vs sender_id / recipient_id in data.
    // For now, simple pass-through to show data flow.
    true
  );

  if (loading) return <p>Loading shoutouts...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Shoutouts</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('received')}
          style={{ marginRight: '10px', fontWeight: activeTab === 'received' ? 'bold' : 'normal' }}
        >
          Received
        </button>
        <button
          onClick={() => setActiveTab('given')}
          style={{ fontWeight: activeTab === 'given' ? 'bold' : 'normal' }}
        >
          Given
        </button>
      </div>

      {filteredShoutouts.length === 0 ? (
        <p>No shoutouts in this tab.</p>
      ) : (
        filteredShoutouts.map((s) => (
          <div key={s.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
            <p><strong>From:</strong> {s.from} <strong>To:</strong> {s.to}</p>
            <p>{s.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyShoutouts;
