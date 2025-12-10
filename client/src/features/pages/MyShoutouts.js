import React, { useState } from 'react';

const MyShoutouts = () => {
  // Dummy data
  const dummyShoutouts = [
    { id: 1, from: 'Alice', to: 'You', message: 'Great work on project!', type: 'received' },
    { id: 2, from: 'You', to: 'Bob', message: 'Thanks for your help!', type: 'given' },
    { id: 3, from: 'Charlie', to: 'You', message: 'Amazing presentation!', type: 'received' },
    { id: 4, from: 'You', to: 'Dana', message: 'Nice teamwork!', type: 'given' },
  ];

  const [activeTab, setActiveTab] = useState('received');

  const filteredShoutouts = dummyShoutouts.filter(
    (s) => s.type === activeTab
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Shoutouts</h1>

      {/* Tabs */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('received')}
          style={{
            marginRight: '10px',
            fontWeight: activeTab === 'received' ? 'bold' : 'normal'
          }}
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

      {/* Shoutout cards */}
      {filteredShoutouts.length === 0 ? (
        <p>No shoutouts in this tab.</p>
      ) : (
        filteredShoutouts.map((s) => (
          <div
            key={s.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            <p>
              <strong>From:</strong> {s.from} <strong>To:</strong> {s.to}
            </p>
            <p>{s.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyShoutouts;
