// Middleware de validación de roles
export const checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.rol_id !== role) {
        return res.status(403).json({ Message: 'Acceso denegado, no tienes permisos suficientes' });
      }
      next();
    };
  };
  