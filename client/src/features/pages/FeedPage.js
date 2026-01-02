import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Header from '../layout/Header';
import Feed from '../components/Feed';
import ReportShoutoutModal from '../components/ReportShoutoutModal';
import './Dashboard.css'; // Reusing dashboard styles for consistent layout

const FeedPage = () => {
    const [shoutouts, setShoutouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [currentShoutoutToReport, setCurrentShoutoutToReport] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setCurrentUserId(decoded.user_id);
            } catch (e) {
                console.error("FeedPage: Invalid token", e);
            }
        }
        fetchShoutouts();
    }, [fetchShoutouts]);

    const fetchShoutouts = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const response = await axios.get('http://127.0.0.1:8000/shoutouts', config);

            const formattedShoutouts = response.data.map(item => {
                const likedByMe = (item.likes || []).some(l => l.user_id === currentUserId || l.id === currentUserId);
                const clappedByMe = (item.claps || []).some(l => l.user_id === currentUserId || l.id === currentUserId);
                const starredByMe = (item.stars || []).some(l => l.user_id === currentUserId || l.id === currentUserId);

                return {
                    id: item.id,
                    sender: item.sender.name,
                    senderAvatar: '',
                    department: item.sender.department,
                    timestamp: new Date(item.created_at).toLocaleString(),
                    message: item.message,
                    taggedUsers: (item.recipients || []).map(r => r.name),
                    reactions: {
                        emoji: 0,
                        thumbsUp: (item.likes || []).length,
                        likedByMe: likedByMe,
                        claps: (item.claps || []).length,
                        clappedByMe: clappedByMe,
                        stars: (item.stars || []).length,
                        starredByMe: starredByMe
                    },
                    likes: item.likes || [],
                    comments: item.comments || []
                };
            });
            setShoutouts(formattedShoutouts);
        } catch (error) {
            console.error("Error fetching shoutouts:", error);
        } finally {
            setLoading(false);
        }
    }, [currentUserId]);

    const handleReportClick = (shoutout) => {
        setCurrentShoutoutToReport(shoutout);
        setIsReportModalOpen(true);
    };

    const handleSubmitReport = async (reportData) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) return;
            const decoded = jwtDecode(token);

            const payload = {
                shoutout_id: currentShoutoutToReport.id,
                reason: reportData.category,
                description: reportData.reason
            };

            await axios.post(`http://127.0.0.1:8000/api/shoutout-reports?reporter_id=${decoded.user_id}`, payload);

            setIsReportModalOpen(false);
            setCurrentShoutoutToReport(null);
            alert('Report submitted successfully!');
        } catch (error) {
            console.error("Failed to submit report:", error);
            alert("Failed to submit report. Please try again.");
        }
    };

    return (
        <div className="dashboard-container">
            <Header />
            <main className="dashboard-content" style={{ justifyContent: 'center' }}>
                <div className="dashboard-main" style={{ maxWidth: '800px', width: '100%', float: 'none', margin: '0 auto' }}>
                    <div className="dashboard-header-section">
                        <h1 className="dashboard-title">Activity Feed</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            Stay updated with the latest recognition from across the company.
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            Loading feed...
                        </div>
                    ) : (
                        <Feed
                            shoutouts={shoutouts}
                            onReport={handleReportClick}
                            currentUserId={currentUserId}
                            onInteraction={fetchShoutouts}
                        />
                    )}
                </div>
            </main>

            {isReportModalOpen && currentShoutoutToReport && (
                <ReportShoutoutModal
                    shoutoutSender={currentShoutoutToReport.sender}
                    onClose={() => setIsReportModalOpen(false)}
                    onSubmit={handleSubmitReport}
                />
            )}
        </div>
    );
};

export default FeedPage;
