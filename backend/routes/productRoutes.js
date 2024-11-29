import express from 'express';
import fileUpload from 'express-fileupload';
import productController from '../controllers/productController.js';
import upload from '../Middlewares/uploadMiddleware.js';

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/allproduct', productController.getAllProducts);

// Ruta para obtener un producto por ID
router.get('/productos/:id', productController.getProductById);

// Ruta para obtener productos con descuentos
router.get('/discounted', productController.getDiscountedProducts);

// Ruta para actualizar un producto existente 
router.put('/productos/:id', upload.single('file'), productController.updateProduct); 
// Ruta para eliminar un producto 
router.delete('/productos/:id', productController.deleteProduct);

// Ruta para crear un nuevo producto
//router.post('/create', upload.single('file'), productController.createProduct);


export default router;