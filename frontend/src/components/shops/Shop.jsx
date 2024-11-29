import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopCart from "./ShopCart";
import "./style.css";

const Shop = ({ addToCart }) => {
  const [shopItems, setShopItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/products/allproduct')
      .then((response) => {
        setShopItems(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  
   

  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          
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