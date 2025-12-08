import React, { useState } from "react";

/**
 * FeedPost
 * Props:
 * - post: { id, user, message, createdAt, comments: [{id, user, text}] }
 * - adminView: boolean (show delete controls)
 * - onDeletePost: function()
 * - onDeleteComment: function(commentId)
 */
export default function FeedPost({ post, adminView = false, onDeletePost, onDeleteComment }) {
  const [expanded, setExpanded] = useState(true);

  const formatTime = (ts) => {
    try {
      const d = new Date(ts);
      return d.toLocaleString();
    } catch {
      return "";
    }
  };

  return (
    <div className="bg-[#034078] rounded-lg p-4 shadow-sm transition transform hover:scale-[1.01]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#0d3b5b] flex items-center justify-center font-semibold">
              {String(post.user || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-white">{post.user}</div>
              <div className="text-xs text-[#cfe7f6]">{formatTime(post.createdAt)}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-sm px-2 py-1 rounded bg-[#013554] hover:bg-[#01607f]"
            title="Toggle comments"
          >
            {expanded ? "Hide" : "Show"}
          </button>

          {adminView && (
            <button
              onClick={onDeletePost}
              className="text-sm px-2 py-1 rounded bg-[#bf1a2f] hover:bg-[#ff2e42]"
              title="Delete post"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 text-[#eaf6ff]">{post.message}</div>

      {/* Comments */}
      <div className={`mt-3 ${expanded ? "" : "hidden"}`}>
        <div className="text-sm text-[#9fb2d2] mb-2">Comments ({(post.comments || []).length})</div>

        <div className="space-y-2">
          {(post.comments || []).map((c) => (
            <div
              key={c.id}
              className="bg-[#013F63] p-2 rounded-md flex items-start justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold">{c.user}</div>
                <div className="text-sm text-[#d6eefb]">{c.text}</div>
              </div>

              {adminView && (
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => onDeleteComment(c.id)}
                    className="text-xs px-2 py-1 rounded bg-[#b0202f] hover:bg-[#ff2e42]"
                    title="Delete comment"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
