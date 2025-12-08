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
          <h4>Employees</h4>
          <div className="contributors-list">
            {topContributors.map((contributor, index) => (
              <div key={contributor.name} className="contributor-item">
                <span className="rank">{index + 1}.</span>
                <span className="name">{contributor.name}</span>
                <span className="score">{contributor.score}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="leaderboard-card">
          <h4>Most Tagged Phrases</h4>
          <div className="tagged-list">
            {mostTagged.map((item, index) => (
              <div key={item.message} className="tagged-item">
                <span className="rank">{index + 1}.</span>
                <span className="message">{item.message}</span>
                <span className="count">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;