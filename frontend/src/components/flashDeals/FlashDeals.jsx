import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import "./style.css";
import axios from "axios";

const FlashDeals = ({ addToCart }) => {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    const fetchProductItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Descuentos");
        // Asegúrate de que el formato sea correcto
        setProductItems(response.data.Descuentos || []); // Maneja el caso en que `Descuentos` no esté presente
      } catch (error) {
        console.error("Error fetching product items:", error);
      }
    };

    fetchProductItems();
  }, []);

  return (
    <>
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>Descuentos</h1>
          </div>
          <FlashCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default FlashDeals;