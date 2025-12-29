// client/src/components/Modals/Modal.js
import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 16
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 8,
        maxWidth: 920,
        width: "100%",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        overflow: "hidden"
      }}>
        <div style={{ padding: 10, textAlign: "right", borderBottom: "1px solid #eee" }}>
          <button onClick={onClose} style={{
            background: "transparent",
            border: "none",
            fontSize: 18,
            cursor: "pointer"
          }}>✕</button>
        </div>
        <div style={{ padding: 18, maxHeight: "70vh", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
