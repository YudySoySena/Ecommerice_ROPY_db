import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Iniciar sesión
const login = async (req, res) => {
  const { Email, Password } = req.body;
  const sql = `
    SELECT u.id, u.Nombre, u.Email, u.Password, u.Rol, r.nombre AS rol_nombre 
    FROM usuarios u 
    JOIN rol r ON u.Rol = r.id_rol 
    WHERE Email = ?
  `;

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ Error: 'Error del servidor' });
    }

    conn.query(sql, [Email], async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: 'Error en la base de datos' });
      }

      if (data.length === 0) {
        return res.status(404).json({ Message: 'Usuario no encontrado' });
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(Password, data[0].Password);
      if (!isPasswordValid) {
          console.log('Contraseña incorrecta:', Password, data[0].Password);
          return res.status(401).json({ Message: 'Contraseña incorrecta' });      
      }

      // Crear token
      const user = {
        id: data[0].id,
        name: data[0].Nombre,
        email: data[0].Email,
        rol_id: data[0].Rol,
        rol_nombre: data[0].rol_nombre,
      };

      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Secure en producción
      return res.json({ 
        Status: 'Login exitoso', 
        user: user, 
        redirect: data[0].Rol === 1 ? '/profileUser' : '/admin'
      });
    });
  });
};

// Middleware para autenticar y extraer datos del usuario
/* const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ Message: 'Token inválido' });
  }
};
 */
export default { login };