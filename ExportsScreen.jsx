import React from "react";

export default function ExportReportsScreen() {
  return (
    <div style={styles.frame}>
      {/* Sidebar */}
      <aside style={styles.aside}>
        <div style={styles.margin}>
          <div style={styles.container}>
            <h1 style={styles.adminTitle}>BragBoard Admin</h1>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div style={styles.sidebarMenu}>
          <div style={styles.menuItem}>
            <span style={styles.menuText}>Admin Dashboard</span>
          </div>
          <div style={styles.menuItem}>
            <span style={styles.menuText}>Shout-out Management</span>
          </div>
          <div style={styles.menuItem}>
            <span style={styles.menuText}>Resolving Reports</span>
          </div>

          {/* Selected Menu */}
          <div style={styles.menuSelected}>
            <span style={styles.menuText}>Export Reports</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.headingContainer}>
          <h1 style={styles.heading}>Export Reports</h1>
        </div>

        {/* Filters Row */}
        <div style={styles.filterRow}>
          {/* Department */}
          <div>
            <label style={styles.label}>Department:</label>
          </div>
          <div style={styles.dropdown}>
            <span style={styles.dropdownOption}>All Departments</span>
          </div>

          {/* Status */}
          <div>
            <label style={styles.label}>Status:</label>
          </div>
          <div style={styles.dropdownSmall}>
            <span style={styles.dropdownOption}>All</span>
          </div>

          {/* Export Button */}
          <button style={styles.exportButton}>
            <span style={styles.exportText}>Export CSV</span>
          </button>
        </div>

        {/* Table */}
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <div style={styles.cell}><span style={styles.headerText}>Employee</span></div>
            <div style={styles.cell}><span style={styles.headerText}>Department</span></div>
            <div style={styles.cellLarge}><span style={styles.headerText}>Report</span></div>
            <div style={styles.cell}><span style={styles.headerText}>Status</span></div>
            <div style={styles.cell}><span style={styles.headerText}>Time</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  frame: {
    display: "flex",
    flexDirection: "column",
    width: "1440px",
    height: "1024px",
    background: "#F9F9F9",
  },

  /* Sidebar */
  aside: {
    display: "flex",
    flexDirection: "column",
    padding: "40px 30px",
    gap: "20px",
    width: "440px",
    height: "1024px",
    background: "#5B6CFF",
  },

  margin: { padding: "0 0 50px", width: "380px", height: "86px" },

  container: { width: "380px", height: "36px" },

  adminTitle: {
    fontFamily: "Inter",
    fontSize: "30px",
    fontWeight: 700,
    color: "#FFF",
    margin: 0,
  },

  sidebarMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "380px",
  },

  menuItem: {
    padding: "14px 18px",
    borderRadius: "12px",
  },

  menuSelected: {
    padding: "14px 18px",
    background: "#4456E6",
    borderRadius: "12px",
  },

  menuText: {
    fontFamily: "Inter",
    fontSize: "17px",
    fontWeight: 500,
    color: "#FFF",
  },

  /* Main Content */
  main: {
    display: "flex",
    flexDirection: "column",
    padding: "60px 50px",
    gap: "30px",
    width: "1000px",
    height: "1024px",
    overflow: "scroll",
  },

  headingContainer: { width: "900px", height: "36px" },

  heading: {
    fontFamily: "Inter",
    fontSize: "30px",
    fontWeight: 700,
    color: "#000",
    margin: 0,
  },

  /* Filters Row */
  filterRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "15px",
    width: "900px",
    height: "36px",
  },

  label: {
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: 500,
    color: "#000",
  },

  dropdown: {
    padding: "9px 29px 9px 17px",
    width: "146px",
    height: "36px",
    background: "#EFEFEF",
    border: "1px solid #CCC",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
  },

  dropdownSmall: {
    padding: "9px 29px 9px 17px",
    width: "102px",
    height: "36px",
    background: "#EFEFEF",
    border: "1px solid #CCC",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
  },

  dropdownOption: {
    fontFamily: "Arial",
    fontSize: "14px",
    color: "#000",
  },

  exportButton: {
    padding: "8px 16px",
    background: "#5B6CFF",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  exportText: {
    fontFamily: "Arial",
    fontSize: "14px",
    color: "#FFF",
  },

  /* Table */
  table: {
    width: "900px",
    height: "250px",
    background: "#FFF",
    borderRadius: "18px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.12)",
  },

  tableHeader: {
    display: "flex",
    flexDirection: "row",
    width: "900px",
    height: "50px",
  },

  cell: {
    padding: "16px 12px",
    width: "138px",
    background: "#F0F4FF",
  },

  cellLarge: {
    padding: "16px 12px",
    width: "390px",
    background: "#F0F4FF",
  },

  headerText: {
    fontFamily: "Inter",
    fontSize: "15px",
    fontWeight: 600,
    color: "#555",
  },
};
