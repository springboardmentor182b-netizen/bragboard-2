import React, { useState, useEffect } from 'react';
import axios from 'axios';

const loggedInUser = "You"; // Replace with actual logged-in user later
import jwt_decode from 'jwt-decode';

let loggedInUser = "";
const token = localStorage.getItem("token"); // the key you use to store JWT
if (token) {
  const decoded = jwt_decode(token);
  loggedInUser = decoded.email || decoded.username; // use the field your JWT has
}

const MyShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShoutouts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/shoutouts'); // your backend API
        setShoutouts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShoutouts();
  }, []);

  const filteredShoutouts = shoutouts.filter(s =>
    (activeTab === 'received' && s.to === loggedInUser) ||
    (activeTab === 'given' && s.from === loggedInUser)
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
