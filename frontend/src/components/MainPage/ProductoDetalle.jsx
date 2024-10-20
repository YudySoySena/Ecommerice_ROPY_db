import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productoDetalle.css'; 
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Componente de Rating personalizado
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
});

const ProductoDetalle = ({ addToCart }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/ProductItems/${id}`, {
          cancelToken: cancelTokenSource.token,
        });
        setProducto(response.data);
        setSelectedColor(response.data.colors[0]);
        setSelectedSize(response.data.sizes[0]);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Petición cancelada');
        } else {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchProducto();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [id]);

  const handleAddToCart = (producto, cantidad) => {
    // Crea una nueva entrada para el carrito con el producto y la cantidad
    const newCartItem = {
      ...producto,
      cantidad,
    };

    // Llama a la función pasada como prop
    addToCart(newCartItem);
  };

  const handleCantidadChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setCantidad(value);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="producto-detalle">
      <img
        src={producto.cover ? `http://localhost:4000/images/${producto.cover}` : 'ruta/de/imagen/default.jpg'}
        alt={producto.name}
        className="producto-imagen"
      />
      <div className="producto-info">
        <h1 className="producto-nombre">{producto.name}</h1>
        <p className="producto-descripcion">{producto.description}</p>
        <p className="producto-precio">${producto.price}</p>
        <p className="producto-descuento">Descuento: {producto.discount}%</p>
        
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
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
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

          <button onClick={() => handleAddToCart(producto, cantidad)}>
            <i className="fa fa-plus"></i> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
