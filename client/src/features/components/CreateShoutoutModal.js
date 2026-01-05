import { useState, useEffect } from 'react';
import axios from 'axios';
import { MentionsInput, Mention } from 'react-mentions';
import './CreateShoutoutModal.css';

function CreateShoutoutModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    message: '',
  });

  /*
  Mock data removed.
  Fetching users from API.
  */
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await axios.get('http://127.0.0.1:8000/users', config);
        setAvailableUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const usersData = availableUsers.map(u => ({ id: u.id, display: u.name }));
  const departments = [...new Set(availableUsers.map(u => u.department))].filter(Boolean);
  const departmentsData = departments.map(d => ({ id: `dept-${d}`, display: `${d} (Department)` }));

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, message: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      alert('Please enter a message');
      return;
    }

    // Parse mentions
    const content = formData.message;
    const recipientIds = new Set();
    const regex = /@\[.*?\]\((.*?)\)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const id = match[1];
      if (id.startsWith('dept-')) {
        const deptName = id.replace('dept-', '');
        const deptUsers = availableUsers.filter(u => u.department === deptName);
        deptUsers.forEach(u => recipientIds.add(u.id));
      } else {
        recipientIds.add(Number(id));
      }
    }

    // Convert markup to readable text for simple display/storage
    const cleanMessage = content.replace(/@\[(.*?)\]\((.*?)\)/g, '@$1');

    const newShoutout = {
      id: Date.now(),
      sender: 'You',
      senderAvatar: '',
      timestamp: 'Just now',
      message: cleanMessage,
      taggedUsers: [], // Calculated by backend/feed from recipients
      recipientIds: Array.from(recipientIds),

      reactions: { emoji: 0, thumbsUp: 0 },
      comments: 0,
    };

    onSubmit(newShoutout);
    setFormData({ message: '' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Shoutout</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <div className="mentions-wrapper">
              <MentionsInput
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your shoutout... Use @ to tag people or departments!"
                className="mentions-input"
                a11ySuggestionsListLabel={"Suggested mentions"}
              >
                <Mention
                  trigger="@"
                  data={usersData}
                  className="mentions-input__mention"
                  displayTransform={(id, display) => `@${display}`}
                />
                <Mention
                  trigger="@"
                  data={departmentsData}
                  className="mentions-input__mention"
                  displayTransform={(id, display) => `@${display}`}
                />
              </MentionsInput>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Post Shoutout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateShoutoutModal;

