const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.json());

let notifications = [
  {
    notificationId: "n001",
    userId: "8238",
    title: "Nueva actualización de producto",
    message: "Hemos añadido nuevos camarotes a nuestra tienda, échale un vistazo.",
    date: "2024-09-10",
    status: "unread"
  }
];

let users = [
  {
    "id": "1",
    "Nombre": "Yudy",
    "Email": "yudy@soy.sen",
    "Password": "123456",
    "Status": "Activo",
    "Rol": "Administrador"
  },
  {
    "id": "8238",
    "Nombre": "Cris Garcia",
    "Email": "crisgarcia2@cris",
    "Password": "1234",
    "Status": "Activo",
    "Rol": "Usuario"
  }
];

// Ruta para crear una notificación (solo administradores)
app.post('/notifications', (req, res) => {
  const { userId, title, message } = req.body;

  // Verificar si el usuario es un administrador
  const adminUser = users.find(user => user.Rol === "Administrador");
  if (!adminUser) {
    return res.status(403).json({ message: "Acceso denegado. Solo los administradores pueden crear notificaciones." });
  }

  // Verificar si el usuario destinatario existe
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado." });
  }

  // Crear una nueva notificación
  const newNotification = {
    notificationId: `n${notifications.length + 1}`,
    userId,
    title,
    message,
    date: new Date().toISOString().split('T')[0],
    status: "unread"
  };

  notifications.push(newNotification);
  res.status(201).json({ message: "Notificación creada exitosamente.", notification: newNotification });
});

// Ruta para obtener las notificaciones de un usuario específico
app.get('/notifications/:userId', (req, res) => {
  const { userId } = req.params;
  const userNotifications = notifications.filter(notification => notification.userId === userId);
  res.json(userNotifications);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});