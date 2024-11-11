import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes.js';
import mysql from "mysql"
import cors from 'cors';
import session from 'express-session';
import mercadopago from 'mercadopago';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PORT} from './routes/config.js'

dotenv.config();

const app = express();

app.use(cors({ 
  origin: 'http://localhost:3000', 
  methods: ['POST', 'GET'], 
  credentials: true 
}));
app.use(express.json()); 
app.use(morgan('dev'))
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

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM usuarios WHERE Email = ? AND Password = ? ";
  db.query(sql, [req.body.Email, req.body.Password], (err, data) => {
    if(err) return res.json({Message: "Error del servidor"});
    if (data.length > 0 ) {
        const name = data[0].name;
        const token = jwt.sign({name}, "our-jsonwebtoken-secret-key", {expiresIn:'1d'});
        res.cookie('token', token);
        return res.json({Status: "Éxito"})
    } else {
        return res.json({Message: "No existen registros del usuario"})
    }
  })
})


app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", PORT);
});