import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Camille', email: 'camille@company.com', department: 'DEVELOPMENT', role: 'employee' },
    { id: 2, name: 'Lee', email: 'lee@company.com', department: 'MARKETING', role: 'employee' },
    { id: 3, name: 'Lily', email: 'lily@company.com', department: 'HR', role: 'admin' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    department: 'DEVELOPMENT',
    role: 'employee'
  });

  const departments = ['DEVELOPMENT', 'MARKETING', 'IT SUPPORT', 'HR'];
  const roles = ['employee', 'admin'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      const user = {
        id: users.length + 1,
        ...newUser
      };
      setUsers(prev => [...prev, user]);
      setNewUser({
        name: '',
        email: '',
        department: 'DEVELOPMENT',
        role: 'employee'
      });
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div className="user-management">
      {/* Add User Form */}
      <div className="add-user-form">
        <h3>Add New User</h3>
        <form onSubmit={handleAddUser}>
          <div className="form-row">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department:</label>
              <select
                name="department"
                value={newUser.department}
                onChange={handleInputChange}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="add-user-btn">
            Add User
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="users-list">
        <h3>Existing Users ({users.length})</h3>
        <div className="users-table">
          <div className="table-header">
            <div>Name</div>
            <div>Email</div>
            <div>Department</div>
            <div>Role</div>
            <div>Actions</div>
          </div>
          {users.map(user => (
            <div key={user.id} className="table-row">
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.department}</div>
              <div>
                <span className={`role-badge ${user.role}`}>
                  {user.role}
                </span>
              </div>
              <div>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;