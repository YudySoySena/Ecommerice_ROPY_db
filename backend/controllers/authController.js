import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Iniciar sesión
const login = async (req, res) => {
  const { Email, Password } = req.body;
  const sql = "SELECT * FROM usuarios WHERE Email = ?";

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
        return res.status(401).json({ Message: 'Contraseña incorrecta' });
      }
      console.log(data[0].Password);

      // Crear token
      const user = {
        id: data[0].id,
        name: data[0].Nombre,
        rol_id: data[0].rol_id
      };

      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Secure en producción
      return res.json({ Status: 'Login exitoso', rol_id: data[0].rol_id });
      console.log(req.body); 
    });
  });
};

export default { login };