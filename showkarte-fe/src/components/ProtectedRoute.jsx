import { Navigate } from "react-router-dom";
import { getUserFromToken, isLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ allowedRoles, children }) {

  // 1️⃣ If user is NOT logged in → go to login
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Get user details from JWT
  const user = getUserFromToken();

  // 3️⃣ If role is NOT allowed → go to landing page
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ Otherwise allow access
  return children;
}
