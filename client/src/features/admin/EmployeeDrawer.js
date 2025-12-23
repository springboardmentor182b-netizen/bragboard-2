import React, { useState, useEffect } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import axios from 'axios';
import CreateUserModal from './CreateUserModal';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000';

// --- DRAWER COMPONENT ---
const EmployeeDrawer = ({ isOpen, onClose }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Refresh list
    } catch (error) {
      alert("Failed to delete user: " + (error.response?.data?.detail || error.message));
    }
  };

  const handleUserCreated = () => {
    fetchUsers();
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-80 bg-gray-950 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 z-50 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-lg font-bold">Manage Access</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {loading ? (
            <div className="text-gray-400 text-center py-4">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-gray-400 text-center py-4">No users found.</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800 group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-bold ring-1 ring-blue-500/30">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-200 font-medium text-sm">{user.name}</span>
                    <span className="text-gray-500 text-[10px]">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus size={16} /> Add New User
        </button>
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleUserCreated}
      />
    </>
  );
};

export default EmployeeDrawer;
