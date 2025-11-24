import React from "react";
import "./PostCard.css";

function PostCard({ post, onToggleReaction }) {
  const { author, reactions = {} } = post;
  const teammateTokens = post.teammates
    ? post.teammates.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const like = reactions.like || { count: 0, active: false };
  const clap = reactions.clap || { count: 0, active: false };
  const star = reactions.star || { count: 0, active: false };

  return (
    <article className="bb-post-card">
      <header className="bb-post-header">
        <div className="bb-post-avatar">
          <span>{author.initials}</span>
        </div>
        <div className="bb-post-header-text">
          <div className="bb-post-author-line">
            <span className="bb-post-author">{author.name}</span>
            <span className="bb-post-dot">•</span>
            <span className="bb-post-role">{author.role}</span>
          </div>
          <div className="bb-post-meta">
            <span>{post.createdAtLabel}</span>
          </div>
        </div>
      </header>

      {post.title && (
        <div className="bb-post-title">{post.title}</div>
      )}

      {teammateTokens.length > 0 && (
        <div className="bb-post-tags">
          {teammateTokens.map((tm) => (
            <span key={tm} className="bb-chip">
              {tm}
            </span>
          ))}
        </div>
      )}

      {post.description && (
        <p className="bb-post-body">{post.description}</p>
      )}

      <div className="bb-post-reactions">
        <button
          className={`bb-pill ${like.active ? "bb-pill--active" : ""}`}
          onClick={() => onToggleReaction(post.id, "like")}
        >
          👍 Like
          {like.count > 0 && (
            <span className="bb-pill-count">{like.count}</span>
          )}
        </button>

        <button
          className={`bb-pill ${clap.active ? "bb-pill--active" : ""}`}
          onClick={() => onToggleReaction(post.id, "clap")}
        >
          👏 Clap
          {clap.count > 0 && (
            <span className="bb-pill-count">{clap.count}</span>
          )}
        </button>

        <button
          className={`bb-pill ${star.active ? "bb-pill--active" : ""}`}
          onClick={() => onToggleReaction(post.id, "star")}
        >
          ⭐ Star
          {star.count > 0 && (
            <span className="bb-pill-count">{star.count}</span>
          )}
        </button>
      </div>

      <div className="bb-post-comment-bar">
        <input
          className="bb-comment-input"
          placeholder="Add a comment..."
        />
        <button className="bb-comment-post-btn">Post</button>
      </div>
    </article>
  );
}

export default PostCard;
