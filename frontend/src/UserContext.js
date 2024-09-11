import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de usuario
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [contextUser, setContextUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('contextUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  });

  // Efecto para guardar el usuario en el localStorage cuando se actualice
  useEffect(() => {
    try {
      if (contextUser) {
        localStorage.setItem('contextUser', JSON.stringify(contextUser));
      } else {
        localStorage.removeItem('contextUser'); // Limpiar el localStorage si no hay usuario
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
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