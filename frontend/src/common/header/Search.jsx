import React from "react"
import logo from "../../components/assets/images/logo.png"
import { Link } from "react-router-dom"
import { useEffect } from 'react';

const Search = ({ CartItem }) => {
  useEffect(() => {
    const handleScroll = () => {
      const search = document.querySelector(".search");
      if (search) {
        search.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = document.querySelector('.your-element-class');
    if (element) {
      element.classList.add('new-class');
    }
  }, []);
  
  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo} alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='¿Qué buscas hoy?' />
            <span>All Category</span>
          </div>
          <div className="bell">
            <Link>
            <i className="fa-solid fa-bell"></i>
            </Link>
          </div>
          <div className='icon f_flex width'>
            <Link to="/login">
            <i className='fa fa-user icon-circle' ></i>
            </Link>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
