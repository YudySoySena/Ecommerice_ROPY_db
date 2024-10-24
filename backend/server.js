const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite manejar datos JSON en el body de la solicitud

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
    const sql = "INSERT INTO Usuarios (Nombre, Email, Password) VALUES (?, ?, ?)";
    
    // Valores que vienen en el cuerpo de la solicitud
    const values = [
        req.body.Nombre,
        req.body.Email,
        req.body.Password
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

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM Usuarios WHERE Email = ? and Password = ?";
    db.query(sql, [req.body.Email, req.body.Password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json(data[0]); // Devuelve el primer usuario encontrado
        } else { 
            return res.json(null); // Devuelve null si no hay usuario
        }
    });
});

// Escuchar en el puerto 8081
app.listen(8081, () => {
    console.log("Servidor escuchando en el puerto 8081");
});