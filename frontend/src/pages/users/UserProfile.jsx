import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './userProfile.css'

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { id } = useParams();  // Obtener el id del usuario de la URL
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Pedidos?userId=${id}`);
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Notifications?userId=${id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUserData();
    fetchPurchaseHistory();
    fetchNotifications();
  }, [id]);

  const handleEditProfile = () => {
    navigate('/edit-profile');
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
        <p><strong>Correo:</strong> {userData.Email}</p>
        {/* Asegúrate de que estas propiedades existen en tu API */}
        <p><strong>Dirección:</strong> {userData.Direccion}</p>
        <p><strong>Teléfono:</strong> {userData.Telefono}</p>
        <button onClick={handleEditProfile}>Editar Perfil</button>
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