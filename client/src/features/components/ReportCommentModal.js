import { useState } from 'react';
import './CreateShoutoutModal.css'; // Reusing modal styles

function ReportCommentModal({ onClose, onSubmit, commentAuthor }) {
    const [details, setDetails] = useState('');
    const [category, setCategory] = useState('inappropriate');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Map category to reason, details to description
        onSubmit({
            reason: category,
            description: details,
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Report Comment</h2>
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
                        <label>Report comment by {commentAuthor}</label>
                        <p className="form-hint">Please select a reason for reporting this comment.</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-select"
                        >
                            <option value="inappropriate">Inappropriate Content</option>
                            <option value="spam">Spam</option>
                            <option value="harassment">Harassment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="details">Details (Optional)</label>
                        <textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Please provide specific details..."
                            className="form-textarea"
                            rows={4}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReportCommentModal;
