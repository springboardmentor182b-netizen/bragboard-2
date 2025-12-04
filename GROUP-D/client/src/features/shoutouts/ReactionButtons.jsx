// client/src/features/shoutouts/ReactionButtons.jsx
import React from "react";
import { addReaction } from "./shoutout.api";

export default function ReactionButtons({ shoutoutId }) {
  const types = ["👍", "❤️", "🔥", "🎉"];

  async function handleReaction(type) {
    await addReaction(shoutoutId, type);
    window.location.reload(); // refresh to update UI
  }

  return (
    <div className="reaction-buttons">
      {types.map((t) => (
        <button key={t} onClick={() => handleReaction(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}
