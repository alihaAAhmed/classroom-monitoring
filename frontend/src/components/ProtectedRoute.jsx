import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  // ⚡ Directly localStorage se check karo (AuthContext bypass)
  const token = localStorage.getItem("cms_token");
  const stored = localStorage.getItem("cms_user");

  if (!token || !stored) {
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    user = JSON.parse(stored);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}