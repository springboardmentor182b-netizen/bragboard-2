import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Header from '../layout/Header';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import CreateShoutoutModal from '../components/CreateShoutoutModal';
import ReportShoutoutModal from '../components/ReportShoutoutModal';
import ReportedShoutoutsModal from '../components/ReportedShoutoutsModal';
import './Dashboard.css';

function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isViewReportsOpen, setIsViewReportsOpen] = useState(false);
  const [currentShoutoutToReport, setCurrentShoutoutToReport] = useState(null);

  // Mock data for reported shoutouts
  const [reportedShoutouts, setReportedShoutouts] = useState([]);

  const [sortBy, setSortBy] = useState('newest');

  /* 
  Mock data removed.
  Using API to fetch shoutouts.
  */
  const [shoutouts, setShoutouts] = useState([]);

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.user_id);
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
    fetchShoutouts();
  }, []);

  const fetchShoutouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('http://127.0.0.1:8000/shoutouts', config);

      // Transform the data to match the UI's expected format if necessary
      // The API returns: { id, title, message, sender: { name, department }, created_at, ... }
      // The UI expects: { id, sender, department, timestamp, message, ... }
      const formattedShoutouts = response.data.map(item => ({
        id: item.id,
        sender: item.sender.name,
        senderAvatar: '', // Placeholder
        department: item.sender.department,
        timestamp: new Date(item.created_at).toLocaleString(), // Simple formatting
        message: item.message, // Assuming 'message' is the main text. API has 'title' and 'message'. 
        // If the UI is single-text, maybe combine them? Or just use message.
        taggedUsers: item.recipients || [],
        reactions: { emoji: 0, thumbsUp: 0 }, // Backend doesn't seem to return counts yet in ShoutoutRead
        comments: 0
      }));
      setShoutouts(formattedShoutouts);
    } catch (error) {
      console.error("Error fetching shoutouts:", error);
    }
  };

  const handleCreateShoutout = async (newShoutout) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }
      const decoded = jwtDecode(token);
      // The API expects: { title, message, sender_id, recipient_id, tags }
      // The modal returns: { message, recipient, tags, ... }
      // We need to map modal data to API payload.
      // NOTE: We need numeric IDs for sender/recipient. 
      // Assuming we can get sender_id from token or user state. 
      // Recipient selection in modal likely gives us a user object or ID.

      // Use a default recipient ID for now if not selected, or ensure modal provides it.
      // This is a critical integration point: getting the recipient's ID.
      // For now, let's assume the backend handles basic validation.

      const payload = {
        title: "Shoutout", // Default title if not provided
        message: newShoutout.message,
        sender_id: decoded.user_id || 1, // Fallback/Extract from token
        recipient_id: newShoutout.recipientId || 2, // Needs to be passed from modal
        tags: newShoutout.tags || []
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post('http://127.0.0.1:8000/shoutouts', payload, config);

      // Add new shoutout to list (re-fetch or append)
      fetchShoutouts();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create shoutout", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(`Failed: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("Failed to create shoutout. Please try again.");
      }
    }
  };

  const handleReportClick = (shoutout) => {
    setCurrentShoutoutToReport(shoutout);
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = (reportData) => {
    const newReport = {
      id: Date.now(),
      shoutoutId: currentShoutoutToReport.id,
      shoutoutSender: currentShoutoutToReport.sender,
      ...reportData
    };
    setReportedShoutouts([newReport, ...reportedShoutouts]);
    setIsReportModalOpen(false);
    setCurrentShoutoutToReport(null);
    alert('Report submitted successfully!');
  };

  const getSortedShoutouts = () => {
    const shoutoutsCopy = [...shoutouts];
    if (sortBy === 'department') {
      return shoutoutsCopy.sort((a, b) => {
        const deptA = a.department || '';
        const deptB = b.department || '';
        return deptA.localeCompare(deptB);
      });
    }
    // Default to newest (assuming id or original order reflects timestamp for mock data)
    return shoutoutsCopy;
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="dashboard-header-section">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-actions">
              <select
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #e1e1e1',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  marginRight: '12px'
                }}
              >
                <option value="newest">Sort by Date</option>
                <option value="department">Sort by Department</option>
              </select>
              <button
                className="view-reports-button"
                onClick={() => setIsViewReportsOpen(true)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #e1e1e1',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                My Reports
              </button>
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
          </div>
          <Feed shoutouts={getSortedShoutouts()} onReport={handleReportClick} currentUserId={currentUserId} />
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
            strokeLinejoin="round"
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

      {isReportModalOpen && currentShoutoutToReport && (
        <ReportShoutoutModal
          shoutoutSender={currentShoutoutToReport.sender}
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleSubmitReport}
        />
      )}

      {isViewReportsOpen && (
        <ReportedShoutoutsModal
          reports={reportedShoutouts}
          onClose={() => setIsViewReportsOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;

