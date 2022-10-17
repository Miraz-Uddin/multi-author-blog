import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  const location = useLocation();
  if (location.state?.from) {
    return !isLoggedIn ? children : <Navigate to={location.state?.from} />;
  } else {
    return !isLoggedIn ? children : <Navigate to="/" />;
  }
}
