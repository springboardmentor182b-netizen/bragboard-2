import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../layout/Header';
import ActivityChart from '../admin/ActivityChart';
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        fetchCurrentUser();
        fetchLeaders();
        fetchWeeklyActivity();
    }, []);

    // ------------------ CURRENT USER ------------------
    const fetchCurrentUser = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.get(
                'http://127.0.0.1:8000/users/me',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCurrentUserId(res.data.id);
        } catch (err) {
            console.error('Failed to fetch current user', err);
        }
    };

    // ------------------ LEADERBOARD ------------------
    const fetchLeaders = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8000/users/leaderboard');
            setLeaders(res.data || []);
        } catch (err) {
            console.error('Failed to fetch leaderboard', err);
        } finally {
            setLoading(false);
        }
    };

    // ------------------ WEEKLY ACTIVITY ------------------
    const fetchWeeklyActivity = async () => {
        try {
            const res = await axios.get(
                'http://127.0.0.1:8000/api/admin/stats'
            );

            // ✅ IMPORTANT FIX
            setActivityData(res.data?.weekly_activity || []);
        } catch (err) {
            console.error('Failed to fetch activity data', err);
            setActivityData([]);
        }
    };

    // ------------------ HELPERS ------------------
    const getInitials = (name = '') =>
        name
            .split(' ')
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

    const getUserRank = () => {
        if (!currentUserId) return null;
        const index = leaders.findIndex(u => u.id === currentUserId);
        return index >= 0 ? index + 1 : null;
    };

    const getUserScore = () => {
        const user = leaders.find(u => u.id === currentUserId);
        return user ? user.score : 0;
    };

    const pointsToTop3 = () => {
        if (leaders.length < 3) return 0;
        return Math.max(0, leaders[2].score - getUserScore());
    };

    const top3Total = leaders.slice(0, 3).reduce((s, u) => s + u.score, 0);
    const restTotal = leaders.slice(3).reduce((s, u) => s + u.score, 0);

    // ------------------ UI ------------------
    return (
        <div className="leaderboard-container">
            <Header />

            <main className="leaderboard-content">
                <div className="leaderboard-card">
                    <header className="leaderboard-header">
                        <h1 className="leaderboard-title">Top Performers</h1>
                        <p className="leaderboard-subtitle">
                            Recognizing the most impactful team members
                        </p>
                    </header>

                    {loading ? (
                        <div className="center-text">Loading rankings…</div>
                    ) : (
                        <>
                            {/* CURRENT USER INFO */}
                            {currentUserId && getUserRank() && (
                                <div className="user-rank-info">
                                    <strong>You are ranked #{getUserRank()}</strong>
                                    {pointsToTop3() > 0 ? (
                                        <span>
                                            {pointsToTop3()} points needed to reach Top 3
                                        </span>
                                    ) : (
                                        <span>🎉 You are in the Top 3!</span>
                                    )}
                                </div>
                            )}

                            {/* TOP 3 vs REST BAR */}
                            <div className="analytics-bar">
                                <div
                                    className="top3-bar"
                                    style={{ flex: top3Total || 1 }}
                                    title={`Top 3 total: ${top3Total}`}
                                />
                                <div
                                    className="rest-bar"
                                    style={{ flex: restTotal || 1 }}
                                    title={`Rest total: ${restTotal}`}
                                />
                            </div>
                            <div className="analytics-labels">
                                <span>Top 3</span>
                                <span>Rest</span>
                            </div>

                            {/* LEADERBOARD LIST */}
                            <div className="leaderboard-list">
                                {leaders.map((leader, index) => {
                                    const rank = index + 1;
                                    const isCurrentUser = leader.id === currentUserId;

                                    return (
                                        <div
                                            key={leader.id}
                                            className={`leaderboard-row rank-${rank <= 3 ? rank : 'other'} ${
                                                isCurrentUser ? 'current-user' : ''
                                            }`}
                                        >
                                            <div className="rank-badge">{rank}</div>

                                            <div className="user-info">
                                                <div className="user-avatar">
                                                    <span className="initials">
                                                        {getInitials(leader.name)}
                                                    </span>
                                                </div>
                                                <div className="user-details">
                                                    <span className="user-name">
                                                        {leader.name}
                                                    </span>
                                                    {leader.department && (
                                                        <span className="user-dept">
                                                            {leader.department}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="score-container">
                                                <div className="user-score">
                                                    {leader.score}
                                                </div>
                                                <span className="score-label">
                                                    Points
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ACTIVITY CHART — BELOW RANKINGS */}
                            {activityData.length > 0 && (
                                <div className="leaderboard-chart">
                                    <ActivityChart data={activityData} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Leaderboard;
