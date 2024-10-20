import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { UserContext } from "./UserContext";
import Validation from './loginValidation';

const Login = ({ setIsAuthenticated }) => {
  const [values, setValues] = useState({
    Email: "",
    Password: "",
    redirectTo: "profile"
  })
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }
  const handleSubmit =(event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }

  const { setContextUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const enviar = async (e) => {
    e.preventDefault();

    const { Email, Password, redirectTo } = values;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (user) => {
    if (user && user.Rol === "Administrador") {
      setContextUser(user);
      setIsAuthenticated(true);
      navigate("/admin");
    } else {
          // Si no es administrador, sigue la redirección habitual
          if (redirectTo === "profile" && user.id) {
            navigate(`/user/${user.id}`);  // Redirigir al perfil del usuario
          } else {
            navigate("/");  // Redirigir a la página principal
          }
    }
  };

    if (!Email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    if (!validateEmail(Email)) {
      alert("El formato del correo electrónico no es válido.");
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
          Password,
        },
      });

      const user = response.data.find(
        (user) => user.Email === Email && user.Password === Password
      );

      if (user) {
        handleLogin(user);
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
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                name="Email"
                required
                autoComplete="email"
                className="form-control"
                placeholder="Correo"
                value={values.Email}
                onChange={handleInput}
              />
              {errors.Email && <span className='text'>{errors.Email}</span>}
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
                value={values.Password}
                onChange={handleInput}
              />
              {errors.Password && <span className='text'>{errors.Password}</span>}
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <label>Redirigir a:</label>
              <select
                name="redirectTo"
                className="form-control"
                value={values.redirectTo}
                onChange={handleChange}
              >
                <option value="profile">Perfil</option>
                <option value="mainPage">Página Principal</option>
              </select>
            </div>

            <div className="row">
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgot_password">¿Olvidaste tu contraseña?</Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              ¿Aún no estás registrado?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
