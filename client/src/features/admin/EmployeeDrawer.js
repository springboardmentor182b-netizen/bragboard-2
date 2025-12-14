import React, { useState } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import CreateUserModal from './CreateUserModal';

// --- DRAWER COMPONENT ---
const EmployeeDrawer = ({ isOpen, onClose }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleUserCreated = () => {
    // Refresh the user list or show success message
    // You can add a callback prop to refresh users from parent component if needed
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-80 bg-gray-950 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 z-50 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-lg font-bold">Manage Access</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {['Tapas', 'Sachin', 'Rishabh Sinha'].map((user, idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800 group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">
                  {user[0]}
                </div>
                <span className="text-gray-200 font-medium">{user}</span>
              </div>
              <button className="text-gray-500 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setCreateModalOpen(true)}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
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