import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import "./PageContainer.css";

const PageContainer = ({ children, role }) => {
  return (
    <div className="page-wrapper">
      <Navbar role={role} />
      <div className="page-body">
        <Sidebar role={role} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default PageContainer;
