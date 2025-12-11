import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminPageContainer = ({ children }) => {
  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.mainContent}>
        <AdminNavbar />
        <main style={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8fafc'
  },
  mainContent: {
    flex: 1,
    marginLeft: '250px', // Match sidebar width
    display: 'flex',
    flexDirection: 'column'
  },
  contentArea: {
    flex: 1,
    padding: '0',
    background: '#f8fafc'
  }
};

export default AdminPageContainer;