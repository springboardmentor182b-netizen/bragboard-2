import { useState, useEffect } from 'react';
import axios from 'axios';
import './Widget.css';

function TopTaggedWidget() {
  /*
  Mock data removed.
  Fetching top everyone from API.
  */
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchTopTagged = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await axios.get('http://127.0.0.1:8000/users/top-tagged', config);
        // API returns objects { name, score, ... }, map to just names or keep objects?
        // Widget expects strings in map currently? No, map calls `employee` (string).
        // Let's adapt the map to consume objects.
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching top tagged:", error);
      }
    };
    fetchTopTagged();
  }, []);

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
              <span className="avatar-initials">{getInitials(employee.name)}</span>
            </div>
            <div className="widget-item-info">
              <span className="widget-item-name">{employee.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTaggedWidget;

