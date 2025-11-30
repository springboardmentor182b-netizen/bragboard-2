// client/src/features/shoutouts/ReactionDisplay.jsx
import React from "react";

export default function ReactionDisplay({ reactions = {} }) {
  return (
    <div className="reaction-display">
      {Object.entries(reactions).map(([emoji, count]) => (
        <span key={emoji} className="reaction-count">
          {emoji} {count}
        </span>
      ))}
    </div>
  );
}
