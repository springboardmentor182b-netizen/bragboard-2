import './CreateShoutoutModal.css'; // Reusing modal styles

function ReportedCommentsModal({ onClose, reports }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content reports-modal">
                <div className="modal-header">
                    <h2>My Reported Comments</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="reports-list-container">
                    {reports.length === 0 ? (
                        <div className="no-reports">
                            <p>You haven't reported any comments yet.</p>
                        </div>
                    ) : (
                        reports.map((report) => (
                            <div key={report.id} className="report-item">
                                <div className="report-info">
                                    <div className="report-sender">
                                        Report ID: #{report.id}
                                    </div>
                                    <div className="report-category">
                                        Reason: {report.reason}
                                    </div>
                                    <div className="report-message">
                                        Comment: "{report.comment_content || 'content unavailable'}"
                                    </div>
                                    {report.description && (
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                            Note: {report.description}
                                        </div>
                                    )}
                                </div>
                                <div className="report-status-badge">
                                    <span className={`status-tag status-${report.status?.toLowerCase()}`}>
                                        {report.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportedCommentsModal;
