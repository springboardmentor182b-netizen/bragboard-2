import React from "react";
import styles from "./styles";

const AdminSidebar = ({ onNavigate, active }) => (
  <aside style={styles.aside}>
    <div style={styles.margin}>
      <div style={styles.container}>
        <h1 style={styles.adminTitle}>BragBoard Admin</h1>
      </div>
    </div>

    <div style={styles.sidebarMenu}>
      <div style={active === "dashboard" ? styles.menuSelected : styles.menuItem}
           onClick={() => onNavigate("dashboard")}>
        <span style={styles.menuText}>Admin Dashboard</span>
      </div>
      <div style={active === "exports" ? styles.menuSelected : styles.menuItem}
           onClick={() => onNavigate("exports")}>
        <span style={styles.menuText}>Export Reports</span>
      </div>
    </div>
  </aside>
);

export default AdminSidebar;
