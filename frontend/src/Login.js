import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { UserContext } from "./UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
    redirectTo: 'profile'  // Nuevo campo para elegir la página de redirección
  });

  const { setContextUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const enviar = async (e) => {
    e.preventDefault();

    const { Email, Password, redirectTo } = formData;

    // Validaciones del lado del cliente
    if (!Email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    if (!validateEmail(Email)) {
      alert("El formato del correo electrónico no es válido. Asegúrate de incluir el símbolo '@'.");
      return;
    }
    if (!Password) {
      alert("Por favor, ingresa tu contraseña.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/Users", {
        params: {
          Email,
          Password
        }
      });

      const user = response.data.find(user => user.Email === Email && user.Password === Password);

      if (user) {
        console.log("Éxito:", user);
        setContextUser(user);

       if (redirectTo === 'profile' && user.id) {
  navigate(`/user/${user.id}`);
} else {
  navigate('/');
}

      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.");
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
                name="Email"
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
                name="Password"
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

            {/* Nuevo select para elegir la página de redirección */}
            <div className="input-group mb-3">
              <label>Redirigir a:</label>
              <select
                name="redirectTo"
                className="form-control"
                value={formData.redirectTo}
                onChange={handleChange}
              >
                <option value="profile">Perfil</option>
                <option value="mainPage">Página Principal</option>
              </select>
            </div>

            <div className="row">
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
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