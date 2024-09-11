import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productoDetalle.css'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
// Crea un archivo CSS para los estilos del producto

const ProductoDetalle = ({ addToCar }) => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
});

const ShopCart = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };


  useEffect(() => {
    // Función para obtener el producto desde el API
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/ProductItems/${id}`);
        setProducto(response.data);
        setSelectedColor(response.data.colors[0]); // Selecciona el primer color disponible por defecto
        setSelectedSize(response.data.sizes[0]); // Selecciona la primera medida disponible por defecto
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const handleCantidadChange = (e) => {
    setCantidad(Number(e.target.value));
  };

  return (
    <div className="producto-detalle">
      <img src={producto.cover} alt={producto.name} className="producto-imagen" />
      <div className="producto-info">
        <h1 className="producto-nombre">{producto.name}</h1>
        <p className="producto-descripcion">{producto.description}</p>
        <p className="producto-precio">${producto.price}.000</p>
        <p className="producto-descuento">Descuento: {producto.discount}%</p>
        
        {/* Opciones adicionales */}
        <div className="producto-opciones">
          <label htmlFor="material">Tipo de material:</label>
          <select id="material" name="material">
            <option value={producto.material}>{producto.material}</option>
            {producto.material2 && <option value={producto.material2}>{producto.material2}</option>}
          </select>

          <label htmlFor="color">Color:</label>
          <select id="color" name="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            {producto.colors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
<StyledRating
  name="customized-color"
  defaultValue={2}
  getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
  precision={0.5}
  icon={<FavoriteIcon fontSize="inherit" />}
  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
/>

          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={cantidad}
            onChange={handleCantidadChange}
            min="1"
          />

          <label htmlFor="medidas">Medidas:</label>
          <select id="medidas" name="medidas" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {producto.sizes.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
          <button onClick={() => addToCart(item)}>
            <i className='fa fa-plus'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;