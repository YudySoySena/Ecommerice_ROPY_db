import express from 'express';
import promotionController from '../controllers/promotionsController.js';

const router = express.Router();

// Ruta para obtener todas las promociones
router.get('/allPromotions', promotionController.getAllPromotions);

// Ruta para crear una nueva promoción
router.post('/newPromotion', promotionController.createPromotion);

// Ruta para actualizar una promoción existente
router.put('/promotions/:id', promotionController.updatePromotion);

// Ruta para eliminar una promoción
router.delete('/promotions/:id', promotionController.deletePromotion);

export default router;