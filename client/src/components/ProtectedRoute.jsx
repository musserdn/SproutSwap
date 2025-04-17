import { isLoggedIn } from "../utils/auth.js";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
