import React, { useState, useMemo } from "react";
import Sidebar from "../components/EmployeeSidebar";
import EmployeeHeader from "../components/EmployeeHeader";
import TaskCard from "../components/TaskCard";
import AttendanceCard from "../components/AttendanceCard";

const sampleTasks = [
  { id: 1, title: "Finish report", description: "Complete the monthly report", status: "In Progress" },
  { id: 2, title: "Fix bug #102", description: "Resolve login edge case", status: "Open" },
  { id: 3, title: "Code review", description: "Review PR #58", status: "Completed" },
];

const EmployeeLayout = () => {
  const [active, setActive] = useState("overview");
  const [query, setQuery] = useState("");

  const tasks = useMemo(
    () =>
      sampleTasks.filter(
        (t) => !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar onNavigate={setActive} active={active} />

      <main style={{ flex: 1, padding: 20 }}>
        <EmployeeHeader title="Employee Dashboard" onSearch={setQuery} />

        {/* Layout placeholder area */}
        {active === "overview" && (
          <section style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {/* Tasks grid */}
              {tasks.map((t) => (
                <TaskCard key={t.id} {...t} />
              ))}
            </div>

            <aside>
              <AttendanceCard daysPresent={26} month={"November"} />
              <div style={{ height: 12 }} />
              <div style={{ ...styles.smallCard }}>
                <h4 style={{ margin: 0 }}>Quick Links</h4>
                <ul style={{ marginTop: 8 }}>
                  <li>Apply Leave</li>
                  <li>Payslips</li>
                  <li>Company Policies</li>
                </ul>
              </div>
            </aside>
          </section>
        )}

        {active === "tasks" && (
          <section>
            <h3>All Tasks</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {tasks.map((t) => (
                <TaskCard key={t.id} {...t} />
              ))}
            </div>
          </section>
        )}

        {active === "attendance" && (
          <section>
            <h3>Attendance Details</h3>
            <AttendanceCard daysPresent={26} month={"November"} />
            <p style={{ color: "#475569" }}>You have 4 days remaining as casual leaves.</p>
          </section>
        )}

        {active === "settings" && (
          <section>
            <h3>Settings</h3>
            <p style={{ color: "#475569" }}>Profile & notification settings go here.</p>
          </section>
        )}
      </main>
    </div>
  );
};

const styles = {
  smallCard: {
    background: "#fff",
    borderRadius: 8,
    padding: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    marginTop: 8,
  },
};

export default EmployeeLayout;
