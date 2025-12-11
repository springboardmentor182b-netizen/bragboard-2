import React from 'react';
import AdminShoutoutActions from './AdminShoutoutActions';

const AdminShoutoutTable = ({ shoutouts, onDelete }) => {
  if (shoutouts.length === 0) {
    return (
      <div className="empty-state">
        <i className="fa-solid fa-inbox"></i>
        <h3>No shoutouts found</h3>
        <p>Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Sender</th>
            <th style={styles.th}>Receiver</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shoutouts.map((shoutout, index) => (
            <tr key={shoutout.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
              <td style={styles.td}>
                <div style={styles.idCell}>
                  <span style={styles.idPrefix}>#</span>
                  {shoutout.id}
                </div>
              </td>
              <td style={styles.td}>
                <div style={styles.userCell}>
                  <div style={styles.avatar}>
                    {shoutout.sender.charAt(0)}
                  </div>
                  <span>{shoutout.sender}</span>
                </div>
              </td>
              <td style={styles.td}>
                <div style={styles.userCell}>
                  <div style={styles.avatar}>
                    {shoutout.receiver.charAt(0)}
                  </div>
                  <span>{shoutout.receiver}</span>
                </div>
              </td>
              <td style={{...styles.td, ...styles.messageCell}}>
                <div style={styles.messageWrapper}>
                  {shoutout.message}
                </div>
              </td>
              <td style={styles.td}>
                <span style={getCategoryStyle(shoutout.category)}>
                  {shoutout.category}
                </span>
              </td>
              <td style={styles.td}>
                <span style={getStatusStyle(shoutout.status)}>
                  {shoutout.status}
                </span>
              </td>
              <td style={styles.td}>
                <div style={styles.dateCell}>
                  <i className="fa-solid fa-calendar" style={styles.dateIcon}></i>
                  {shoutout.date}
                </div>
              </td>
              <td style={styles.td}>
                <AdminShoutoutActions 
                  shoutoutId={shoutout.id}
                  onDelete={() => onDelete(shoutout.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div style={styles.pagination}>
        <div style={styles.paginationInfo}>
          Showing {shoutouts.length} of {shoutouts.length} entries
        </div>
        <div style={styles.paginationControls}>
          <button style={styles.pageButton}>
            <i className="fa-solid fa-chevron-left" style={styles.pageIcon}></i>
          </button>
          <button style={{...styles.pageButton, ...styles.activePage}}>1</button>
          <button style={styles.pageButton}>2</button>
          <button style={styles.pageButton}>3</button>
          <button style={styles.pageButton}>
            <i className="fa-solid fa-chevron-right" style={styles.pageIcon}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const getCategoryStyle = (category) => {
  const baseStyle = {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'capitalize',
    display: 'inline-block'
  };

  switch(category.toLowerCase()) {
    case 'achievement':
      return {...baseStyle, background: '#fef3c7', color: '#92400e'};
    case 'leadership':
      return {...baseStyle, background: '#dbeafe', color: '#1e40af'};
    case 'customer service':
      return {...baseStyle, background: '#fce7f3', color: '#9d174d'};
    case 'teamwork':
      return {...baseStyle, background: '#f0f9ff', color: '#0c4a6e'};
    case 'communication':
      return {...baseStyle, background: '#f0fdf4', color: '#166534'};
    default:
      return {...baseStyle, background: '#f1f5f9', color: '#475569'};
  }
};

const getStatusStyle = (status) => {
  const baseStyle = {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'capitalize',
    display: 'inline-block'
  };

  switch(status) {
    case 'approved':
      return {...baseStyle, background: '#d1fae5', color: '#065f46'};
    case 'pending':
      return {...baseStyle, background: '#fef3c7', color: '#92400e'};
    case 'rejected':
      return {...baseStyle, background: '#fee2e2', color: '#991b1b'};
    default:
      return {...baseStyle, background: '#f1f5f9', color: '#475569'};
  }
};

const styles = {
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px'
  },
  th: {
    background: '#f8fafc',
    color: '#475569',
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    whiteSpace: 'nowrap'
  },
  td: {
    padding: '12px 16px',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '13px',
    whiteSpace: 'nowrap'
  },
  trEven: {
    background: '#ffffff'
  },
  trOdd: {
    background: '#fafafa'
  },
  idCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '600',
    color: '#1e293b'
  },
  idPrefix: {
    color: '#94a3b8'
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '12px'
  },
  messageCell: {
    maxWidth: '200px'
  },
  messageWrapper: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  dateCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '500'
  },
  dateIcon: {
    color: '#94a3b8',
    fontSize: '11px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderTop: '1px solid #e2e8f0',
    background: '#f8fafc'
  },
  paginationInfo: {
    color: '#64748b',
    fontSize: '12px'
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  pageButton: {
    padding: '6px 10px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    color: '#475569',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s',
    minWidth: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activePage: {
    background: '#667eea',
    color: 'white',
    borderColor: '#667eea'
  },
  pageIcon: {
    fontSize: '10px'
  }
};

export default AdminShoutoutTable;