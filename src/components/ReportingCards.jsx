export default function ReportingCards() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #b9c6ff, #d4e1ff)",
      padding: 25,
      borderRadius: 12,
      marginBottom: 25
    }}>
      <h3>Reporting Analytics</h3>

      <div style={{ display: "flex", gap: 30, marginTop: 20 }}>
        <div style={{
          background: "#fff", padding: 20, borderRadius: 12, width: 150, textAlign: "center"
        }}>
          <p>Reports Resolved</p>
          <h2>46</h2>
        </div>

        <div style={{
          background: "#fff", padding: 20, borderRadius: 12, width: 150, textAlign: "center"
        }}>
          <p>To Be Resolved</p>
          <h2>8</h2>
        </div>
      </div>
    </div>
  );
}
