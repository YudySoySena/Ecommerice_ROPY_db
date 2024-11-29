import express from 'express';
import authController from '../controllers/authController.js';
import { verifyToken } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Ruta para registrar usuarios
// router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta protegida para obtener los datos del usuario autenticado
// router.get('/profile', verifyToken, getUserData);

export default router;
