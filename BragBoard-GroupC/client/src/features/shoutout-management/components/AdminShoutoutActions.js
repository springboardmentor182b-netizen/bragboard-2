import React, { useState } from 'react';

const AdminShoutoutActions = ({ shoutoutId, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);

  const handleDelete = () => {
    onDelete(shoutoutId);
    setShowActions(false);
  };

  const handleApprove = () => {
    alert(`Approve shoutout ${shoutoutId}`);
    setShowActions(false);
  };

  const handleReject = () => {
    alert(`Reject shoutout ${shoutoutId}`);
    setShowActions(false);
  };

  const toggleButtonStyle = hoverButton ? 
    { ...styles.toggleButton, ...styles.toggleButtonHover } : 
    styles.toggleButton;

  const menuItems = [
    { icon: 'fa-solid fa-eye', label: 'View', onClick: () => alert(`View ${shoutoutId}`) },
    { icon: 'fa-solid fa-pen', label: 'Edit', onClick: () => alert(`Edit ${shoutoutId}`) },
    { icon: 'fa-solid fa-check', label: 'Approve', onClick: handleApprove, color: '#10b981' },
    { icon: 'fa-solid fa-times', label: 'Reject', onClick: handleReject, color: '#ef4444' },
    { icon: 'fa-solid fa-trash', label: 'Delete', onClick: handleDelete, color: '#dc2626' }
  ];

  return (
    <div style={styles.dropdownContainer}>
      <button 
        style={toggleButtonStyle}
        onClick={() => setShowActions(!showActions)}
        onMouseEnter={() => setHoverButton(true)}
        onMouseLeave={() => setHoverButton(false)}
        onBlur={() => setTimeout(() => setShowActions(false), 200)}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
      
      {showActions && (
        <div style={styles.menu} onMouseLeave={() => setShowActions(false)}>
          {menuItems.map((item, index) => (
            <button 
              key={index}
              style={{
                ...styles.menuButton,
                color: item.color || '#334155'
              }} 
              onClick={item.onClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  toggleButton: {
    background: '#f8fafc',
    border: '2px solid #eef2f7',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#64748b',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  toggleButtonHover: {
    background: '#f1f5f9',
    borderColor: '#cbd5e1',
    color: '#475569'
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: '100%',
    background: 'white',
    border: '1px solid #eef2f7',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    minWidth: '180px',
    zIndex: 1000,
    marginTop: '8px',
    overflow: 'hidden'
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    background: 'white',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '1px solid #f1f5f9',
    transition: 'all 0.2s'
  }
};

export default AdminShoutoutActions;