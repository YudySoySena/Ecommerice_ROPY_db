import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItem) => {
          return (
            <div className="box" key={productItem.product_id}>
              <div className="product mtop">
                <div className="img">
                  <span className="discount">{productItem.discount}% Off</span>
                  <img src={productItem.product_image} alt={productItem.product_name} />
                  <div className="product-like">
                    <label>{count}</label> <br />
                    <i className="fa-regular fa-heart" onClick={increment}></i>
                  </div>
                </div>
                <div className="product-details">
                  <Link to={`/producto/${productItem.product_id}`}>
                    <h3>{productItem.product_name}</h3>
                  </Link>
                  <div className="rate">
                    {[...Array(Math.round(productItem.product_rating))].map(
                      (_, index) => (
                        <i className="fa fa-star" key={index}></i>
                      )
                    )}
                  </div>
                  <div className="price">
                    <h4>${productItem.discounted_price.toLocaleString('es-ES')}</h4>
                    <button onClick={() => addToCart(productItem)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );  
};

export default FlashCard;
