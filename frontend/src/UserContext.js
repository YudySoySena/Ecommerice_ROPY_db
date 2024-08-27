import React, { createContext, useState } from 'react';

// Crea el contexto
export const UserContext = createContext();

// Crea el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [contextUser, setContextUser] = useState(null);

  return (
    <UserContext.Provider value={{ contextUser, setContextUser }}>
      {children}
    </UserContext.Provider>
  );
};
