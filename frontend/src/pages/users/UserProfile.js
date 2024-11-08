import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './userProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { id } = useParams();  // Obtener el id del usuario de la URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [id]);

  // Manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Guardar los cambios en la API cuando el usuario haga clic en "Guardar Cambios"
  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8081/user/${id}`, editedData);
      setUserData(editedData); // Actualizar la UI con los datos editados
      console.log('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleOrderFollowUp = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const goToMainPage = () => {
    navigate('/');
  };

  return (
    <div className="user-profile">
      <div className="header">
        <h2>Perfil de {userData.Nombre}</h2>
        <button onClick={goToMainPage}>Catálogo Principal</button>
      </div>

      <section className="profile-info">
        <h3>Datos del Usuario</h3>
        <label><strong>Correo:</strong></label>
        <input
          type="email"
          name="Email"
          value={editedData.Email || ''}
          onChange={handleInputChange}
        />

        <label><strong>Dirección:</strong></label>
        <input
          type="text"
          name="Direccion"
          value={editedData.Direccion || ''}
          onChange={handleInputChange}
        />

        <label><strong>Teléfono:</strong></label>
        <input
          type="tel"
          name="Telefono"
          value={editedData.Telefono || ''}
          onChange={handleInputChange}
        />

        <button onClick={handleSaveChanges}>Guardar Cambios</button> {/* Botón para guardar cambios */}
      </section>

      <section className="purchase-history">
        <h3>Historial de Compra</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map(order => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>{order.products.map(product => product.name).join(', ')}</td>
                <td>{order.status}</td>
                <td><button onClick={() => handleOrderFollowUp(order.id)}>Ver Pedido</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="notifications">
        <h3>Notificaciones</h3>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UserProfile;