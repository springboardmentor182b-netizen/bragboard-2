import React from "react";

function ShoutoutCard({ onReport }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "5px"
      }}
    >
      <p>
        <strong>Employee:</strong> John Doe
      </p>

      <p>
        Great job on completing the project on time!
      </p>

      <button onClick={onReport}>
        Report
      </button>
    </div>
  );
}

export default ShoutoutCard;
