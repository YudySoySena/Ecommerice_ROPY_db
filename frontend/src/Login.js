import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { UserContext } from "./context/ContextProvider";
import Validation from './loginValidation';

const Login = () => {
  const [values, setValues] = useState({
    Email: '',
    Password: ''
  });
  
  axios.defaults.withCredentials = true;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        setLoading(false);
        if(res.data.Status === "Éxito") {
          setUser({
            rol_id: res.data.rol_id,
            authenticated: true
          });
          if (res.data.rol_id === 2) {
            navigate('/admin/*');
          } else if (res.data.rol_id === 1) {
            navigate('/user');
          } else {
            navigate('/');
          }
        } else {
          alert(res.data.Message);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }
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