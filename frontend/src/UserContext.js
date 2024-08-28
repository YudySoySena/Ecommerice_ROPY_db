import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [contextUser, setContextUser] = useState(null);

  return (
    <UserContext.Provider value={{ contextUser, setContextUser }}>
      {children}
    </UserContext.Provider>
  );
};
