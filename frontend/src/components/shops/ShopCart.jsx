import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación

const ShopCart = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {shopItems.map((item) => (
        <div className='box' key={item.id}>
          <div className='product mtop'>
            <div className='img'>
              <span className='discount'>{item.discount}% Off</span>
              <Link to={`/producto/${item.id}`}> {/* Enlace a la vista de detalles */}
                <img src={item.cover} alt={item.name} />
              </Link>
              <div className='product-like'>
                <label>{count}</label> <br />
                <i className='fa-regular fa-heart' onClick={increment}></i>
              </div>
            </div>
            <div className='product-details'>
              <Link to={`/producto/${item.id}`}> {/* Enlace a la vista de detalles */}
                <h3>{item.name}</h3>
              </Link>
              <div className='rate'>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
              </div>
              <div className='price'>
                <h4>${item.price}.000</h4>
                <button onClick={() => addToCart(item)}>
                  <i className='fa fa-plus'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopCart;
