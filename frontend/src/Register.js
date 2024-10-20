import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate
import axios from 'axios';
import './register.css';

const Register = () => {
  const [values, setValues] = useState({
    Nombre: '',
    Email: '',
    Password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/Users?Email=${email}`);
      return response.data.length > 0; // Asume que la respuesta es un array de usuarios
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const enviar = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { Nombre, Email, Password } = values;

    // Validaciones
    if (!Nombre) {
      alert("Por favor, ingresa tu nombre.");
      setLoading(false);
      return;
    }
    if (!validateName(Nombre)) {
      alert("El nombre solo debe contener letras y espacios.");
      setLoading(false);
      return;
    }
    if (!Email) {
      alert("Por favor, ingresa tu correo electrónico.");
      setLoading(false);
      return;
    }
    if (!validateEmail(Email)) {
      alert("El formato del correo electrónico no es válido.");
      setLoading(false);
      return;
    }
    if (await checkEmailExists(Email)) {
      alert("El correo electrónico ya está registrado.");
      setLoading(false);
      return;
    }
    if (!Password) {
      alert("Por favor, ingresa tu contraseña.");
      setLoading(false);
      return;
    }
    if (!validatePassword(Password)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/Users", values);
      console.log("Éxito:", response.data);
      // Redirige al login después de un registro exitoso
      navigate('/login');
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al registrar el usuario. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-box">
      <div className="card">
        <div className="card-body register-card-body">
          <b>Registro</b>
          <form onSubmit={enviar}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="Nombre"
                value={values.Nombre}
                onChange={handleChange}
                required
              />
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
                onChange={handleChange}
                required
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
                className="form-control"
                placeholder="Password"
                name="Password"
                value={values.Password}
                onChange={handleChange}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 offset-8">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Cargando...' : 'Register'}
                </button>
              </div>
              <p className="mb-0">
            <Link to="/login" className="text-center">
              ¿Ya tienes una cuenta?
            </Link>
          </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;