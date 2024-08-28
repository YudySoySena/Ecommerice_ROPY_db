import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import './loginAdmin.css'; // Importa el archivo CSS

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  const handleLogin = () => {
    // Simula la verificación de las credenciales del usuario
    const admin = {
      user: "Yudy Garcia",
      password: "5678"
    };

    if (username === admin.user && password === admin.password) {
      setIsAuthenticated(true);
      navigate('/admin'); // Redirige a la página de administración usando navigate
    } else {
      setError('Nombre de usuario o contraseña incorrectos'); // Muestra el mensaje de error
    }
  };

  return (
    <div className="login-container">
      <h2>Hola de nuevo Admin</h2>
      {error && <div className="error-message">{error}</div>} {/* Muestra el mensaje de error */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;