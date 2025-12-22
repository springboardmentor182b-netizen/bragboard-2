import FeedPost from './FeedPost';
import './Feed.css';

function Feed({ shoutouts, onReport, currentUserId }) {
  return (
    <div className="feed-container">
      {shoutouts.length === 0 ? (
        <div className="feed-empty">
          <p>No shoutouts yet. Be the first to create one!</p>
        </div>
      ) : (
        shoutouts.map((shoutout) => (
          <FeedPost
            key={shoutout.id}
            shoutout={shoutout}
            onReport={() => onReport(shoutout)}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  );
}

export default Feed;

