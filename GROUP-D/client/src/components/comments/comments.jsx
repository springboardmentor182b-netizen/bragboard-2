import { useState } from "react";
import "./comments.css";

const Comments = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const addComment = () => {
    if (!text.trim()) return;
    setList([...list, text]);
    setText("");
  };

  return (
    <div className="comments">
      <div className="comment-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={addComment}>Post</button>
      </div>

      <ul>
        {list.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
