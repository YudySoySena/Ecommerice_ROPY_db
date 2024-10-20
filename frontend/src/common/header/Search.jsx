import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import logo from "../../components/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Search = ({ CartItem }) => {
  const { contextUser } = useContext(UserContext);  // Obtener el usuario actual
  const [notifications, setNotifications] = useState([]);  // Estado para las notificaciones
  const [showNotifications, setShowNotifications] = useState(false);  // Estado para mostrar/ocultar las notificaciones
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para los productos filtrados
  const [allProducts, setProducto] = useState([]); // Estado para todos los productos
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


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


  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/ProductItems`);
        if (response.data) {
          console.log('Productos obtenidos:', response.data); // Depurar los productos obtenidos
          setProducto(response.data);
        } else {
          setError('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener el producto', error);
        setError('Error al obtener el producto');
      }
      setLoading(false);
    };
    fetchProducto();
  }, []);  
  
  // Función para actualizar el estado de búsqueda y filtrar productos
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    // Verificar que el valor de búsqueda no esté vacío
    if (value.trim()) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log('Productos filtrados:', filtered); // Depurar los productos filtrados
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Limpiar los productos filtrados si no hay búsqueda
    }
  };  

  // Función para manejar el clic en un producto
  const handleProductClick = (productId) => {
    // Limpiar búsqueda y productos filtrados
    setSearchTerm("");
    setFilteredProducts([]);
  
    // Navegar al detalle del producto
    navigate(`/producto/${productId}`);
  };
  
  // Alternar la visibilidad del desplegable de notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo} alt='Logo' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='¿Qué buscas hoy?' value={searchTerm} onChange={handleSearch} />
            <span>Todas las categorías</span>
          </div>

          <div className='icon f_flex width'>
            {contextUser ? (
              <>
                {/* Icono de notificaciones */}
                <div className="notification-icon" onClick={toggleNotifications}>
                  <i className="fas fa-bell"></i>
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

                {/* Ícono de perfil de usuario */}
                <Link to="/login">
                  <i className='fa fa-user icon-circle'></i>
                </Link>
              </>
            ) : (
              <Link to="/login" className="login-btn">
                Iniciar sesión
              </Link>
            )}
            
            {/* Ícono del carrito */}
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Mostrar el cajón de productos filtrados */}
        {searchTerm && filteredProducts.length > 0 && (
  <div className="search-results">
    <ul>
      {filteredProducts.map((product) => (
        <li
          key={product.id}
          onClick={() => handleProductClick(product.id)}
        >
          <img src={product.cover} alt={product.name} />
          <div>
            <h4>{product.name}</h4>
            <p>{product.price} $</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}
      </section>
    </>
  );
};

export default Search;