import React, { createContext} from 'react';

// Crear el contexto de usuario
export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
    const rol_id = '2';
    const authenticated = true;
    return (
      <UserContext.Provider value={{ rol_id, authenticated }}>
        {children}
      </UserContext.Provider>
    );
  
};

export default ContextProvider;