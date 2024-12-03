import React, { useState } from "react";
import "./style.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  const [open, setOpen] = useState(false);
  const [shippingCost, setShippingCost] = useState(0); // Costo de envío
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    additionalInfo: "",
    shippingAddress: "",
    items: [],
    paymentMethod: "",
    shippingType: "", // Método de envío
  });

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handleOpen = () => {
    setFormData({
      ...formData,
      items: CartItem.map((item) => ({
        productId: item.id,
        quantity: item.qty,
        price: item.price,
        discount: 0,
      })),
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleShippingChange = (e) => {
    const shippingType = e.target.value;
    setFormData({ ...formData, shippingType });

    // Calcular el costo de envío en función del tipo
    const cost = shippingType === "express" ? 2000  : 10000;
    setShippingCost(cost);
  };

  const handleSubmit = async (values) => {
    const orderData = {
      items: formData.items,
      total: totalPrice + shippingCost, // Sumar costo de envío al total
      customer: values.name,
      address: values.shippingAddress,
      phone: values.phone,
      additionalInfo: values.additionalInfo,
      paymentMethod: values.paymentMethod,
      shippingType: values.shippingType,
    };

    try {
      await axios.post("", orderData);
      alert("Compra registrada con éxito");
      setOpen(false);
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      alert("Hubo un error al procesar la compra");
    }
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items para agregar en el Carro</h1>
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
                      ${item.price.toLocaleString('es-ES')} * {item.qty}
                      <span>${productQty.toLocaleString('es-ES')}</span>
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
            <h2>Total carrito</h2>
            <div className=" d_flex">
              <h4>Precio total :</h4>
              <h3>${totalPrice.toLocaleString('es-ES')}</h3>
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
            width: 600,
            margin: "auto",
            mt: 8,
          }}
        >
          <h3>Resumen del Pedido</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CartItem.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img src={item.cover} alt={item.name} width="50" />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price.toLocaleString('es-ES')}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Formik
            initialValues={formData}
            validationSchema={Yup.object().shape({
              paymentMethod: Yup.string().required("Seleccione un método de pago"),
              shippingAddress: Yup.string()
                .min(10, "La dirección debe tener al menos 10 caracteres")
                .required("Ingrese una dirección de envío"),
              phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Número de teléfono inválido")
                .required("Ingrese un número de teléfono"),
            })}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className="form-input">
                  <label>Método de Pago</label>
                  <Field as="select" name="paymentMethod">
                    <option value="">Seleccione una opción</option>
                    <option value="Sistecredito">Sistecredito</option>
                    <option value="Nequi">Nequi</option>
                    <option value="Daviplata">Daviplata</option>
                    <option value="Bancolombia">Bancolombia</option>
                    <option value="Pago contra entrega">Pago contra entrega</option>
                    <option value="Efectivo">Efectivo</option>
                  </Field>
                  <ErrorMessage name="paymentMethod" component="div" />

                  <label>Dirección de Envío</label>
                  <Field type="text" name="shippingAddress" />
                  <ErrorMessage name="shippingAddress" component="div" />

                  <label>Teléfono</label>
                  <Field type="text" name="phone" />
                  <ErrorMessage name="phone" component="div" />

                  <label>Tipo de Envío</label>
                  <Field as="select" name="shippingType" onChange={handleShippingChange}>
                    <option value="">Seleccione una opción</option>
                    <option value="normal">Normal - $10.000</option>
                    <option value="express">Express - $20.000</option>
                  </Field>
                  <ErrorMessage name="shippingType" component="div" />

                  <h4>Costo de envío: ${shippingCost}</h4>
                  <h4>Total con Envío: ${totalPrice.toLocaleString('es-ES') + shippingCost.toLocaleString('es-ES')}</h4>
                </div>

                <button type="submit">Enviar Pedido</button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;