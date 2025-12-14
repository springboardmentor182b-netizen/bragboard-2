import { useState } from 'react';
import Header from '../layout/Header';
import './Settings.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

function Settings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus(null);
  };

  const apiPost = async (path, payload, token) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.error) {
      throw new Error(data.error || 'Request failed');
    }
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setStatus({
        type: 'error',
        text: 'Please fill in all fields.',
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setStatus({
        type: 'error',
        text: 'New password must be at least 8 characters long.',
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({
        type: 'error',
        text: 'New password and confirm password do not match.',
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setStatus({
        type: 'error',
        text: 'New password must be different from current password.',
      });
      setIsSubmitting(false);
      return;
    }

    const storedToken =
      localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    const email = localStorage.getItem('email') || sessionStorage.getItem('email');

    if (!email) {
      setStatus({
        type: 'error',
        text: 'No user email found. Please log in again.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await apiPost(
        '/auth/change-password',
        {
          email,
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
        },
        storedToken
      );

      setStatus({
        type: 'success',
        text: 'Password changed successfully!',
      });
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        text: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusClassName = status ? `status-message status-${status.type}` : '';

  return (
    <div className="settings-container">
      <Header />
      <div className="settings-content">
        <div className="settings-card">
          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your account settings and preferences</p>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Change Password</h2>
            <form className="settings-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                  minLength={8}
                />
                <p className="form-hint">Password must be at least 8 characters long</p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {status && (
                <div className={statusClassName} role="status">
                  {status.text}
                </div>
              )}

              <button type="submit" className="settings-button" disabled={isSubmitting}>
                {isSubmitting ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

