import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Importa react-modal
import './admin.css'; // Importa el archivo CSS

Modal.setAppElement('#root'); // Establece el elemento raíz para accesibilidad

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    discount: 0,
    description: '',
    cover: './images/allProducts/default.png'
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    fetch('http://localhost:4000/ProductItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
        setNewProduct({
          name: '',
          price: 0,
          discount: 0,
          description: '',
          cover: './images/allProducts/default.png'
        }); // Clear form
        setIsAddModalOpen(false); // Cierra el modal después de agregar el producto
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setEditProduct({ ...productToEdit });
    setIsEditModalOpen(true); // Abre el modal de edición
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:4000/ProductItems/${editProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editProduct),
    })
      .then(response => response.json())
      .then(data => {
        const updatedProducts = products.map(product =>
          product.id === data.id ? data : product
        );
        setProducts(updatedProducts);
        setEditProduct(null); // Ocultar el formulario después de guardar
        setIsEditModalOpen(false); // Cierra el modal de edición
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

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
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

      {/* Modal para editar producto */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Product"
        className="modal"
        overlayClassName="overlay"
      >
        <h3>Editar Producto</h3>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={editProduct?.name || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={editProduct?.price || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descuento:
          <input
            type="number"
            name="discount"
            value={editProduct?.discount || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={editProduct?.description || ''}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSaveEdit}>Guardar Cambios</button>
        <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
      </Modal>

      {/* Modal para agregar nuevo producto */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Add Product"
        className="modal"
        overlayClassName="overlay"
      >
        <h3>Agregar Nuevo Producto</h3>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleNewProductChange}
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
          />
        </label>
        <label>
          Descuento:
          <input
            type="number"
            name="discount"
            value={newProduct.discount}
            onChange={handleNewProductChange}
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
          />
        </label>
        <button onClick={handleAddProduct}>Guardar Nuevo Producto</button>
        <button onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
      </Modal>

      {/* Botón para abrir el modal de agregar producto */}
      <button onClick={() => setIsAddModalOpen(true)} className="add-product-button">Agregar Producto</button>
    </div>
  );
};

export default Admin;