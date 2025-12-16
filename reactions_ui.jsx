import React, { useState } from "react";
import "./ReactionsUI.css";


const reactionsList = ["👍", "🎉", "❤️", "👏", "🚀"];


const ReactionsUI = () => {
const [reactions, setReactions] = useState({});


const handleReaction = (emoji) => {
setReactions((prev) => ({
...prev,
[emoji]: (prev[emoji] || 0) + 1,
}));
};


return (
<div className="reactions-container">
{reactionsList.map((emoji) => (
<button
key={emoji}
className="reaction-btn"
onClick={() => handleReaction(emoji)}
>
{emoji} {reactions[emoji] || 0}
</button>
))}
</div>
);
};


export default ReactionsUI;
