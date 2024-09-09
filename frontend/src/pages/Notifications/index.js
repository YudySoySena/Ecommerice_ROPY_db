import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notifications.css'

function Notifications() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

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

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
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
      });

      if (response.status === 201) {
        alert('Notificación enviada con éxito');
        setMessage('');  // Limpiar el campo de mensaje
      } else {
        alert('Hubo un problema al enviar la notificación.');
      }
    } catch (error) {
      console.error('Error enviando la notificación:', error);
      alert('Ocurrió un error al enviar la notificación.');
    }
  };

  return (
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
  );
}

export default Notifications;