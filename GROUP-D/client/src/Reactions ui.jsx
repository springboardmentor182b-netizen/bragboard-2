import { useState } from "react";

const reactions = [
  { emoji: "👍", type: "like" },
  { emoji: "❤️", type: "love" },
  { emoji: "😂", type: "funny" },
  { emoji: "🎉", type: "celebrate" },
];

export default function ReactionsUI({ shoutoutId }) {
  const [counts, setCounts] = useState({
    like: 10,
    love: 4,
    funny: 3,
    celebrate: 2,
  });

  const [userReaction, setUserReaction] = useState(null);

  const handleReaction = (type) => {
    // Removing the same reaction
    if (userReaction === type) {
      setCounts({
        ...counts,
        [type]: counts[type] - 1,
      });
      setUserReaction(null);
      return;
    }

    // Changing reaction (remove old, add new)
    if (userReaction) {
      setCounts({
        ...counts,
        [userReaction]: counts[userReaction] - 1,
        [type]: counts[type] + 1,
      });
    } else {
      // Adding new reaction
      setCounts({
        ...counts,
        [type]: counts[type] + 1,
      });
    }

    setUserReaction(type);
  };

  return (
    <div className="flex gap-3 mt-3">
      {reactions.map((item) => (
        <button
          key={item.type}
          onClick={() => handleReaction(item.type)}
          className={`flex items-center gap-2 px-3 py-1 rounded-xl border shadow-sm 
            transition-all duration-150
            ${userReaction === item.type 
              ? "bg-[#E06370] text-white border-[#E06370]" 
              : "bg-white border-[#D9D9D9] hover:bg-[#F59AA4] hover:text-white"}
          `}
        >
          <span className="text-lg">{item.emoji}</span>
          <span className="text-sm font-medium">{counts[item.type]}</span>
        </button>
      ))}
    </div>
  );
}
