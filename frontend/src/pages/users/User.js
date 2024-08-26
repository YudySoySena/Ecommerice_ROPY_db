import React, { useEffect, useState } from 'react'
import './user.css'

function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtén los datos del usuario del localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Si no hay datos del usuario, redirige al login (puedes manejar esto de diferentes maneras)
      console.log("Usuario no autenticado");
    }
  }, []);
  return (
    <div className="user-page">
      {user ? (
        <div>
          <h1>Bienvenido, {user.Nombre}</h1>
          <p>Email: {user.Email}</p>
          {/* Aquí puedes mostrar más información específica del usuario */}
        </div>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
};  
export default User