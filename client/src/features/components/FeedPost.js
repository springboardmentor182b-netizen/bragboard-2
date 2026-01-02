import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './FeedPost.css';

function FeedPost({ shoutout, onReport, currentUserId, onInteraction }) {
  const [showMenu, setShowMenu] = useState(false);
  const [localComments, setLocalComments] = useState(shoutout.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const menuRef = useRef(null);

  // Sync local state with prop updates
  useEffect(() => {
    console.log(`FeedPost [${shoutout.id}] props update:`, {
      currentUserId,
      likesCount: (shoutout.likes || []).length,
      commentsCount: (shoutout.comments || []).length,
      likedByMe: shoutout.reactions.likedByMe
    });
    setLocalComments(shoutout.comments || []);
  }, [shoutout.comments, currentUserId, shoutout.likes]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const formatMessage = (message, taggedUsers) => {
    let formatted = message;
    if (taggedUsers) {
      taggedUsers.forEach((user) => {
        formatted = formatted.replace(
          user,
          `<span class="tagged-user">${user}</span>`
        );
      });
    }
    return formatted;
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleReport = () => {
    onReport();
    setShowMenu(false);
  };

  const handleToggleLike = async () => {
    if (!currentUserId || isLiking) return;
    setIsLiking(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post(`http://127.0.0.1:8000/shoutouts/${shoutout.id}/like?user_id=${currentUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onInteraction) onInteraction();
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUserId || isCommenting) return;
    setIsCommenting(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post(`http://127.0.0.1:8000/shoutouts/${shoutout.id}/comments?user_id=${currentUserId}`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText('');
      if (onInteraction) onInteraction();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="feed-post">
      <div className="post-header">
        <div className="post-avatar">
          {shoutout.senderAvatar ? (
            <img src={shoutout.senderAvatar} alt={shoutout.sender} />
          ) : (
            <span className="avatar-initials">{getInitials(shoutout.sender)}</span>
          )}
        </div>
        <div className="post-header-text">
          <span className="post-author">{shoutout.sender}</span>
          {shoutout.department && (
            <span className="post-department">
              • {shoutout.department}
            </span>
          )}
          <span className="post-time">{shoutout.timestamp}</span>
        </div>
        <div className="post-menu-container" ref={menuRef}>
          <button
            className="post-menu-button"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Post options"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="19" r="2" fill="currentColor" />
            </svg>
          </button>
          {showMenu && (
            <div className="post-menu-dropdown">
              <button className="post-menu-item" onClick={handleReport}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Report post
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className="post-message"
        dangerouslySetInnerHTML={{
          __html: formatMessage(shoutout.message, shoutout.taggedUsers),
        }}
      />
      <div className="post-actions">
        <button
          className={`action-button ${shoutout.reactions.likedByMe ? 'active' : ''}`}
          onClick={handleToggleLike}
          disabled={isLiking}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={shoutout.reactions.likedByMe ? "currentColor" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H16.4262C17.907 22 19.1662 20.9197 19.3914 19.4622L20.4683 12.4622C20.7479 10.6389 19.3411 9 17.5032 9H14C13.4477 9 13 8.55228 13 8V4.46584C13 3.10399 11.896 2 10.5342 2C10.2093 2 9.91498 2.1913 9.78306 2.48812L7.26394 8.72711C7.09896 9.10011 6.74513 9.34571 6.34189 9.34571H4C2.89543 9.34571 2 10.2411 2 11.3457V13Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="action-count">{shoutout.reactions.thumbsUp || 0}</span>
        </button>

        <button
          className={`action-button ${showComments ? 'active' : ''}`}
          onClick={() => setShowComments(!showComments)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="action-count">{localComments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {localComments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-avatar">
                  {getInitials(comment.author.name)}
                </div>
                <div className="comment-content">
                  <div className="comment-author-name">{comment.author.name}</div>
                  <div className="comment-text">{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
          <form className="comment-form" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isCommenting}
            />
            <button type="submit" disabled={!commentText.trim() || isCommenting}>
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FeedPost;

