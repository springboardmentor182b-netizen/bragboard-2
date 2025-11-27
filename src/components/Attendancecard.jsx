import React from "react";

const AttendanceCard = ({ daysPresent, month }) => {
  return (
    <div style={styles.card}>
      <h4 style={{ margin: 0 }}>Attendance</h4>
      <p style={{ margin: "8px 0 0 0", fontSize: 22, fontWeight: 700 }}>{daysPresent} / 30</p>
      <small style={{ color: "#475569" }}>{month}</small>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: 14,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
};

export default AttendanceCard;
