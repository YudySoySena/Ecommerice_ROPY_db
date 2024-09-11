import React, { useState } from "react";
import "./style.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    additionalInfo: "",
    shippingAddress: "",
    items: [], // Inicializar items como un array vacío
  });

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = CartItem.reduce(
      (price, item) => price + item.qty * item.price,
      0
    );

    const orderData = {
      items: CartItem,
      total: totalPrice,
      customer: formData.name,
      address: formData.shippingAddress,
      phone: formData.phone,
      additionalInfo: formData.additionalInfo,
    };

    try {
      await axios.post("http://localhost:4000/Pedidos", orderData);
      alert("Compra registrada con éxito");
      setOpen(false);
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      alert("Hubo un error al procesar la compra");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { productId: "", quantity: 1, price: 0, discount: 0 },
      ],
    });
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
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
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
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

            <Button variant="contained" color="primary" onClick={handleOpen}>
              Realizar Compra
            </Button>
          </div>
        </div>
      </section>

      <Modal open={open} onClose={handleClose}>
        <Box
          className="modal-box"
          sx={{
            bgcolor: "background.paper",
            p: 4,
            width: 400,
            margin: "auto",
            mt: 8,
          }}
        >
          <div className="order-form">
            <h2>Formulario de Pedido</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-input">
                <label>Dirección de Envío</label>
                <input
                  type="text"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <h3>Items del Pedido</h3>
              {formData.items.map((item, index) => (
                <div key={index} className="item-input">
                  <label>Producto ID</label>
                  <input
                    type="text"
                    name="productId"
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />

                  <label>Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />

                  <label>Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />

                  <label>Descuento (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
              ))}

              <button type="button" onClick={addItem}>
                Agregar Item
              </button>

              <button type="submit">Enviar Pedido</button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
