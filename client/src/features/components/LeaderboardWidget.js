import './Widget.css';

function LeaderboardWidget() {
  const leaders = [
    { name: 'Eleanor Pena', score: 15 },
    { name: 'Cody Fisher', score: 15 },
    { name: 'Eather Howard', score: 6 },
  ];

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

