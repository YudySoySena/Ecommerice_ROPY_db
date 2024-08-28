import React, { useState, useEffect } from 'react';
import './admin.css'; // Importa el archivo CSS

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/ProductItems')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    const newProduct = {
      id: String(products.length + 1), // Esto debe ser generado en el servidor en una app real
      name: 'Nuevo Producto',
      price: 0,
      discount: 0,
      description: 'Descripción del nuevo producto',
      cover: './images/allProducts/default.png' // Imagen por defecto
    };

    fetch('http://localhost:4000/ProductItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => setProducts([...products, data]))
      .catch(error => console.error('Error adding product:', error));
  };

  const handleEditProduct = (id) => {
    const updatedProduct = {
      ...products.find(product => product.id === id),
      name: 'Producto Editado'
    };

    fetch(`http://localhost:4000/ProductItems/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => response.json())
      .then(data => {
        const updatedProducts = products.map(product =>
          product.id === id ? data : product
        );
        setProducts(updatedProducts);
      })
      .catch(error => console.error('Error editing product:', error));
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:4000/ProductItems/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="admin-container">
      <h2>Admin Page</h2>
      <p>Welcome, Admin!</p>

      <input
        type="text"
        placeholder="Buscar productos"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.discount}%</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleEditProduct(product.id)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-product-button" onClick={handleAddProduct}>Agregar Producto</button>
    </div>
  );
};

export default Admin;