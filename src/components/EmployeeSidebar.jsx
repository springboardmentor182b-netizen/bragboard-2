import React from "react";

const Sidebar = ({ onNavigate, active }) => {
  const items = [
    { id: "overview", label: "Overview" },
    { id: "tasks", label: "Tasks" },
    { id: "attendance", label: "Attendance" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside style={styles.aside}>
      <div style={styles.brand}>
        <img src="/logo192.png" alt="logo" style={{ width: 36, marginRight: 8 }} />
        <strong>Employee</strong>
      </div>

      <nav>
        <ul style={styles.ul}>
          {items.map((it) => (
            <li
              key={it.id}
              onClick={() => onNavigate(it.id)}
              style={{
                ...styles.li,
                ...(active === it.id ? styles.active : {}),
              }}
            >
              {it.label}
            </li>
          ))}
        </ul>
      </nav>

      <div style={styles.footer}>v1.0</div>
    </aside>
  );
};

const styles = {
  aside: {
    width: 220,
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    padding: 16,
    boxSizing: "border-box",
  },
  brand: { display: "flex", alignItems: "center", marginBottom: 20, opacity: 0.95 },
  ul: { listStyle: "none", padding: 0, margin: 0 },
  li: {
    padding: "10px 12px",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 6,
    fontSize: 14,
    color: "#cbd5e1",
  },
  active: {
    background: "#1e293b",
    color: "#fff",
    fontWeight: 600,
  },
  footer: { marginTop: 36, fontSize: 12, color: "#94a3b8" },
};

export default Sidebar;
