import './Widget.css';

function RecentReactionsWidget() {
  const reactions = [
    { user: 'Kristen Watts', action: 'Jane acted on - 41 others' },
    { user: 'Marvin McKinney', action: 'Cody reacted on - 8 others' },
    { user: 'Jane Cooper', action: 'Darlene reacted an 1 hour' },
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
      <h3 className="widget-title">Recent Reactions</h3>
      <div className="widget-content">
        {reactions.map((reaction, index) => (
          <div key={index} className="widget-item">
            <div className="widget-avatar">
              <span className="avatar-initials">{getInitials(reaction.user)}</span>
            </div>
            <div className="widget-item-info">
              <span className="widget-item-name">{reaction.user}</span>
              <span className="widget-item-action">{reaction.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentReactionsWidget;

