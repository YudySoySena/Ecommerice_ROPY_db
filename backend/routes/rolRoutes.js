import express from 'express';
import { createRol, getRoles, getRolById } from '../controllers/rolController.js';
import { authenticateToken } from '../Middlewares/authMiddleware.js';
import { checkRole } from '../Middlewares/roleMiddleware.js';

const router = express.Router();

// Rutas protegidas por autenticación y rol de administrador
router.post('/roles', authenticateToken, checkRole([1]), createRol);
router.get('/roles', authenticateToken, checkRole([1]), getRoles);
router.get('/roles/:id', authenticateToken, checkRole([1]), getRolById);

export default router;