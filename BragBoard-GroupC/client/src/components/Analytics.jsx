import React from 'react';

const Analytics = () => {
  const departmentData = [
    { department: 'DEVELOPMENT', shoutouts: 40, percentage: '40%' },
    { department: 'MARKETING', shoutouts: 25, percentage: '25%' },
    { department: 'IT SUPPORT', shoutouts: 20, percentage: '20%' },
    { department: 'HR', shoutouts: 15, percentage: '15%' }
  ];

  const reportData = {
    resolved: 46,
    pending: 8
  };

  return (
    <div className="analytics-section">
      <h2>Reporting Analytics</h2>
      
      <div className="analytics-grid">
        {/* Shout-outs Chart */}
        <div className="analytics-card">
          <h3>SHOUT-OUTS RECEIVED BY EMPLOYEES</h3>
          <div className="department-table">
            {departmentData.map((dept, index) => (
              <div key={dept.department} className="department-row">
                <div className="dept-name">{dept.department}</div>
                <div className="dept-bar">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${dept.shoutouts}%` }}
                  ></div>
                </div>
                <div className="dept-percentage">{dept.percentage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports Summary */}
        <div className="analytics-card">
          <h3>Reports Summary</h3>
          <div className="reports-grid">
            <div className="report-card resolved">
              <div className="report-icon">✅</div>
              <div className="report-content">
                <div className="report-count">{reportData.resolved}</div>
                <div className="report-label">Reports Resolved</div>
              </div>
            </div>
            <div className="report-card pending">
              <div className="report-icon">⏳</div>
              <div className="report-content">
                <div className="report-count">{reportData.pending}</div>
                <div className="report-label">Reports To Be Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;