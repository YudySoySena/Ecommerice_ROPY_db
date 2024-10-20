import React, { useState } from "react";
import "./style.css";
import logo from "../../components/assets/images/logo.png";
import nequiIcon from "../../components/assets/images/pay/pay7.png";
import daviplataIcon from "../../components/assets/images/pay/pay6.png";
import bancolombiaIcon from "../../components/assets/images/pay/pay3.png";
import efectivoIcon from "../../components/assets/images/pay/pay2.png";
import tarjetasIcon from "../../components/assets/images/pay/pay4.png";
import contraentregaIcon from "../../components/assets/images/pay/pay1.png";

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
          <div className="payment-methods">
          <p>Métodos de Pago:</p>
          <ul className="payment-list">
            <li><img src={nequiIcon} alt="Nequi" /></li>
            <li><img src={daviplataIcon} alt="Daviplata" /></li>
            <li><img src={bancolombiaIcon} alt="Bancolombia" /></li>
            <li><img src={efectivoIcon} alt="Efectivo" /></li>
            <li><img src={tarjetasIcon} alt="Tarjetas" /></li>
            <li><img src={contraentregaIcon} alt="Contraentrega" /></li>
          </ul>
        </div>
          <div>©2024 por muebles ROPY.</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;