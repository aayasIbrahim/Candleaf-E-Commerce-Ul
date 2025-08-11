import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PrivteRoutes({ children }) {

  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner/>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
}
PrivteRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};