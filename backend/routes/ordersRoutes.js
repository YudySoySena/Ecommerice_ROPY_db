import express from 'express';
import orderController from '../controllers/ordersController.js';

const router = express.Router();

// Ruta para crear una nueva orden
// router.post('/orders', orderController.createOrder);

// Ruta para obtener todas las órdenes
router.get('/allorders', orderController.getAllOrders);

// Ruta para eliminar una orden
// router.delete('/orders/:id', orderController.deleteOrder);

export default router;
