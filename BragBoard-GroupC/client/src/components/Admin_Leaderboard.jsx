import React from 'react';

const Leaderboard = () => {
  const topContributors = [
    { name: 'Camille', score: 42 },
    { name: 'Lee', score: 38 },
    { name: 'Lily', score: 20 }
  ];

  const mostTagged = [
    { message: 'Excellent work', count: 120 },
    { message: 'Thank You!', count: 88 },
    { message: 'Great Idea', count: 40 }
  ];

  return (
    <div className="leaderboard-section">
      <h3>Top Contributors</h3>
      <div className="leaderboard-cards">
        <div className="leaderboard-card">
    
          </div>
        </div>
    </div>
  );
};

export default Leaderboard;