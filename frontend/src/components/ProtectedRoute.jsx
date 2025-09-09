// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) return <Navigate to="/login" />;

  // 🔐 Check role match
  if (role && user.role !== role.toLowerCase()) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
