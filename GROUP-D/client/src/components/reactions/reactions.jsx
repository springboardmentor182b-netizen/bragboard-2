import { useState } from "react";
import "./reactions.css";

const reactionsList = ["👍", "🎉", "👏", "❤️"];

const Reactions = () => {
  const [counts, setCounts] = useState({});

  const handleClick = (emoji) => {
    setCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
  };

  return (
    <div className="reactions">
      {reactionsList.map((emoji) => (
        <button
          key={emoji}
          className="reaction-btn"
          onClick={() => handleClick(emoji)}
        >
          {emoji} {counts[emoji] || 0}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
