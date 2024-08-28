import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Destacados",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Descuentos",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Toallas",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Todos los productos",
    }
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
