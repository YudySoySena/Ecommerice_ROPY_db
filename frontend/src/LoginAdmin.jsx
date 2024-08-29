import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usa useNavigate en lugar de useHistory
import './loginAdmin.css'; // Importa el archivo CSS

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  const validateUsername = (username) => {
    // Verifica que el nombre de usuario no esté vacío y no contenga números
    return username.trim() !== '' && /^[a-zA-Z\s]+$/.test(username);
  };

  const validatePassword = (password) => {
    // Verifica que la contraseña no esté vacía
    return password.trim() !== '';
  };

  const handleLogin = () => {
    // Simula la verificación de las credenciales del usuario
    const admin = {
      user: "Yudy Garcia",
      password: "Yg5678¿?"
    };

    if (!validateUsername(username)) {
      alert('Nombre de usuario inválido. Debe contener solo letras y espacios.');
      return;
    }

    if (!validatePassword(password)) {
      alert('La contraseña no puede estar vacía.');
      return;
    }

    if (username === admin.user && password === admin.password) {
      setIsAuthenticated(true);
      navigate('/admin'); // Redirige a la página de administración usando navigate
    } else {
      alert('Nombre de usuario o contraseña incorrectos'); // Muestra el mensaje de error
    }
  };

  return (
    <div className="login-container">
      <h2>Hola de nuevo Admin</h2>
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
