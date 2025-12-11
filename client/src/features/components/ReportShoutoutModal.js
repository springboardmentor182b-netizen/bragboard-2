import { useState } from 'react';
import './CreateShoutoutModal.css'; // Reusing modal styles

function ReportShoutoutModal({ onClose, onSubmit, shoutoutSender }) {
    const [reason, setReason] = useState('');
    const [category, setCategory] = useState('inappropriate');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reason.trim()) return;

        onSubmit({
            reason,
            category,
            timestamp: new Date().toISOString(),
            status: 'Pending'
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Report Shoutout</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Report shoutout from {shoutoutSender}</label>
                        <p className="helper-text">Please select a reason for reporting this content.</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="modal-input"
                        >
                            <option value="inappropriate">Inappropriate Content</option>
                            <option value="spam">Spam</option>
                            <option value="harassment">Harassment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reason">Details</label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please provide specific details..."
                            className="modal-textarea"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReportShoutoutModal;
