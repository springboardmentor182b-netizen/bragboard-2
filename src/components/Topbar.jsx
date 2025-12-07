export default function Topbar() {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: 400,
          padding: 10,
          borderRadius: 30,
          border: "1px solid #ddd"
        }}
      />

      <div style={{ marginLeft: "auto" }}>
        <span style={{ marginRight: 20 }}>Admin</span>
        <div style={{
          width: 30, height: 30, borderRadius: "50%", background: "#ccc"
        }}></div>
      </div>
    </div>
  );
}
