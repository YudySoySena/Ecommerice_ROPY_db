import React from "react";

const Cart = ({ newArrivals }) => {
  return (
    <>
      <div className='content grid product'>
        {newArrivals.map((val, index) => {
          return (
            <div className='box' key={index}>
              <div className='img'>
                <img src={val.cover} alt={val.name} />
              </div>
              <h4>{val.name}</h4>
              <span>${val.price}.000</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;