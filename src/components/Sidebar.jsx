export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ marginBottom: 30 }}>BragBoard</h2>

      <div className="menu-item active">Dashboard</div>
      <div className="menu-item">Leaderboard</div>
      <div className="menu-item">Manage Posts</div>
      <div className="menu-item">Manage Reports</div>

      <div style={{ marginTop: 10 }}>
        <button style={{
          width: "100%", padding: 10, borderRadius: 20, border: "1px solid #0b5cff"
        }}>Resolve Reports</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <button style={{
          width: "100%", padding: 10, borderRadius: 20, border: "1px solid #0b5cff"
        }}>Export Reports</button>
      </div>

      <div className="menu-item" style={{ marginTop: 20 }}>Notifications</div>
      <div className="menu-item">Theme</div>
      <div className="menu-item">Settings</div>
    </div>
  );
}
