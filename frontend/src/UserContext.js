import React, { createContext} from 'react';

// Crear el contexto de usuario
export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
    const Rol = 'admin';
    const authenticated = true;
    return (
      <UserContext.Provider value={{ Rol, authenticated }}>
        {children}
      </UserContext.Provider>
    );
  
};

export default ContextProvider;