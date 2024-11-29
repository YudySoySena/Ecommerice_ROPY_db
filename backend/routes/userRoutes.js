import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

//ruta para crear un nuevo usuario

router.post('/newUser', userController.createUser)

// Ruta para obtener todos los usuarios
router.get('/allUsers', userController.getAllUsers);

// Ruta para actualizar un usuario
router.put('/users/:id', userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/users/:id', userController.deleteUser);

// Ruta para autenticar un usuario
router.post('/login', userController.loginUser);

export default router;