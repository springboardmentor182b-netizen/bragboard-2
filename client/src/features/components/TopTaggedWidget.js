import './Widget.css';

function TopTaggedWidget() {
  const employees = ['Jane Cooper', 'Jenny Wilson', 'Kristin Watson'];

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
      <h3 className="widget-title">Top Tagged Employees</h3>
      <div className="widget-content">
        {employees.map((employee, index) => (
          <div key={index} className="widget-item">
            <div className="widget-avatar">
              <span className="avatar-initials">{getInitials(employee)}</span>
            </div>
            <div className="widget-item-info">
              <span className="widget-item-name">{employee}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTaggedWidget;

