import React from 'react'

function Ubicacion() {
  return (
    <div className='ubicacion-content'>
        <i className="fa-solid fa-location-dot" style={{fontSize: '30px'}}></i>
        <label className='title-ubi'> Encuentranos en: </label>
        <ul>
            <li><p> Cr 7a#8a-29 sur Barrio Nariño Sur Bogotá, Colombia</p></li>
            <li><p>D, 46, 1 De Mayo #34, Puente Aranda, Bogotá</p></li>
        </ul>
            <div className="map-section">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15908.29174369667!2d-74.10542111284178!3d4.580925399999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9944f75b248d%3A0x775276d1c2dec012!2sMuebles%20Ropy%20-%20Fabrica!5e0!3m2!1ses-419!2sco!4v1724633985542!5m2!1ses-419!2sco" 
            width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
           </div>
        
        

    </div>
  )
}

export default Ubicacion