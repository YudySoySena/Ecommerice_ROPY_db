import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Validation from './loginValidation';

const Login = () => {
  const [values, setValues] = useState({
    Email: '',
    Password: ''
  });
  
  axios.defaults.withCredentials = true;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        Email: values.Email,
        Password: values.Password,
      }, { withCredentials: true });
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Credenciales incorrectas' });
    } finally {
      setLoading(false);
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
                className="form-control"
                placeholder="Correo"  
                onChange={event => setValues({...values, Email: event.target.value})}
              />
              {errors.Email && (
                <span className="error-text">{errors.Email}</span>
              )}
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="Password"
                className="form-control"
                placeholder="Contraseña"
                onChange={event => setValues({...values, Password: event.target.value})}
              />
              {errors.Password && (
                <span className="error-text">{errors.Password}</span>
              )}
            </div>
            {errors.general && (
              <span className="error-text">{errors.general}</span>
            )}
            <div className="row">
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? "Cargando..." : "Iniciar Sesión"}
                </button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgotPassword">¿Olvidaste tu contraseña?</Link>
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