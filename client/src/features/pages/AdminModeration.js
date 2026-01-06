import React, { useState } from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import ShoutoutReportsPanel from '../admin/ShoutoutReportsPanel';
import CommentReportsPanel from '../admin/CommentReportsPanel';

const AdminModeration = () => {
    const [activeTab, setActiveTab] = useState('shoutouts');

    return (
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            <div className="max-w-7xl mx-auto p-6 md:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Content Moderation</h1>
                    <p className="text-gray-400 mt-1">Review and manage reported content across the platform.</p>
                </header>

                <div className="flex gap-4 mb-6 border-b border-gray-800 pb-2">
                    <button
                        onClick={() => setActiveTab('shoutouts')}
                        className={`px-4 py-2 font-medium text-sm transition-colors ${activeTab === 'shoutouts' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Shoutout Reports
                    </button>
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`px-4 py-2 font-medium text-sm transition-colors ${activeTab === 'comments' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Comment Reports
                    </button>
                </div>

                {activeTab === 'shoutouts' && <ShoutoutReportsPanel />}
                {activeTab === 'comments' && <CommentReportsPanel />}
            </div>
        </div>
    );
};

export default AdminModeration;
