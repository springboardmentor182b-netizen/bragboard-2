import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";

/**
 * Feed (Admin view when adminView=true):
 * - fetches posts from /api/shoutouts
 * - supports deleting posts (DELETE /api/shoutouts/:id)
 * - supports deleting comments via callback passed to FeedPost
 *
 * NOTE: This file contains all UI & logic and uses window.confirm for confirmation (no new files).
 */
export default function Feed({ adminView = false }) {
  const [posts, setPosts] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/shoutouts");
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        if (mounted) setPosts(data);
      } catch {
        // fallback sample feed when API not available
        if (mounted)
          setPosts([
            {
              id: "1",
              user: "John",
              message: "Great job on the project!",
              createdAt: Date.now() - 1000 * 60 * 60 * 24,
              comments: [
                { id: "c1", user: "Anita", text: "Well done!" },
                { id: "c2", user: "Rahul", text: "Amazing!" },
              ],
            },
            {
              id: "2",
              user: "Anita",
              message: "Thanks for the help in event!",
              createdAt: Date.now() - 1000 * 60 * 60 * 12,
              comments: [{ id: "c3", user: "John", text: "Anytime!" }],
            },
          ]);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleDeletePost = async (postId) => {
    const ok = window.confirm("Delete this shoutout? This action cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:5000/api/shoutouts/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      // assume server returns success
      setPosts((p) => p.filter((x) => String(x.id) !== String(postId)));
      showToast("Shoutout deleted");
    } catch {
      // fallback: remove locally and notify user
      setPosts((p) => p.filter((x) => String(x.id) !== String(postId)));
      showToast("Shoutout removed locally (API failed)");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    const ok = window.confirm("Delete this comment?");
    if (!ok) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/shoutouts/${postId}/comments/${commentId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("delete failed");
      setPosts((prev) =>
        prev.map((post) =>
          String(post.id) === String(postId)
            ? { ...post, comments: post.comments.filter((c) => String(c.id) !== String(commentId)) }
            : post
        )
      );
      showToast("Comment deleted");
    } catch {
      // local deletion fallback
      setPosts((prev) =>
        prev.map((post) =>
          String(post.id) === String(postId)
            ? { ...post, comments: post.comments.filter((c) => String(c.id) !== String(commentId)) }
            : post
        )
      );
      showToast("Comment removed locally (API failed)");
    }
  };

  return (
    <div className="bg-[#001F54] p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Shoutouts</h3>
        <div className="text-sm text-[#9fb2d2]">{posts.length} posts</div>
      </div>

      {toast && (
        <div className="mb-3 px-3 py-2 rounded-md bg-[#0b662e] w-max text-sm">{toast}</div>
      )}

      <div className="space-y-4">
        {posts.map((p) => (
          <FeedPost
            key={p.id}
            post={p}
            adminView={adminView}
            onDeletePost={() => handleDeletePost(p.id)}
            onDeleteComment={(commentId) => handleDeleteComment(p.id, commentId)}
          />
        ))}
        {posts.length === 0 && <div className="text-[#cfe7f6]">No shoutouts yet.</div>}
      </div>
    </div>
  );
}
