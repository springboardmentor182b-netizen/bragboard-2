import React, { useEffect, useState } from 'react';

const Admin_Analytics = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [reportData, setReportData] = useState({
    resolved: 0,
    pending: 0
  });

  const ADMIN_ID = 1;
  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/analytics?admin_id=${ADMIN_ID}`
      );
      const data = await response.json();
      const totalShoutouts = data.shoutouts.total_shoutouts || 0;

      const mappedDepartmentData = [
        {
          department: 'TOTAL SHOUTOUTS',
          shoutouts: totalShoutouts,
          percentage: '100%'
        }
      ];

      setDepartmentData(mappedDepartmentData);

      setReportData({
        resolved: data.reports.resolved_reports,
        pending: data.reports.pending_reports
      });

    } catch (error) {
      console.error('Failed to load analytics', error);
    }
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
              <div key={index} className="department-row">
                <div className="dept-name">{dept.department}</div>

                <div className="dept-bar">
                  <div
                    className="bar-fill"
                    style={{ width: dept.percentage }}
                  ></div>
                </div>

                <div className="dept-percentage">
                  {dept.percentage}
                </div>
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
                <div className="report-count">
                  {reportData.resolved}
                </div>
                <div className="report-label">
                  Reports Resolved
                </div>
              </div>
            </div>

            <div className="report-card pending">
              <div className="report-icon">⏳</div>
              <div className="report-content">
                <div className="report-count">
                  {reportData.pending}
                </div>
                <div className="report-label">
                  Reports To Be Resolved
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin_Analytics;
