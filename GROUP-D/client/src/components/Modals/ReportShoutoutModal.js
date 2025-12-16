import React from "react";

function ReportShoutoutModal({ onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Report Shoutout</h3>

        <label>Reason</label>
        <select>
          <option>Inappropriate Content</option>
          <option>Wrong Recognition</option>
          <option>Spam</option>
        </select>

        <br /><br />

        <label>Comment</label>
        <textarea placeholder="Enter reason"></textarea>

        <br /><br />

        <button onClick={onClose}>Submit</button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "6px",
  width: "300px"
};

export default ReportShoutoutModal;
