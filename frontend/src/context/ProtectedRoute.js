import React, { useContext } from "react";
import { UserContext } from "./ContextProvider"; // Asegúrate de que el nombre sea correcto
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ rol_id }) => {
  const { rol_id: contextRolId, authenticated } = useContext(UserContext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (!rol_id.includes(contextRolId)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
