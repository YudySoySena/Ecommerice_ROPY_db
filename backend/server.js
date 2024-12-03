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
import promotionsRoutes from './routes/promotionsRoutes.js'
import notificationsRoutes from './routes/notificationsRoutes.js'
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PORT } from "./routes/config.js";

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

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
app.use('/api/notifications', notificationsRoutes)

// Ruta de bienvenida
app.get('/api', (req, res) => { 
  res.send('Bienvenido a la API'); 
});

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Endpoint para registrar un usuario
app.post('/register', (req, res) => { 
  const { Nombre, Email, Password } = req.body; 
  const sql = "INSERT INTO usuarios (Nombre, Email, Password) VALUES (?,?,?)"; 
  bcrypt.hash(Password.toString(), 10, (err, hash) => { 
    if (err) return res.json({ Error: "Error al introducir la contraseña" }); 
    const values = [Nombre, Email, hash]; 
    req.getConnection((err, conn) => { 
      if (err) { 
        console.error('Error connecting to the database:', err); 
        return res.json({ Error: "Error de conexión a la base de datos" }); 
      } 
      conn.query(sql, values, (err, result) => { 
        if (err) { 
          console.error('Error insertando datos en el servidor:', err); 
          return res.json({ Error: "Error insertando datos en el servidor" }); 
        } 
        return res.json({ Status: "Success" }); 
      }); 
    }); 
  }); 
});

// Endpoint para iniciar sesión
app.post('/login', (req, res) => { 
  const sql = "SELECT * FROM usuarios WHERE Email = ?"; 
  req.getConnection((err, conn) => { 
    if (err) { 
      console.error('Error connecting to the database:', err); 
      return res.json({ Message: "Error del servidor" }); 
    } 
    conn.query(sql, [req.body.Email], (err, data) => { 
      if (err) return res.json({ Message: "Error del servidor" }); 
      if (data.length > 0) { 
        bcrypt.compare(req.body.Password, data[0].Password, (err, result) => { 
          if (err) return res.json({ Message: "Error del servidor" }); 
          if (result) { 
            const name = data[0].Nombre; 
            const rol_id = data[0].rol_id; 
            const userId = data[0].id; 
            const token = jwt.sign({ name, rol_id, userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION }); 
            res.cookie('token', token); 
            return res.json({ Status: "Éxito", rol_id }); 
          } else { 
            return res.json({ Message: "Contraseña incorrecta" }); 
          } 
        }); 
      } else { 
        return res.json({ Message: "No existen registros del usuario" }); 
      } 
    }); 
  }); 
});

// Endpoint para obtener datos del usuario autenticado
app.get('/getUser', (req, res) => { 
  const token = req.cookies.token; 
  if (!token) { 
    return res.status(401).json({ Status: "Error", Message: "No token provided" }); 
  } 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
    if (err) { 
      return res.status(401).json({ Status: "Error", Message: "Failed to authenticate token" }); 
    } 
    const sql = "SELECT * FROM usuarios WHERE id = ?"; 
    req.getConnection((err, conn) => { 
      if (err) { 
        console.error('Error connecting to the database:', err); 
        return res.status(500).json({ Status: "Error", Message: "Error de conexión a la base de datos" }); 
      } 
      conn.query(sql, [decoded.userId], (err, data) => { 
        if (err) return res.status(500).json({ Status: "Error", Message: "Error al obtener los datos del usuario" }); 
        if (data.length > 0) { 
          return res.json({ Status: "Éxito", user: data[0] }); 
        } else { 
          return res.status(404).json({ Status: "Error", Message: "Usuario no encontrado" }); 
        } 
      }); 
    }); 
  }); 
});

// Iniciar el servidor
app.listen(PORT, () => { 
  console.log(`Servidor escuchando en el puerto ${PORT}`); 
});