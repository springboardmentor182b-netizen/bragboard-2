import React, { useState } from "react";
import "./CommentsUI.css";


const CommentsUI = () => {
const [comments, setComments] = useState([]);
const [comment, setComment] = useState("");


const addComment = () => {
if (comment.trim() === "") return;
  setComments([...comments, comment]);
setComment("");
};


return (
<div className="comments-container">
<h4>Comments</h4>
<div className="comment-list">
{comments.map((c, index) => (
<div key={index} className="comment-item">
{c}
</div>
))}
</div>


<div className="comment-input">
<input
type="text"
value={comment}
placeholder="Write a comment..."
  onChange={(e) => setComment(e.target.value)}
/>
<button onClick={addComment}>Post</button>
</div>
</div>
);
};
export default CommentsUI;
