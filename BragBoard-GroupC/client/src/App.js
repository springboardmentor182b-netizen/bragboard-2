import React, { useState } from "react";
import "./App.css";
import PostCard from "./components/PostCard";
import CreateShoutoutModal from "./components/Modals/Modal";

const CURRENT_USER = {
  name: "Arshit Rawat",
  role: "Engineering",
  initials: "AR",
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [teammates, setTeammates] = useState("");
  const [description, setDescription] = useState("");

  const [posts, setPosts] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setTeammates("");
    setDescription("");
  };

  const handleCreatePost = () => {
    if (!title.trim() && !description.trim()) return;

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      teammates: teammates.trim(),
      description: description.trim(),
      author: CURRENT_USER,
      createdAtLabel: "Just now",
      reactions: {
        like: { count: 0, active: false },
        clap: { count: 0, active: false },
        star: { count: 0, active: false },
      },
    };

    setPosts((prev) => [newPost, ...prev]);
    closeModal();
  };

  const handleToggleReaction = (postId, type) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        const prev = post.reactions?.[type] || { count: 0, active: false };
        const nextActive = !prev.active;
        const nextCount = Math.max(0, prev.count + (nextActive ? 1 : -1));

        return {
          ...post,
          reactions: {
            ...post.reactions,
            [type]: {
              count: nextCount,
              active: nextActive,
            },
          },
        };
      })
    );
  };

  return (
    <div className="bb-app">
      {/* Top bar */}
      <header className="bb-topbar">
        <div className="bb-logo">BragBoard</div>

        <div className="bb-search-container">
          <input
            className="bb-search-input"
            placeholder="Search for shout-outs or teammates"
          />
        </div>

        <div className="bb-topbar-right">
          <button className="bb-icon-button" aria-label="Notifications">
            <span className="bb-bell-icon">🔔</span>
          </button>
          <button className="bb-avatar-button" aria-label="Profile">
            <span className="bb-avatar-icon">👤</span>
          </button>
        </div>
      </header>

      <div className="bb-layout">
        {/* Sidebar */}
        <aside className="bb-sidebar">
          <nav className="bb-nav">
            <div className="bb-nav-section">
              <button className="bb-nav-item bb-nav-item--active">
                <span className="bb-nav-icon">🏠</span>
                <span>Dashboard</span>
              </button>
              <button className="bb-nav-item">
                <span className="bb-nav-icon">⭐</span>
                <span>My Shout-outs</span>
              </button>
              <button className="bb-nav-item">
                <span className="bb-nav-icon">📊</span>
                <span>Leaderboard</span>
              </button>
            </div>

            <div className="bb-filter-card">
              <div className="bb-filter-title">Filter</div>
              <label className="bb-filter-option">
                <input type="checkbox" /> <span>HR</span>
              </label>
              <label className="bb-filter-option">
                <input type="checkbox" /> <span>CyberSecurity</span>
              </label>
              <label className="bb-filter-option">
                <input type="checkbox" /> <span>Deployment</span>
              </label>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="bb-main">
          <div className="bb-main-header">
            <h1 className="bb-welcome-title">
              Welcome back, Arshit Rawat !
            </h1>
            <p className="bb-tip">
              Tip: You can attach images and gifs in the posts
            </p>

            <button className="bb-primary-button" onClick={openModal}>
              <span className="bb-plus-icon">＋</span>
              <span>Create Shout-out</span>
            </button>
          </div>

          {posts.length === 0 ? (
            <section className="bb-empty-state-card">
              <div className="bb-empty-state-inner">
                <p className="bb-empty-title">No Shout-outs available</p>
                <p className="bb-empty-subtitle">
                  Use the Create shout-out button to add one!
                </p>
              </div>
            </section>
          ) : (
            <div className="bb-post-list">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onToggleReaction={handleToggleReaction}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <CreateShoutoutModal
        isOpen={isModalOpen}
        title={title}
        teammates={teammates}
        description={description}
        onTitleChange={setTitle}
        onTeammatesChange={setTeammates}
        onDescriptionChange={setDescription}
        onClose={closeModal}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

export default App;
