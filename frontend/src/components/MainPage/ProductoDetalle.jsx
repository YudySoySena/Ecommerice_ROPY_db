import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productoDetalle.css'; // Crea un archivo CSS para los estilos del producto

const ProductoDetalle = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener el producto desde el API
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/ProductItems/${id}`);
        setProducto(response.data);
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
            <option value="metal">Metal</option>
            <option value="madera">Madera</option>
            <option value="metalmadera">Metal y Madera</option>
          </select>

          <label htmlFor="color">Color:</label>
          <select id="color" name="color">
            <option value="blanco">Blanco</option>
            <option value="gris">Gris</option>
            <option value="madera">Madera</option>
          </select>

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
          <input
            type="text"
            id="medidas"
            name="medidas"
            placeholder="Ej: 90x200 cm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;