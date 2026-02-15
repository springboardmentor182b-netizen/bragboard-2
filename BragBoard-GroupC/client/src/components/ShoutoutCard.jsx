import React, { useEffect, useState } from "react";
import "../assets/global.css";

const REACTION_TYPES = ["👍", "❤️", "👏"]; // You can add more
const REACTION_MAP = { "👍": "like", "❤️": "love", "👏": "clap" };

const ShoutoutCard = ({ shoutout, onReport }) => {
  const [myReaction, setMyReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({});

  const shoutoutId = shoutout.id;

  // Fetch current user reaction
  const fetchMyReaction = async () => {
    try {
      const res = await fetch(`http://localhost:8000/reactions/${shoutoutId}/my-reaction`);
      const data = await res.json();
      setMyReaction(data.reaction_type);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch reaction counts
  const fetchReactionCounts = async () => {
    try {
      const res = await fetch(`http://localhost:8000/reactions/${shoutoutId}/count`);
      const data = await res.json();
      setReactionCounts(data.count || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyReaction();
    fetchReactionCounts();
  }, []);

  // Handle reaction click: submit immediately and refresh count
  const handleReaction = async (emoji) => {
    const type = REACTION_MAP[emoji];
    const url = `http://localhost:8000/reactions/${shoutoutId}`;

    try {
      if (myReaction === type) {
        // Remove reaction if clicking the same again
        await fetch(url, { method: "DELETE" });
        setMyReaction(null);
      } else {
        // Add or update reaction
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reaction_type: type }),
        });
        setMyReaction(type);
      }
      fetchReactionCounts(); // Update counts after submission
    } catch (err) {
      console.error("Failed to submit reaction:", err);
    }
  };

  return (
    <div className="employee-card">
      <p className="employee-card-message">{shoutout.message}</p>

      <div className="employee-card-meta">
        <span><strong>From:</strong> {shoutout.sender_id}</span>
        <span><strong>To:</strong> {shoutout.recipient_ids.join(", ")}</span>
      </div>

      <div className="employee-card-footer">
        <span className="employee-card-date">
          {new Date(shoutout.created_at).toLocaleString()}
        </span>

        <button className="report-btn" onClick={() => onReport(shoutout)}>
          🚩 Report
        </button>
      </div>

      {/* Reactions */}
      <div className="reactions-container">
        {REACTION_TYPES.map((emoji) => (
          <button
            key={emoji}
            className={`reaction-btn ${myReaction === REACTION_MAP[emoji] ? "selected" : ""}`}
            onClick={() => handleReaction(emoji)}
          >
            {emoji} {reactionCounts[REACTION_MAP[emoji]] || 0}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShoutoutCard;
