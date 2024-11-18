import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto de usuario
export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        rol_id: null,
        authenticated: false,
        userData: null
    });

    useEffect(() => {
        axios.get('http://localhost:8081/getUser')
            .then(res => {
                if (res.data.Status === "Éxito") {
                    setUser({
                        rol_id: res.data.user.rol_id,
                        authenticated: true,
                        userData: res.data.user
                    });
                } else {
                    setUser({
                        rol_id: null,
                        authenticated: false,
                        userData: null
                    });
                }
            })
            .catch(err => {
                console.log(err);
                setUser({
                    rol_id: null,
                    authenticated: false,
                    userData: null
                });
            });
    }, []);

    return (
        <UserContext.Provider value={{ ...user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default ContextProvider;