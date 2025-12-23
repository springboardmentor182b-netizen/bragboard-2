import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../layout/Header';
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaders();
    }, []);

    const fetchLeaders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const response = await axios.get('http://127.0.0.1:8000/users/leaderboard', config);
            setLeaders(response.data);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="leaderboard-container">
            <Header />
            <main className="leaderboard-content">
                <div className="leaderboard-card">
                    <header className="leaderboard-header">
                        <h1 className="leaderboard-title">Top Performers</h1>
                        <p className="leaderboard-subtitle">Recognizing the most impactful team members</p>
                    </header>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            Loading rankings...
                        </div>
                    ) : leaders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            No data available yet.
                        </div>
                    ) : (
                        <div className="leaderboard-list">
                            {leaders.map((leader, index) => {
                                const rank = index + 1;
                                return (
                                    <div key={leader.id || leader.email} className={`leaderboard-row rank-${rank <= 3 ? rank : 'other'}`}>
                                        <div className="rank-badge">{rank}</div>
                                        <div className="user-info">
                                            <div className="user-avatar">
                                                <span className="initials">{getInitials(leader.name)}</span>
                                            </div>
                                            <div className="user-details">
                                                <span className="user-name">{leader.name}</span>
                                                {leader.department && <span className="user-dept">{leader.department}</span>}
                                            </div>
                                        </div>
                                        <div className="score-container">
                                            <div className="user-score">{leader.score}</div>
                                            <span className="score-label">Points</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Leaderboard;
