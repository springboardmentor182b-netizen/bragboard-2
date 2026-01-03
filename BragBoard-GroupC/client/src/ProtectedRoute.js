import { Navigate, useLocation, Outlet } from "react-router-dom";
import { getUserRole, isAuthenticated } from "./utils/auth";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const location = useLocation();

  // User not logged in → Login
  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Get user role safely
  const role = getUserRole();

  // Logged in but role not allowed → Unauthorized
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized → Render page
  return element ? element : <Outlet />;
};

export default ProtectedRoute;
