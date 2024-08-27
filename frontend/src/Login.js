// Login.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { UserContext } from "./UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: '',  // Cambiado a mayúscula
    Password: '' // Cambiado a mayúscula
  });

  // Asegúrate de que `setContextUser` esté disponible en el contexto
  const { setContextUser } = useContext(UserContext);
  const navigate = useNavigate(); // Usa `useNavigate` en lugar de `history`

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:4000/Users", {
        params: {
          Email: formData.Email,
          Password: formData.Password
        }
      });

      const user = response.data.find(
        user => user.Email === formData.Email && user.Password === formData.Password
      );

      if (user) {
        console.log("Éxito:", user);
        setContextUser(user); // Actualiza el contexto con el usuario
        navigate(`/user/${user.id}`); // Navega a la ruta del usuario
      } else {
        console.log("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="card-body">
      <div className="hold-transition login-page">
        <div className="login-box">
          <b>Iniciar Sesión</b>
          <form onSubmit={enviar}>
            <div className="input-group mb-3">
              <input
                type="email"
                name="Email"  // Cambiado a mayúscula
                required
                autoComplete="email"
                className="form-control"
                placeholder="Correo"
                value={formData.Email}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="Password"  // Cambiado a mayúscula
                autoComplete="current-password"
                className="form-control"
                placeholder="Contraseña"
                value={formData.Password}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgot_password">¿Olvidaste tu contraseña?</Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">¿Aún no estás registrado?</Link>
          </p>
          <p className="mb-0">
            <Link to="/loginAdmin" className="text-center">¿Eres Administrador?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

