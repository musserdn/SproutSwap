import { isLoggedIn, isTokenExpired } from "../utils/auth.js";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!isLoggedIn() || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
