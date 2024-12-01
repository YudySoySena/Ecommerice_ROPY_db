import React, { useState } from "react";
import axios from "axios";
import './new.css';

const NewUser = ({ title }) => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Email: "",
    Password: "",
    Status: "Activo",
    Rol: "Usuario"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/users/newUser", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Usuario creado:", response.data);
      alert("Usuario registrado exitosamente.");
    } catch (error) {
      console.error("Error creando usuario:", error.response ? error.response.data : error.message);
      alert("Error al registrar usuario: " + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Nombre</label>
                <input
                  type="text"
                  name="Nombre"
                  placeholder="Nombre completo"
                  value={formData.Nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  name="Email"
                  placeholder="Correo electrónico"
                  value={formData.Email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  name="Password"
                  placeholder="Contraseña"
                  value={formData.Password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>Status</label>
                <select
                  name="Status"
                  value={formData.Status}
                  onChange={handleInputChange}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Suspendido">Suspendido</option>
                </select>
              </div>

              <div className="formInput">
                <label>Rol</label>
                <select
                  name="Rol"
                  value={formData.Rol}
                  onChange={handleInputChange}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <button type="submit">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;