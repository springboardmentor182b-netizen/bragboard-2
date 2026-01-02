import React from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import ShoutoutReportsPanel from '../admin/ShoutoutReportsPanel';

const AdminModeration = () => {
    return (
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-blue-500 selection:text-white">
            <AdminNavbar />

            <div className="max-w-7xl mx-auto p-6 md:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Content Moderation</h1>
                    <p className="text-gray-400 mt-1">Review and manage reported content across the platform.</p>
                </header>

                <ShoutoutReportsPanel />
            </div>
        </div>
    );
};

export default AdminModeration;
