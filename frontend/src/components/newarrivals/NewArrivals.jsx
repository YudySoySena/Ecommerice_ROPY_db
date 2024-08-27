import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import "./style.css";
import axios from "axios";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Novedades");
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <>
      <section className='NewArrivals background'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row f_flex'>
              <img src='https://img.icons8.com/glyph-neue/64/26e07f/new.png' alt='New Icon'/>
              <h2>New Arrivals</h2>
            </div>
            <div className='heading-right row'>
              <span>View all</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>

          <Cart newArrivals={newArrivals} />
        </div>
      </section>
    </>
  );
};

export default NewArrivals;