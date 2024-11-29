// controllers/userController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const getAllUsers = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        const query = `
            SELECT *
            FROM usuarios;
        `;

        conn.query(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener los usuarios.");
            }
            res.json(rows);
        });
    });
};


const createUser = (req, res) => {
    const { Nombre, Email, Password, Status, Rol } = req.body;

    // Validar los datos necesarios
    if (!Nombre || !Email || !Password) {
        return res.status(400).send("Faltan datos obligatorios: Nombre, Email o Password.");
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        // Verificar si el usuario ya existe
        const checkUserQuery = `SELECT * FROM usuarios WHERE Email = ?;`;
        conn.query(checkUserQuery, [Email], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al verificar si el usuario ya existe.");
            }

            if (rows.length > 0) {
                return res.status(409).send("El usuario con este correo ya está registrado.");
            }

            // Hash de la contraseña antes de guardar
            bcrypt.hash(Password, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error al encriptar la contraseña.");
                }

                const query = `
                    INSERT INTO usuarios (Nombre, Email, Password, Status, Rol)
                    VALUES (?, ?, ?, ?, ?);
                `;
                conn.query(query, [Nombre, Email, hashedPassword, Status || "Activo", Rol || "Usuario"], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error al crear el usuario.");
                    }
                    res.status(201).send("Usuario registrado exitosamente.");
                });
            });
        });
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Status, Rol } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        const query = `
            UPDATE usuarios
            SET Nombre = ?, Email = ?, Status = ?, Rol = ?
            WHERE id = ?;
        `;

        conn.query(query, [Nombre, Email, Status, Rol, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al actualizar el usuario.");
            }
            res.status(200).send("Usuario actualizado exitosamente.");
        });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        const query = `
            DELETE FROM usuarios
            WHERE id = ?;
        `;

        conn.query(query, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al eliminar el usuario.");
            }
            res.status(200).send("Usuario eliminado exitosamente.");
        });
    });
};

const loginUser = (req, res) => {
    const { Email, Password } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        const query = `
            SELECT * FROM usuarios WHERE Email = ?;
        `;

        conn.query(query, [Email], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener el usuario.");
            }

            if (rows.length === 0) {
                return res.status(404).send("Usuario no encontrado.");
            }

            const user = rows[0];

            bcrypt.compare(Password, user.Password, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error al comparar la contraseña.");
                }

                if (!result) {
                    return res.status(401).send("Contraseña incorrecta.");
                }

                const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
                res.cookie('token', token);
                res.status(200).json({ Status: "Éxito", rol_id: user.rol_id });
            });
        });
    });
};

export default { createUser, getAllUsers, updateUser, deleteUser, loginUser };