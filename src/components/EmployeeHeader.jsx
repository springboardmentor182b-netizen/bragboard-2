import React from "react";

const EmployeeHeader = ({ title, onSearch }) => {
  return (
    <header style={styles.header}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <div>
        <input
          placeholder="Search tasks..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          style={styles.input}
        />
      </div>
    </header>
  );
};

const styles = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  input: { padding: "8px 10px", borderRadius: 6, border: "1px solid #e2e8f0" },
};

export default EmployeeHeader;
