
import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) return;

            const response = await axios.get(`${API_BASE}/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data);


            // Calculate unread count client-side or fetch from separate endpoint
            const count = response.data.filter(n => !n.is_read).length;
            setUnreadCount(count);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
            setNotifications([]); // Ensure empty on error
        }
    };

    // Poll for notifications every 30 seconds
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleBellClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            fetchNotifications(); // Refresh on open
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            // Mark as read API call
            if (!notification.is_read) {
                await axios.patch(`${API_BASE}/notifications/${notification.id}/read`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Update local state
                setNotifications(prev => prev.map(n =>
                    n.id === notification.id ? { ...n, is_read: true } : n
                ));
                setUnreadCount(prev => Math.max(0, prev - 1));
            }

            // Navigate if link exists
            if (notification.link) {
                navigate(notification.link);
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleBellClick}
                className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-950"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-gray-800 bg-gray-900">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    </div>

                    <div className="max-h-96 overflow-y-auto custom-scrollbar">


                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                No notifications yet.
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`p-3 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors ${!notification.is_read ? 'bg-gray-800/50' : ''}`}
                                >
                                    <div className="flex gap-3">
                                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${!notification.is_read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                                        <div className="flex-1">
                                            <p className={`text-sm ${!notification.is_read ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                {notification.message}
                                            </p>
                                            <span className="text-xs text-gray-600 mt-1 block">
                                                {formatDate(notification.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
