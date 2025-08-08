import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

export default function PrivteRoutes({ children }) {

  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div>loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
}
PrivteRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};