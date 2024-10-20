import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tdata from "./Tdata"

const TopCart = ({ categories }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4, // Mostrar 4 categorías a la vez
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
  };

  return (
   <>
    <Slider {...settings}>
      {Tdata.map((value, index) => {
        return (
             <div key={index} style={{ padding: "10px" }}>
              <Link to={`/category/${value.para}`}>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={value.cover}
                    alt={value.para}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p style={{ textAlign: "center", marginTop: "10px" }}>
                  {value.para}
                </p>
              </Link>
            </div>
          );
      })}
    </Slider>
   </>
  );
};

export default TopCart;