import React, { useState, useEffect, useContext } from "react"
import axios from 'axios';
import logo from "../../components/assets/images/logo.png"
import { Link } from "react-router-dom"
import { UserContext } from "../../UserContext";

const Search = ({ CartItem }) => {
  const { contextUser } = useContext(UserContext);  // Obtener el usuario actual
  const [notifications, setNotifications] = useState([]);  // Estado para las notificaciones
  const [showNotifications, setShowNotifications] = useState(false);  // Estado para mostrar/ocultar las notificaciones

  useEffect(() => {
    const handleScroll = () => {
      const search = document.querySelector(".search");
      if (search) {
        search.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = document.querySelector('.your-element-class');
    if (element) {
      element.classList.add('new-class');
    }
  }, []);

  useEffect(() => {
    if (contextUser) {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/Notifications?userId=${contextUser.id}`);
          setNotifications(response.data);
        } catch (error) {
          console.error('Error al obtener las notificaciones:', error);
        }
      };

      fetchNotifications();
    }
  }, [contextUser]);

  // Alternar la visibilidad del desplegable de notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo} alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='¿Qué buscas hoy?' />
            <span>All Category</span>
          </div>
          <div className="notification-icon" onClick={toggleNotifications}>
          <i className="fas fa-bell"></i>
          {/* Opcional: Mostrar el número de notificaciones no leídas */}
          {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
        </div>

        {/* Desplegable de notificaciones */}
        {showNotifications && (
          <div className="notifications-dropdown">
            <h4>Notificaciones</h4>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id}>{notification.message}</li>
                ))}
              </ul>
            ) : (
              <p>No tienes notificaciones.</p>
            )}
          </div>
        )}
          <div className='icon f_flex width'>
            <Link to="/login">
            <i className='fa fa-user icon-circle' ></i>
            </Link>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search;
