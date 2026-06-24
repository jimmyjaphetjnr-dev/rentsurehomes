import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // If the session is still loading, show a brief loading message
  if (loading) {
    return <div className="p-6 text-center">Loading session...</div>;
  }

  // If no user is logged in, boot them directly to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a user exists, let them pass through to the page
  return children;
}
