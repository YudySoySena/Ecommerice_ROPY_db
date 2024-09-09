import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de usuario
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [contextUser, setContextUser] = useState(() => {
    // Al inicializar el estado, recuperar el usuario del localStorage si existe
    const storedUser = localStorage.getItem('contextUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Efecto para guardar el usuario en el localStorage cuando se actualice
  useEffect(() => {
    if (contextUser) {
      localStorage.setItem('contextUser', JSON.stringify(contextUser));
    } else {
      localStorage.removeItem('contextUser'); // Limpiar el localStorage si no hay usuario
    }
  }, [contextUser]);

  // Función para cerrar sesión
  const logout = () => {
    setContextUser(null);  // Limpiar el estado
    localStorage.removeItem('contextUser');  // Eliminar del localStorage
  };

  return (
    <UserContext.Provider value={{ contextUser, setContextUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};