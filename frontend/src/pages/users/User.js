import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';

function User() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login'); // Redirige al login si no hay datos del usuario
    }
  }, [navigate]);

  return (
    <div className="user-page">
      {user ? (
        <div>
          <h1>Bienvenido, {user.Nombre}</h1>
          <p>Email: {user.Email}</p>
          {/* Mostrar más información específica del usuario */}
        </div>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
}

export default User;