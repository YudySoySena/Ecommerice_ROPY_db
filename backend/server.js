import express from 'express';
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes.js';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import mercadopago from 'mercadopago';
import bcrypt from 'bcrypt';
import {PORT} from './routes/config.js'

const app = express();

// Middlewares
app.use(cors({ 
  origin: 'http://localhost:3000', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));
app.use(morgan('dev'))
app.use(express.json()); // Permite manejar datos JSON en el body de la solicitud
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(paymentRoutes);

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "muebles_ropy"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Ruta para el registro de usuarios
app.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hash(req.body.Password, 10)
  const sql = "INSERT INTO Usuarios (Nombre, Email, Password, rol_id) VALUES (?,?,?,?)";
  
  const values = [
    req.body.Nombre,
    req.body.Email,
    req.body.Password,
    req.body.rol_id // Asegúrate de que el rol sea enviado en el cuerpo de la solicitud
  ];

  // Ejecutar la consulta SQL
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error during query:", err);
      return res.status(500).json("Error en la inserción");
    }
    return res.status(200).json(data);
  });
});

// Ruta para el login de usuarios
app.post('/login', (req, res) => {
  const sql = "SELECT u.*, r.nombre AS Rol FROM Usuarios u INNER JOIN Rol r ON u.rol_id = r.id_rol WHERE u.Email =?";
  db.query(sql, [req.body.Email], (err, result) => {
    if (err) return res.json({Message: "Error dentro del servidor"});
    if (result.length > 0) {
      const user = result[0];
      if (bcrypt.compareSync(req.body.Password, user.Password)) {
        req.session.usuario = user;
        req.session.rol_id = user.rol_id;
        return res.json({Login: true, redirect: '/after-login', user, Rol: user.Rol}); // Devuelve el usuario completo y el rol
      } else {
        return res.json({Login: false}); // Devuelve null si no hay usuario
      }
    } else {
      return res.json({Login: false}); // Devuelve null si no hay usuario
    }
  });
});
// Middleware para verificar el rol y redirigir
const verificarRol = (rol_id) => {
  return (req, res, next) => {
    if (!req.session.usuario || req.session.rol_id!== rol_id) {
      return res.status(401).json({Message: "No autorizado"});
    }
    next();
  };
};

// Ruta protegida para administradores
app.get('/admin', verificarRol('2'), (req, res) => { // 1 para Administrador
  res.json({Message: "Bienvenido al panel de administrador"});
});

// Ruta protegida para usuarios
app.get('/user/:id', verificarRol('1'), (req, res) => { // 1 para Usuario
  const userId = req.params.id;
  const sql = 'SELECT * FROM Usuarios WHERE id =?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los datos del usuario');
    }
    if (results.length > 0) {
      res.json(results[0]); // Enviamos los datos del usuario
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  });
});

app.get('/after-login', (req, res) => {
  if (req.session.rol_id === '2') {
    res.redirect('/admin');
  } else if (req.session.rol_id === '1') {
    res.redirect(`/user/${req.session.usuario.id}`);
  } else {
    res.status(401).json({Message: "No autorizado"});
  }
});
// Escuchar en el puerto 8081
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", PORT);
});