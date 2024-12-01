import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import TopCart from "./TopCart";

const TopCate = () => {
  const [categories, setCategories] = useState([]);

  // Obtener las categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8081/categories");
        setCategories(response.data.categories);  // Aquí pasas las categorías correctamente
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };    

    fetchCategories();
  }, []);

  return (
    <>
      <section className='TopCate background'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row f_flex'>
              <i className='fa-solid fa-border-all'></i>
              <h2>Categories</h2>
            </div>
          </div>
          {/* Pasa las categorías como prop a TopCart */}
          <TopCart categories={categories} />
        </div>
      </section>
    </>
  );
};

export default TopCate;