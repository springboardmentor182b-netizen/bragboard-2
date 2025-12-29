import React, { useState } from "react";

const CreateShoutout = ({ onCancel }) => {
  const [recipientIds, setRecipientIds] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/shoutouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient_ids: recipientIds
            .split(",")
            .map((id) => Number(id.trim())),
          message,
        }),
      });

      if (!res.ok) throw new Error("Failed to create shoutout");

      setSuccess("🎉 Shoutout sent successfully!");
      setRecipientIds("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-shoutout-wrapper">
      <div className="create-shoutout-card">
        <h2 className="create-shoutout-title">Create Shoutout</h2>
        <p className="create-shoutout-subtitle">
          Appreciate a teammate publicly ✨
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* RECIPIENT FIRST */}
          <div>
            <label className="create-shoutout-label">Recipient ID</label>
            <input
              type="text"
              value={recipientIds}
              onChange={(e) => setRecipientIds(e.target.value)}
              placeholder="2, 5, 7"
              required
              className="create-shoutout-input"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="create-shoutout-label">Message</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something nice…"
              required
              className="create-shoutout-textarea"
            />
          </div>

          {error && <div className="create-shoutout-error">{error}</div>}
          {success && (
            <div className="create-shoutout-success">{success}</div>
          )}

          <div className="create-shoutout-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-cancel"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Posting..." : "Send Shoutout"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShoutout;
