import express from "express";
import morgan from "morgan";
import paymentRoutes from "./routes/payment.routes.js";
import mysql from "mysql";
import myConnection from "express-myconnection";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import promotionsRoutes from './routes/promotionsRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js'; 
import authRoutes from './routes/authRoutes.js';
import { verifyToken, authorizeRole } from './Middlewares/authMiddleware.js';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PORT } from "./routes/config.js";

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();
const router = express.Router();

// Configurar middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(paymentRoutes); 

// Configurar el middleware express-myconnection
const dbConfig = { 
  host: process.env.DATABASE_HOST, 
  user: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASS, 
  database: process.env.DATABASE_NAME 
};
app.use(myConnection(mysql, dbConfig, 'single'));

// Configurar rutas
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/orders', ordersRoutes); 
app.use('/api/promotions', promotionsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/auth', authRoutes);

// Ruta de bienvenida
app.get('/api', (req, res) => { 
  res.send('Bienvenido a la API'); 
});

app.get('/api/profileUser', verifyToken, (req, res) => {
  const { user } = req;
  res.json({ user });
});

// Ruta protegida para el administrador
router.get('/admin', verifyToken, authorizeRole(1), (req, res) => {
  // Aquí puedes agregar cualquier consulta que necesites
  // Obtener los datos del administrador desde la base de datos
  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error en la conexión a la base de datos:', err);
      return res.status(500).json({ message: 'Error de servidor' });
    }

    // Realiza una consulta a la base de datos (por ejemplo, obtener todos los usuarios)
    const sql = "SELECT * FROM usuarios WHERE rol = 1"; // Puedes ajustar la consulta según lo que necesites
    conn.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener los datos:', err);
        return res.status(500).json({ message: 'Error al obtener los datos' });
      }

      // Responde con los datos obtenidos
      res.json(data); 
    });
  });
});

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


// Iniciar el servidor
app.listen(PORT, () => { 
  console.log(`Servidor escuchando en el puerto ${PORT}`); 
});