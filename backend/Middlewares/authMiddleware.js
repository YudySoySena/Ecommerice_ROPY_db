import jwt from 'jsonwebtoken';

// Middleware de autenticación
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ Message: "No se proporcionó un token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ Message: "Token inválido" });
    }
    req.user = decoded; // Guardar los datos del usuario en la solicitud
    next();
  });
};

// Middleware de autorización para roles
export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.rol_id !== role) {
      return res.status(403).json({ Message: "No tienes permisos para acceder a este recurso" });
    }
    next();
  };
};