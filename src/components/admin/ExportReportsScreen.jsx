import React from "react";
import styles from "./styles";
import AdminSidebar from "./AdminSidebar";
import FilterRow from "./FilterRow";
import ReportsTable from "./ReportsTable";

export default function ExportReportsScreen() {
  const reports = [
    { employee: "Arun", department: "HR", report: "Leave Policy Issue", status: "Resolved", time: "10:30 AM" },
    { employee: "Priya", department: "Finance", report: "Salary Discrepancy", status: "Pending", time: "11:15 AM" },
  ];

  const handleExport = () => {
    const csvContent =
      "Employee,Department,Report,Status,Time\n" +
      reports.map(r => `${r.employee},${r.department},${r.report},${r.status},${r.time}`).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reports.csv";
    link.click();
  };

  return (
    <div style={styles.frame}>
      <AdminSidebar />
      <main style={styles.main}>
        <div style={styles.headingContainer}>
          <h1 style={styles.heading}>Export Reports</h1>
        </div>
        <FilterRow onExport={handleExport} />
        <ReportsTable reports={reports} />
      </main>
    </div>
  );
}
