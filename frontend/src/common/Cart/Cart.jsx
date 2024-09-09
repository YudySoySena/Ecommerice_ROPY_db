import React, { useState } from "react";
import "./style.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  // State para manejar la apertura del modal
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    additionalInfo: '',
  });

  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      items: CartItem,
      total: totalPrice,
      customer: formData.name,
      address: formData.address,
      phone: formData.phone,
      additionalInfo: formData.additionalInfo,
    };

    try {
      await axios.post('http://localhost:4000/Pedidos', orderData); // Envío a la API
      alert('Compra registrada con éxito');
      setOpen(false);
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      alert('Hubo un error al procesar la compra');
    }
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && <h1 className="no-items product">No Items are add in Cart</h1>}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="cartControl d_flex">
                      <button className="incCart" onClick={() => addToCart(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button className="desCart" onClick={() => decreaseQty(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>

            {/* Botón para abrir el modal de compra */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Realizar Compra
            </Button>
          </div>
        </div>
      </section>

      {/* Modal para el formulario de compra */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" sx={{ bgcolor: 'background.paper', p: 4, width: 400, margin: 'auto', mt: 8 }}>
          <h2>Formulario de Compra</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Dirección"
              name="address"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Teléfono"
              name="phone"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Información adicional"
              name="additionalInfo"
              fullWidth
              margin="normal"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Finalizar Compra
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;