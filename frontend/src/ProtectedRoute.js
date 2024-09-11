// components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ roleRequired, children }) => {
  const { contextUser } = useContext(UserContext);

  if (!contextUser) {
    // Si no hay usuario logueado, redirigir al login
    return <Navigate to="/login" />;
  }

  if (contextUser.Rol !== roleRequired) {
    // Si el rol del usuario no es el requerido, redirigir a una página de acceso denegado o principal
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;