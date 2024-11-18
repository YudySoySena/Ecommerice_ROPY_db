import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes.js';
import mysql from "mysql";
import cors from 'cors';
import UsuariosRoutes from './routes/userRoutes'; 
import RolRoutes from './routes/rolRoutes';
import session from 'express-session';
import mercadopago from 'mercadopago';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { PORT } from './routes/config.js';

dotenv.config();

const app = express();
app.use(cors({ 
  origin: 'http://localhost:3000', 
  methods: ['POST', 'GET'], 
  credentials: true 
}));
const salt = 10; 
app.use(express.json()); 
app.use(morgan('dev'));
app.use(cookieParser());
app.use(paymentRoutes);

// Conexión a la base de datos
const db = mysql.createConnection({ 
  host: process.env.DATABASE_HOST, 
  user: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASS, 
  database: process.env.DATABASE_NAME 
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/register', (req, res) => {
  const { Nombre, Email, Password } = req.body;
  const sql = "INSERT INTO usuarios (Nombre, Email, Password) VALUES (?,?,?)";
  bcrypt.hash(Password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error al introducir la contraseña" });
    const values = [Nombre, Email, hash];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error insertando datos en el servidor:', err);
        return res.json({ Error: "Error insertando datos en el servidor" });
      }
      return res.json({ Status: "Success" });
    });
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM usuarios WHERE Email = ? AND Password = ?";
  db.query(sql, [req.body.Email, req.body.Password], (err, data) => {
    if (err) return res.json({ Message: "Error del servidor" });
    if (data.length > 0) {
      const name = data[0].name;
      const rol_id = data[0].rol_id;
      const userId = data[0].id;
      const token = jwt.sign({ name, rol_id, userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
      res.cookie('token', token);
      return res.json({ Status: "Éxito", rol_id });
    } else {
      return res.json({ Message: "No existen registros del usuario" });
    }
  });
});

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
    db.query(sql, [decoded.userId], (err, data) => {
      if (err) return res.status(500).json({ Status: "Error", Message: "Error al obtener los datos del usuario" });
      if (data.length > 0) {
        return res.json({ Status: "Éxito", user: data[0] });
      } else {
        return res.status(404).json({ Status: "Error", Message: "Usuario no encontrado" });
      }
    });
  });
});

app.use('/api', UsuariosRoutes); 
app.use('/api', RolRoutes);

app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", PORT);
});