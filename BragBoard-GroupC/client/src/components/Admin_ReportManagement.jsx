import React, { useState } from "react";

const Admin_ReportManagement = ({ activeSection }) => {
  const [resolveReports, setResolveReports] = useState([
    {
      id: 1,
      date: "20/11/2025",
      department: "ENG",
      team: "TEAM-A",
      employee: "EMP-001",
      content: "Inappropriate comment on team post",
    },
    {
      id: 2,
      date: "19/11/2025",
      department: "SALES",
      team: "TEAM-B",
      employee: "EMP-042",
      content: "Spam content shared multiple times",
    },
    {
      id: 3,
      date: "17/11/2025",
      department: "ENG",
      team: "TEAM-D",
      employee: "EMP-089",
      content: "Offensive language in shoutout message",
    },
    {
      id: 4,
      date: "15/11/2025",
      department: "SALES",
      team: "TEAM-F",
      employee: "EMP-456",
      content: "Duplicate spam submissions detected",
    },
  ]);

  const [historyReports, setHistoryReports] = useState([]);

  // MOVE REPORT TO HISTORY
  const markResolved = (report) => {
    setResolveReports((prev) =>
      prev.filter((item) => item.id !== report.id)
    );

    setHistoryReports((prev) => [
      ...prev,
      { ...report, status: "Resolved", resolvedOn: new Date().toLocaleDateString("en-GB") },
    ]);
  };

  // CHOOSE WHICH LIST TO DISPLAY
  const reportsToShow =
    activeSection === "resolve-reports" ? resolveReports : historyReports;

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}>
        {activeSection === "resolve-reports"
          ? "Resolve Reports"
          : "Report History"}
      </h2>

      {/* CARD LIST */}
      {reportsToShow.length === 0 ? (
        <p style={{ color: "gray" }}>No reports found.</p>
      ) : (
        reportsToShow.map((report, index) => (
          <div
            key={report.id}
            style={{
              background: "#F3F7FF",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #E3E9FF",
            }}
          >
            {/* LEFT SIDE NUMBER */}
            <div style={{ fontWeight: "600", fontSize: "18px", width: "40px" }}>
              {index + 1}.
            </div>

            {/* MIDDLE INFO */}
            <div style={{ display: "flex", gap: "80px", flexGrow: 1 }}>
              {/* Date */}
              <div>
                <div style={{ color: "#555", fontSize: "14px" }}>Date</div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>
                  {report.date}
                </div>
              </div>

              {/* Department */}
              <div>
                <div style={{ color: "#555", fontSize: "14px" }}>
                  Department
                </div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>
                  {report.department}
                </div>
              </div>

              {/* Team */}
              <div>
                <div style={{ color: "#555", fontSize: "14px" }}>Team</div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>
                  {report.team}
                </div>
              </div>

              {/* Employee */}
              <div>
                <div style={{ color: "#555", fontSize: "14px" }}>Employee</div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>
                  {report.employee}
                </div>
              </div>

              {/* Content */}
              <div style={{ width: "320px" }}>
                <div style={{ color: "#555", fontSize: "14px" }}>Content</div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>
                  {report.content}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE BUTTON */}
            {activeSection === "resolve-reports" ? (
              <button
                onClick={() => markResolved(report)}
                style={{
                  background: "#3B4FE4",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Mark Resolved
              </button>
            ) : (
              <div
                style={{
                  background: "#D8FFE0",
                  color: "#0B7A20",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontWeight: "600",
                }}
              >
                Resolved
              </div>
            )}
          </div>
        ))
      )}

      {/* FOOTER COUNT */}
      <p style={{ marginTop: "10px", color: "gray" }}>
        Showing {reportsToShow.length} of {resolveReports.length + historyReports.length}{" "}
        reports
      </p>
    </div>
  );
};

export default Admin_ReportManagement;
