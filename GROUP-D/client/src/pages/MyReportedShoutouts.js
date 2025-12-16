import React from "react";

function MyReportedShoutouts() {
  return (
    <div>
      <h2>My Reported Shoutouts</h2>

      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        <p><strong>Shoutout:</strong> Great job on the project</p>
        <p><strong>Status:</strong> Pending</p>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <p><strong>Shoutout:</strong> Excellent teamwork</p>
        <p><strong>Status:</strong> Approved</p>
      </div>
    </div>
  );
}

export default MyReportedShoutouts;
