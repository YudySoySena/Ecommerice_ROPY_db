import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import "./style.css";
import axios from "axios";

const FlashDeals = ({ addToCart }) => {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/promotions/allpromotions");
        setProductItems(response.data || []);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <section className='flash'>
      <div className='container'>
        <div className='heading f_flex'>
          <i className='fa fa-bolt'></i>
          <h1>Descuentos</h1>
        </div>
        <FlashCard productItems={productItems} addToCart={addToCart} />
      </div>
    </section>
  );
};

export default FlashDeals;