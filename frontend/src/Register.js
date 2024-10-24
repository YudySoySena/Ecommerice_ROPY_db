import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './register.css';
import Validation from "./registerValidation"; // Suponiendo que tienes un archivo para validaciones

const Register = () => {
  const [values, setValues] = useState({
    Nombre: '',
    Email: '',
    Password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});  // Estado para los errores
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    
    // Asegúrate de que no haya errores
    if (!validationErrors.Nombre && !validationErrors.Email && !validationErrors.Password && !validationErrors.confirmPassword) {
      setLoading(true); // Inicia la carga
      axios.post('http://localhost:8081/register', values)
        .then(res => {
          setLoading(false); // Detén la carga
          navigate('/login');
        })
        .catch(err => {
          setLoading(false); // Detén la carga
          console.error(err);
        });
    }
  };

  return (
    <div className="register-box">
      <div className="card">
        <div className="card-body register-card-body">
          <b>Registro</b>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="Nombre"
                value={values.Nombre}
                onChange={handleInput}
              />
              {errors.Nombre && <span className="text-danger">{errors.Nombre}</span>}
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="Email"
                value={values.Email}
                onChange={handleInput}
              />
              {errors.Email && <span className="text-danger">{errors.Email}</span>}
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="Password"
                value={values.Password}
                onChange={handleInput}
              />
              {errors.Password && <span className="text-danger">{errors.Password}</span>}
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirmar Contraseña"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInput}
              />
              {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 offset-8">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Cargando...' : 'Registrar'}
                </button>
              </div>
            </div>
          </form>
          <p className="mb-0">
            <Link to="/login" className="text-center">
              ¿Ya tienes una cuenta?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;