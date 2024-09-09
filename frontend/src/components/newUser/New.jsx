import React, { useState } from "react";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import axios from "axios";
import './new.css';

const NewUser = ({ title }) => {
  const [file, setFile] = useState(null);

  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    Nombre: "",
    Email: "",
    Password: "",
    Status: "Activo", // Puedes cambiarlo a un valor predeterminado si lo deseas
    Rol: "Usuario" // Puedes ajustar este valor según lo que desees
  });

  // Función para manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para enviar los datos a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/Users", formData);
      console.log("Usuario creado:", response.data);
    } catch (error) {
      console.error("Error creando usuario:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "/assets/person/DefaultProfile.jpg"
              }
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="formInput">
                <label>Nombre</label>
                <input
                  type="text"
                  name="Nombre"
                  placeholder="Nombre completo"
                  value={formData.Nombre}
                  onChange={handleInputChange}
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
                />
              </div>

              <div className="formInput">
                <label>Status</label>
                <input
                  type="text"
                  name="Status"
                  placeholder="Estado (Activo, Inactivo, Suspendido)"
                  value={formData.Status}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Rol</label>
                <input
                  type="text"
                  name="Rol"
                  placeholder="Rol (Administrador, Usuario)"
                  value={formData.Rol}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
