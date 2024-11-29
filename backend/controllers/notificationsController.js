// Obtener todas las notificaciones
const getAllProducts = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }

        const query = `
            SELECT * FROM notifications;
        `;

        conn.query(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener los productos.");
            }
            res.json(rows);
        });
    });
};

// Obtener notificaciones por usuario
const getNotificationsByUser = (req, res) => {
    const { userId } = req.query;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }
        const query = 'SELECT * FROM Notifications WHERE userId = ?';
        conn.query(query, [userId], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener las notificaciones.");
            }
            res.json(rows);
        });
    });
};

// Crear una nueva notificación
const createNotification = (req, res) => {
    const { userId, title, message, date, status } = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }
        const query = 'INSERT INTO Notifications (userId, title, message, date, status) VALUES (?, ?, ?, ?, ?)';
        conn.query(query, [userId, title, message, date, status], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al crear la notificación.");
            }
            res.status(201).json({ notificationId: result.insertId, userId, title, message, date, status });
        });
    });
};

// Actualizar el estado de una notificación
const updateNotificationStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error de conexión a la base de datos.");
        }
        const query = 'UPDATE Notifications SET status = ? WHERE notificationId = ?';
        conn.query(query, [status, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al actualizar el estado de la notificación.");
            }
            res.json({ message: 'Estado de la notificación actualizado correctamente.' });
        });
    });
};

export default { getAllNotifications, getNotificationsByUser, createNotification, updateNotificationStatus };