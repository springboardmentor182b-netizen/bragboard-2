import { useState } from 'react';
import './CreateShoutoutModal.css';

function CreateShoutoutModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    message: '',
    taggedUser: '',
  });

  const availableUsers = [
    'E-firar',
    'Cody Fisher',
    'Darlene Robertson',
    'Jane Cooper',
    'Jenny Wilson',
    'Kristin Watson',
    'Eleanor Pena',
    'Eather Howard',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      alert('Please enter a message');
      return;
    }

    const newShoutout = {
      id: Date.now(),
      sender: 'You',
      senderAvatar: '',
      timestamp: 'Just now',
      message: formData.message,
      taggedUsers: formData.taggedUser ? [formData.taggedUser] : [],
      reactions: { emoji: 0, thumbsUp: 0 },
      comments: 0,
    };

    onSubmit(newShoutout);
    setFormData({ message: '', taggedUser: '' });
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
            <label htmlFor="taggedUser">Tag Employee (Optional)</label>
            <select
              id="taggedUser"
              name="taggedUser"
              value={formData.taggedUser}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select an employee...</option>
              {availableUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your shoutout message here..."
              className="form-textarea"
              rows="6"
              required
            />
            {formData.taggedUser && (
              <p className="form-hint">
                Tip: Mention "{formData.taggedUser}" in your message to tag them.
              </p>
            )}
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

