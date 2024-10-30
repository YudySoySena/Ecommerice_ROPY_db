import { useContext } from "react";
import { ContextProvider } from "./UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const { contextUser, isAuthenticated } = useContext(ContextProvider);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && contextUser?.Rol !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;