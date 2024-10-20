import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductFilter from "./ProductFilter";
import ShopCart from "./ShopCart";
import "./style.css";

const Shop = ({ addToCart }) => {
  const [shopItems, setShopItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/ProductItems')
      .then((response) => {
        setShopItems(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Función que se llama cuando el filtro se aplica
  const handleFilter = (filters) => {
    let filtered = [...shopItems];
  
    // Filtrar por categorías
    if (filters.categories.length > 0 && !filters.categories.includes('todos')) {
      filtered = filtered.filter(product =>
        product.category && filters.categories.includes(product.category.toLowerCase())
      );
    }
  
    // Filtrar por materiales
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        product.material && filters.materials.includes(product.material.toLowerCase())
      );
    }
  
    // Filtrar por rango de precios
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }
  
    // Filtrar por descuento
    if (filters.hasDiscount) {
      filtered = filtered.filter(product => product.discount > 0);
    }
  
    // Si no hay ningún filtro activo, mostrar todos los productos
    if (
      filters.categories.length === 0 &&
      filters.materials.length === 0 &&
      filters.priceRange.length === 0 &&
      !filters.hasDiscount
    ) {
      filtered = shopItems; // Devuelve todos los productos si no hay filtros
    }
  
    setFilteredProducts(filtered);
  };    

  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          
          <ProductFilter onFilter={handleFilter} />
          
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row f_flex'>
                <h2>Todos los productos</h2>
              </div>
            </div>
            {filteredProducts.length > 0 ? (
  <div className='product-content grid1'>
    <ShopCart addToCart={addToCart} shopItems={filteredProducts} />
  </div>
) : (
  <p>No se encontraron productos</p>
)}
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Shop;