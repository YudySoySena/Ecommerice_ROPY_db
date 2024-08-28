import React, { useState } from "react";
import "./style.css";
import logo from "../../components/assets/images/logo.png";

const Footer = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log('Formulario enviado:', formData);
    alert('Mensaje enviado');
    // Reiniciar el formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
  };

  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <div className='logo width'>
              <img src={logo} alt='' />
            </div>
            <p>Comodidad y confianza con ROPY</p>
          </div>
          <div>©2024 por muebles ROPY.</div>
          <div className='box contacto-form'>
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              />
              <textarea
                name="mensaje"
                placeholder="Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

