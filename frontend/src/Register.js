import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from 'axios';
import './register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Email: '',
    Password: ''
  });

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // You can customize this function according to your requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const enviar = async (event) => {
    event.preventDefault();

  const { Nombre, Email, Password } = formData;
  
  if (!Nombre) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
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
  if (!validatePassword(Password)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/Users", formData);
      console.log("Éxito:", response.data);
      // Redirige al login después de un registro exitoso
      navigate('/login'); // Cambia a `navigate`
    } catch (error) {
      console.error("Error al enviar los datos:", error);
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
                value={formData.Nombre}
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
                value={formData.Email}
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
                value={formData.Password}
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
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
