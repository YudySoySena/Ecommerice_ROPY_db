import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; // Importa useHistory
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Email: '',
    Password: ''
  });

  const history = useHistory(); // Inicializa useHistory

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const enviar = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/Users", formData);
      console.log("Éxito:", response.data);
      // Redirige al login después de un registro exitoso
      history.push('/login');
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="register-box">
      <div className="register-logo">
        <Link to="#"></Link>
      </div>
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