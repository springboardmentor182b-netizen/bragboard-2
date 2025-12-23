import './CreateShoutoutModal.css'; // Reusing modal styles

function ReportedShoutoutsModal({ onClose, reports }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content reports-modal">
                <div className="modal-header">
                    <h2>My Reported Shoutouts</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="reports-list-container">
                    {reports.length === 0 ? (
                        <div className="no-reports">
                            <p>You haven't reported any shoutouts yet.</p>
                        </div>
                    ) : (
                        reports.map((report) => (
                            <div key={report.id} className="report-item">
                                <div className="report-info">
                                    <div className="report-sender">
                                        Reported: {report.shoutoutSender}
                                    </div>
                                    <div className="report-category">
                                        Reason: {report.category}
                                    </div>
                                    <div className="report-message">
                                        "{report.reason}"
                                    </div>
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

export default ReportedShoutoutsModal;
