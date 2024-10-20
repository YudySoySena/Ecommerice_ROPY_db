import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notifications.css';

function Notifications() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]); // Para el historial de notificaciones
  const [statusFilter, setStatusFilter] = useState('all'); // Filtro de estado de notificaciones

  useEffect(() => {
    // Cargar la lista de usuarios al montar el componente
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Cargar historial de notificaciones al seleccionar un usuario
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/Notifications?userId=${selectedUser}`);
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [selectedUser]);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStatusChange = (id, status) => {
    // Actualizar el estado de una notificación
    const updateNotificationStatus = async () => {
      try {
        await axios.put(`http://localhost:4000/Notifications/${id}`, { status });
        setNotifications(notifications.map(n => n.id === id ? { ...n, status } : n));
      } catch (error) {
        console.error('Error updating notification status:', error);
      }
    };

    updateNotificationStatus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !message) {
      alert("Debes seleccionar un usuario y escribir un mensaje.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/Notifications', {
        userId: selectedUser,
        message,
        status: 'enviada', // Estado inicial
      });

      if (response.status === 201) {
        alert('Notificación enviada con éxito');
        setMessage('');  // Limpiar el campo de mensaje
        setNotifications([...notifications, response.data]); // Agregar la nueva notificación al historial
      } else {
        alert('Hubo un problema al enviar la notificación.');
      }
    } catch (error) {
      console.error('Error enviando la notificación:', error);
      alert('Ocurrió un error al enviar la notificación.');
    }
  };

  const filterNotifications = () => {
    return notifications.filter(notification => {
      if (statusFilter === 'all') return true;
      return notification.status === statusFilter;
    });
  };

  return (
    <div className="notifications-container">
      <div className="notifications-form">
        <h2>Enviar Notificación</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user">Seleccionar Usuario</label>
            <select id="user" value={selectedUser} onChange={handleUserChange}>
              <option value="">-- Selecciona un usuario --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.Nombre} ({user.Email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <button type="submit">Enviar Notificación</button>
        </form>
      </div>

      <div className="notifications-history">
        <h2>Historial de Notificaciones</h2>
        <div className="filter-group">
          <label>Filtrar por estado: </label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="enviada">Enviadas</option>
            <option value="leída">Leídas</option>
            <option value="no entregada">No Entregadas</option>
          </select>
        </div>

        {filterNotifications().length > 0 ? (
          <ul>
            {filterNotifications().map((notification) => (
              <li key={notification.id}>
                <p>{notification.message}</p>
                <p>Estado: {notification.status}</p>
                <button onClick={() => handleStatusChange(notification.id, 'leída')}>Marcar como leída</button>
                <button onClick={() => handleStatusChange(notification.id, 'no entregada')}>Marcar como no entregada</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay notificaciones.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;