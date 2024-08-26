import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i className="fa-sharp fa-solid fa-badge-check"></i>,
      title: "10 años de garantía",
      decs: "Nuestros productos, período de devolución de 7 días a partir de la fecha de entrega. Por favor, consulta con nuestros asesores para obtener información detallada sobre el proceso y los requisitos.",
    },
    {
      cover: <i className="fa-solid fa-ranking-star"></i>,
      title: "Calidad",
      decs: " Trabajamos con artesanos expertos y utilizamos materiales de alta calidad en la fabricación de nuestros muebles. Cada pieza pasa por rigurosos controles de calidad antes de ser entregada a nuestros clientes.",
    },
    {
      cover: <i className="fa-solid fa-flux-capacitor"></i>,
      title: "Plazos Flexibles ",
      decs: "Ofrecemos opciones de financiamiento y planes de pago a plazos flexibles para que puedas obtener los muebles que deseas sin comprometer tu presupuesto, gracias a los convenios financieros con los que contamos.   ",
    },
    {
      cover: <i className="fa-solid fa-circle-star"></i>,
      title: "Membresías",
      decs: "contamos con nuestra membresía es una forma especial de agradecer a nuestros clientes leales. Al unirte a nuestra membresía, obtienes acceso exclusivo a descuentos adicionales, envío prioritario, acceso a eventos especiales y asesoramiento personalizado de diseño de interiores. ",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
