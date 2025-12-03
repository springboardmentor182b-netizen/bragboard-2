import PageContainer from "../layout/PageContainer";
import AdminDashboard from "./AdminDashboard";

const AdminHome = ({ role }) => (
  <PageContainer role={role}>
     <h1>Admin Dashboard</h1>
    <p>Admin tools coming soon.</p>
  </PageContainer>,
  <AdminDashboard role={role}>
    <h1>Admin Dashboard</h1>
    <p>Admin tools coming soon.</p>
  </AdminDashboard>
);

export default AdminHome;
