import { getUserRole } from "../utils/auth";
import Navbar from "./Navbar";
import Sidebar from "./SideBars";
import "./PageContainer.css";
import { Outlet } from "react-router-dom";


const PageContainer = () => {
  const role = getUserRole();

  return (
    <div className="page-wrapper">
      <Navbar role={role} />
      <div className="page-body">
        <Sidebar role={role} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
