const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extraer solo el token
    
    // Validar presencia del token
    if (!token) return res.status(403).send("Token requerido.");

    // Verificar el token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Token inválido.");
        req.userId = decoded.id;
        req.userRole = decoded.id_rol;
        next();
    });
};

module.exports = { authenticateToken };