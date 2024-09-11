const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

let orders = JSON.parse(fs.readFileSync('orders.json', 'utf-8'));
let users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
let productItems = JSON.parse(fs.readFileSync('itemsproducts.json', 'utf-8'));

// Obtener todos los pedidos
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Crear un nuevo pedido
app.post('/orders', (req, res) => {
  const { userId, items } = req.body;

  // Verificar si el usuario existe y está activo
  const user = users.find(u => u.id === userId && u.Status === 'Activo');
  if (!user) {
    return res.status(400).json({ error: 'Usuario no válido o inactivo.' });
  }

  // Calcular el total del pedido
  let totalAmount = 0;
  items.forEach(item => {
    const product = productItems.find(p => p.id === item.productId);
    if (product) {
      totalAmount += product.price * item.quantity;
    }
  });

  const newOrder = {
    orderId: (orders.length + 1).toString().padStart(3, '0'),
    userId,
    items,
    totalAmount,
    status: 'pendiente'
  };

  orders.push(newOrder);
  fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));

  res.status(201).json(newOrder);
});

// Obtener un pedido específico por ID
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

// Actualizar el estado de un pedido
app.put('/orders/:id', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.orderId === req.params.id);

  if (order) {
    order.status = status;
    fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
    res.json(order);
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

// Eliminar un pedido
app.delete('/orders/:id', (req, res) => {
  const orderIndex = orders.findIndex(o => o.orderId === req.params.id);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
    res.json({ message: 'Pedido eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`API de pedidos escuchando en http://localhost:${port}`);
});
