import { useState } from 'react';
import Header from '../layout/Header';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import CreateShoutoutModal from '../components/CreateShoutoutModal';
import './Dashboard.css';

function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [shoutouts, setShoutouts] = useState([
    {
      id: 1,
      sender: 'Annette Black',
      senderAvatar: '',
      timestamp: '3 hours ago',
      message: 'Gave a shout-out to E-firar Her way helped at little project!',
      taggedUsers: ['E-firar'],
      reactions: { emoji: 1, thumbsUp: 1 },
      comments: 1,
    },
    {
      id: 2,
      sender: 'Albert Flores',
      senderAvatar: '',
      timestamp: '1 day ago',
      message: 'Gave Cody Fisher — Her always going above and beyond!',
      taggedUsers: ['Cody Fisher'],
      reactions: { emoji: 1, thumbsUp: 1 },
      comments: 3,
    },
    {
      id: 3,
      sender: 'Savannah Nguyen',
      senderAvatar: '',
      timestamp: '2 days ago',
      message: 'Appreciate Darlene Robertson for the team effort.',
      taggedUsers: ['Darlene Robertson'],
      reactions: { emoji: 0, thumbsUp: 1 },
      comments: 4,
    },
  ]);

  const handleCreateShoutout = (newShoutout) => {
    setShoutouts([newShoutout, ...shoutouts]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="dashboard-header-section">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-search-container">
              <div className="search-box">
                <svg
                  className="search-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />
              </div>
            </div>
          </div>
          <Feed shoutouts={shoutouts} />
        </div>
        <Sidebar />
      </div>
      <button
        className="create-shoutout-button"
        onClick={() => setIsCreateModalOpen(true)}
        aria-label="Create Shoutout"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>Create Shoutout</span>
      </button>
      {isCreateModalOpen && (
        <CreateShoutoutModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateShoutout}
        />
      )}
    </div>
  );
}

export default Dashboard;

