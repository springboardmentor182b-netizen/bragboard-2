import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './FeedPost.css';

function FeedPost({ shoutout, onReport, currentUserId, onInteraction }) {
  const [showMenu, setShowMenu] = useState(false);
  const [localComments, setLocalComments] = useState(shoutout.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localClaps, setLocalClaps] = useState(shoutout.reactions?.claps || 0);
  const [isClapped, setIsClapped] = useState(shoutout.reactions?.clappedByMe || false);
  const [localStars, setLocalStars] = useState(shoutout.reactions?.stars || 0);
  const [isStarred, setIsStarred] = useState(shoutout.reactions?.starredByMe || false);
  const [localLikes, setLocalLikes] = useState(shoutout.reactions?.thumbsUp || 0);
  const [isLiked, setIsLiked] = useState(shoutout.reactions?.likedByMe || false);

  const [isLiking, setIsLiking] = useState(false);
  const [isClapping, setIsClapping] = useState(false);
  const [isStarring, setIsStarring] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  const menuRef = useRef(null);

  // Sync local state with prop updates
  useEffect(() => {
    setLocalComments(shoutout.comments || []);
    if (shoutout.reactions) {
      setLocalClaps(shoutout.reactions.claps || 0);
      setIsClapped(shoutout.reactions.clappedByMe || false);
      setLocalStars(shoutout.reactions.stars || 0);
      setIsStarred(shoutout.reactions.starredByMe || false);
      setLocalLikes(shoutout.reactions.thumbsUp || 0);
      setIsLiked(shoutout.reactions.likedByMe || false);
    }
  }, [shoutout.comments, shoutout.reactions]);

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

    // Optimistic Update
    const oldLiked = isLiked;
    const oldCount = localLikes;

    setIsLiked(!oldLiked);
    setLocalLikes(oldLiked ? oldCount - 1 : oldCount + 1);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/shoutouts/${shoutout.id}/like?user_id=${currentUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onInteraction) onInteraction();
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error
      setIsLiked(oldLiked);
      setLocalLikes(oldCount);
    } finally {
      setIsLiking(false);
    }
  };

  const handleToggleClap = async () => {
    if (!currentUserId || isClapping) return;
    setIsClapping(true);

    // Optimistic Update
    const oldClapped = isClapped;
    const oldCount = localClaps;

    setIsClapped(!oldClapped);
    setLocalClaps(oldClapped ? oldCount - 1 : oldCount + 1);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/shoutouts/${shoutout.id}/clap?user_id=${currentUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onInteraction) onInteraction();
    } catch (error) {
      console.error("Error toggling clap:", error);
      // Revert
      setIsClapped(oldClapped);
      setLocalClaps(oldCount);
    } finally {
      setIsClapping(false);
    }
  };

  const handleToggleStar = async () => {
    if (!currentUserId || isStarring) return;
    setIsStarring(true);

    // Optimistic Update
    const oldStarred = isStarred;
    const oldCount = localStars;

    setIsStarred(!oldStarred);
    setLocalStars(oldStarred ? oldCount - 1 : oldCount + 1);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/shoutouts/${shoutout.id}/star?user_id=${currentUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onInteraction) onInteraction();
    } catch (error) {
      console.error("Error toggling star:", error);
      // Revert
      setIsStarred(oldStarred);
      setLocalStars(oldCount);
    } finally {
      setIsStarring(false);
    }
  };

  const handleAddComment = async (e, parentId = null) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUserId || isCommenting) return;
    setIsCommenting(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      // Using the generalized endpoint with parent_id support
      await axios.post(`http://127.0.0.1:8000/shoutouts/${shoutout.id}/comments?user_id=${currentUserId}`,
        { content: commentText, parent_id: parentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommentText('');
      setReplyingTo(null);
      if (onInteraction) onInteraction();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  const buildCommentTree = (comments) => {
    const commentMap = {};
    const roots = [];

    // Create map
    comments.forEach(c => {
      commentMap[c.id] = { ...c, children: [] };
    });

    // Link children
    comments.forEach(c => {
      if (c.parent_id && commentMap[c.parent_id]) {
        commentMap[c.parent_id].children.push(commentMap[c.id]);
      } else {
        roots.push(commentMap[c.id]);
      }
    });

    return roots;
  };

  const CommentNode = ({ comment }) => (
    <div key={comment.id} className="comment-thread">
      <div className="comment-item">
        <div className="comment-avatar">
          {getInitials(comment.author.name)}
        </div>
        <div className="comment-content-wrapper" style={{ width: '100%' }}>
          <div className="comment-content">
            <div className="comment-author-name">{comment.author.name}</div>
            <div className="comment-text">{comment.content}</div>
          </div>
          <button
            className="reply-button"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
          >
            Reply
          </button>
        </div>
      </div>

      {replyingTo === comment.id && (
        <form className="comment-form reply-form" onSubmit={(e) => handleAddComment(e, comment.id)}>
          <input
            type="text"
            placeholder={`Replying to ${comment.author.name}...`}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isCommenting}
            autoFocus
          />
          <button type="submit" disabled={!commentText.trim() || isCommenting}>
            Reply
          </button>
        </form>
      )}

      {comment.children.length > 0 && (
        <div className="comment-children">
          {comment.children.map(child => <CommentNode key={child.id} comment={child} />)}
        </div>
      )}
    </div>
  );

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
          className={`action-button ${isLiked ? 'active' : ''}`}
          onClick={handleToggleLike}
          disabled={isLiking}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isLiked ? "currentColor" : "none"}
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
          <span className="action-count">{localLikes}</span>
        </button>

        <button
          className={`action-button ${isClapped ? 'active' : ''}`}
          onClick={handleToggleClap}
          disabled={isClapping}
        >
          <span style={{ fontSize: '1.2em', lineHeight: 1 }}>👏</span>
          <span className="action-count">{localClaps}</span>
        </button>

        <button
          className={`action-button ${isStarred ? 'active' : ''}`}
          onClick={handleToggleStar}
          disabled={isStarring}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isStarred ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span className="action-count">{localStars}</span>
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
            {buildCommentTree(localComments).map((rootComment) => (
              <CommentNode key={rootComment.id} comment={rootComment} />
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

