import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [contextUser, setContextUser] = useState(null);

  return (
    <UserContext.Provider value={{ contextUser, setContextUser }}>
      {children}
    </UserContext.Provider>
  );
};