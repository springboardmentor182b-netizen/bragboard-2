import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, allowedRoles, role }) {
  return allowedRoles.includes(role) ? (
    Component
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}
