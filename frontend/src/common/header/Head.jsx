import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            <b>Contáctanos: </b>
            <i className='fa fa-phone' style={{width: '70px'}}></i>
            <label>Llámanos al: 3196099669-3218387758</label>
            <i className='fa fa-envelope' style={{width: '70px'}}></i>
            <label> mueblesropy@gmail.com</label>
            <i className="fa-sharp-duotone fa-solid fa-map-pin" style={{width: '70px'}}></i>
            <label>Encuéntranos en: Cra 7A #8a-29 Sur, Barrio Nariño Sur.</label>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
