import React from 'react';
import AdminPageContainer from '../layout/AdminPageContainer';
import AdminShoutoutManagement from '../features/shoutout-management/AdminShoutoutManagement';

const AdminShoutouts = () => {
  return (
    <AdminPageContainer>
      <AdminShoutoutManagement />
    </AdminPageContainer>
  );
};

export default AdminShoutouts;