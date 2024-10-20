import React, { useState, useEffect} from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from "axios"

const SlideCard = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Hacer una solicitud GET para obtener los datos de los destacados desde la API
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Destacados");
        setSlides(response.data); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSlides();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  return (
    <>
      <Slider {...settings}>
        {slides.map((value, index) => {
          return (
            <>
              <div className='box d_flex top' key={index}>
                <div className='left'>
                  <h1>{value.title}</h1>
                  <p>{value.desc}</p>
                  <button className='btn-primary'>Ver producto</button>
                </div>
                <div className='right'>
                  <img src={value.cover} alt='' />
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default SlideCard