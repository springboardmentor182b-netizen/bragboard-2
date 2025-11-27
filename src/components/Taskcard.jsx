import React from "react";

const TaskCard = ({ title, description, status }) => {
  return (
    <div style={cardStyles.card}>
      <h4 style={cardStyles.title}>{title}</h4>
      <p style={cardStyles.desc}>{description}</p>
      <div style={cardStyles.footer}>
        <span style={cardStyles.status}>{status}</span>
        <button style={cardStyles.btn}>View</button>
      </div>
    </div>
  );
};

const cardStyles = {
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: 14,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    minWidth: 220,
  },
  title: { margin: "0 0 6px 0", fontSize: 15 },
  desc: { margin: 0, color: "#475569", fontSize: 13 },
  footer: { marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
  status: { fontSize: 12, color: "#0f172a", background: "#e2e8f0", padding: "4px 8px", borderRadius: 6 },
  btn: { border: "none", background: "#0ea5e9", color: "#fff", padding: "6px 10px", borderRadius: 6, cursor: "pointer" },
};

export default TaskCard;
