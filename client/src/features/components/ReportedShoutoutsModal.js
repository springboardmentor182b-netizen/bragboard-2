import './CreateShoutoutModal.css'; // Reusing modal styles

function ReportedShoutoutsModal({ onClose, reports }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                    <h2>My Reported Shoutouts</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="reports-list" style={{ maxHeight: '400px', overflowY: 'auto', padding: '0 20px 20px' }}>
                    {reports.length === 0 ? (
                        <p className="no-data">You haven't reported any shoutouts yet.</p>
                    ) : (
                        reports.map((report) => (
                            <div key={report.id} className="report-item" style={{
                                borderBottom: '1px solid #eee',
                                padding: '15px 0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div className="report-info">
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                                        Reported: {report.shoutoutSender}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>
                                        Reason: {report.category}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#888' }}>
                                        "{report.reason}"
                                    </div>
                                </div>
                                <div className="report-status">
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        backgroundColor: report.status === 'Pending' ? '#fff3cd' : '#d4edda',
                                        color: report.status === 'Pending' ? '#856404' : '#155724'
                                    }}>
                                        {report.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="modal-actions">
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportedShoutoutsModal;
